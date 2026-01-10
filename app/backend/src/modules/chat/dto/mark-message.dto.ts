import { ID } from '../../../supports/types/type.id';

export interface MarkMessagesAsReadDto {
  userId: ID;
  supportRequestId: ID;
  createdBefore: Date;
}
