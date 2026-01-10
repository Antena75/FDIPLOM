import { ID } from '../../../supports/types/type.id';

export interface SendMessageDto {
  authorId: ID;
  supportRequestId: ID;
  text: string;
}
