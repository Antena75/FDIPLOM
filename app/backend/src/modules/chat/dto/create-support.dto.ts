import { ID } from '../../../supports/types/type.id';

export interface CreateSupportRequestDto {
  userId: ID;
  text: string;
}
