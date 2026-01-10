import { ID } from '../../../supports/types/type.id';

export interface SearchRoomParamsDto {
  hotel: ID;
  title?: any;
  limit?: number;
  offset?: number;
  isEnabled?: string;
}
