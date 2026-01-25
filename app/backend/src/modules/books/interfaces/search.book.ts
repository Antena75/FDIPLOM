import { ID } from '../../type.id';

export interface SearchBookParamsDto {
  library: ID;
  title?: any;
  author?: any;
  limit?: number;
  offset?: number;
  isAvailable?: string;
}
