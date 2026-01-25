import {
  // BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from '../../type.id';
import { UsersService } from '../../users/users.service';
import { CreateRequestDto } from '../interfaces/create.request';
import { MarkMessagesAsReadDto } from '../interfaces/mark.message';
import { Message, MessageDocument } from '../schemas/message.schema';
import { Chat } from '../schemas/chat.schema';
import { SupportService } from './support.service';

@Injectable()
export class SupportClientService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    @InjectModel(Message.name) private messageModel: Model<Message>,
    private usersService: UsersService,
  ) {}
  async createSupportRequest(
    dataReq: CreateRequestDto,
  ): Promise<Chat> {
    const user = await this.usersService.findById(dataReq.userId);
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }

    try {
      const createdSupportRequest = new this.chatModel({
        userId: dataReq.userId,
      });
      return createdSupportRequest.save();
    } catch (error) {
      console.error(error);
    }
  }

  async markMessagesAsRead(dataMark: MarkMessagesAsReadDto): Promise<void>  {
    const chat = await this.chatModel.findById(dataMark.chatId)
      // .select('-__v')
      // .exec();
    if (!chat) {
      throw new NotFoundException('Обращение не найдено!');
    }

    await this.messageModel.updateMany(
      {
        _id: { $in: chat.messages },
        authorId: { $ne: dataMark.userId },
        sentAt: { $lte: dataMark.createdBefore },
      },
      { $set: { readAt: new Date() } },
    );
  }

async getUnreadCount(chatId: ID): Promise<number> {
  const chat = await this.chatModel.findById(chatId)
  const count = await this.messageModel.countDocuments(
    {
      _id: { $in: chat.messages },
      // authorId: { $ne: chat.userId },
        readAtAt: null,
    },
  );
  console.log(count)
  return count;
  }
}
