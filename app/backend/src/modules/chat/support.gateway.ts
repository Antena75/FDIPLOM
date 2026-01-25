import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ID } from '../type.id';
import { UsersService } from '../users/users.service';
import { SupportService } from './services/support.service';

@WebSocketGateway({ cors: true })
export class SupportGateway {
  constructor(
    private supportService: SupportService,
    private usersService: UsersService,
  ) {}

  @SubscribeMessage('subscribeToChat')
  async handleSubscribeToChat(
    @MessageBody() payload: { chatId: ID },
    @ConnectedSocket() client: Socket,
  ) {
    return this.supportService.subscribe(async (chat, message) => {
      if (chat._id.toString() === payload.chatId) {
        const { _id, readAt, text, authorId } = message;
        const { _id: userId, name } =
          await this.usersService.findById(authorId);
        const response = {
          _id,
          sentAt: message['sentAt'],
          text,
          readAt,
          author: {
            id: userId,
            name: name,
          },
        };
        // console.log(response)
        client.emit('subscribeToChat', response);
      }
    });
  }
}
