import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { ID } from '../../type.id';
import { MessageDocument } from './message.schema';
// import { UserHDocument, UserSchema } from 'src/users/users.schema';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({
  // timestamps: true,
  timestamps: { createdAt: true, updatedAt: false}
})
export class Chat extends Document {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  // @Prop({ required: true, type: UserSchema, ref: 'User' })
  userId: ID;

  // @Prop()
  // createdAt: Date;

  @Prop({ required: false, default: [] })
  // messages: [{ type: mongoose.Schema.Types.ObjectId; ref: 'Message' }];
  messages: MessageDocument[];

  @Prop({ required: false, default: true })
  isActive: boolean;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
