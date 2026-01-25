import {
  // BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from '../type.id';
import { CreateLibraryDto } from './interfaces/create.library';
import { SearchParamsDto } from './interfaces/search.library';
import { UpdateLibraryDto } from './interfaces/update.library';
import { Libraries, LibrariesDocument } from './libraries.schema';

@Injectable()
export class LibrariesService {
  constructor(@InjectModel(Libraries.name) private librariesModel: Model<Libraries>) {}

  async create(dataLibrary: CreateLibraryDto): Promise<LibrariesDocument> {
    try {
      const library = new this.librariesModel(dataLibrary);
      return library.save();
    } catch (e) {
      console.error(e);
    }
  }

  async update(
    libraryId: ID,
    dataLibrary: UpdateLibraryDto,
    images: string[],
  ): Promise<LibrariesDocument> {
    // const hotel = await this.findById(hotelId);
    // const data = { ...dataHotel, images: [...hotel.images, ...images] };
    // const data = { ...dataHotel, images };
    return await this.librariesModel.findByIdAndUpdate(
      { _id: libraryId },
      { $set: { ...dataLibrary, images} },
      // { $set: { ...data } },
      { new: true },
    );
  }

  async findById(libraryId: ID): Promise<LibrariesDocument> {
    const library = await this.librariesModel.findById(libraryId);
    if (!library) {
      throw new NotFoundException('Отель не найден!');
    }
    return library;
  }

  async search(params: SearchParamsDto): Promise<LibrariesDocument[]> {
    const { limit, offset, name } = params;
    const query = {
      name: { $regex: new RegExp(name, 'i') },
    };
    return await this.librariesModel.find(query)
      .limit(limit || 0)
      .skip(offset || 0)
      // .select('title description images');
  }
}
