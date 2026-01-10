import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { ID } from '../../../supports/types/type.id';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message extends Document {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  authorId: ID;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  sentAt: Date;

  @Prop({ required: false })
  readAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
