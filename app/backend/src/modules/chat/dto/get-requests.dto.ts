import { ID } from '../../../supports/types/type.id';

export interface GetChatListParams {
  userId: ID | null;
  isActive: boolean;
}
