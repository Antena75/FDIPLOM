import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Post,
  Query,
  UseGuards,
  SetMetadata
} from '@nestjs/common';
// import { Roles } from '../../supports/decorators/roles.decorator';
import { JwtGuard, RolesGuard } from '../auth.guard';
// import { RolesGuard } from '../../supports/guard/roles.guard';
import { ID } from '../type.id';
import { SearchUsersDto } from './interfaces/search.user';
// import { UpdateRoleDto } from './interfaces/updaterole.dto';
import { Users } from './users.schema';
import { UsersService } from './users.service';
import { RegisterUserDto } from './interfaces/register.user';
import { ReturnDataDto } from '../auth/interfaces/returndata';
// import { AuthService } from '../auth/auth.service';

@Controller('api/users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    // private authService: AuthService
  ) {}

  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @SetMetadata('roles', ['admin', 'manager']) 
  searchUsers(
    @Query() params: Partial<SearchUsersDto>,
  ): Promise<Users[]> {
    return this.usersService.findAll(params);
  }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @SetMetadata('roles', ['admin']) 
  signUpAdmin(
    @Body() dataReg: RegisterUserDto): Promise<ReturnDataDto> {   
    return this.usersService.register(dataReg);
  }

  @Post('/register')
  signUpClient(
    @Body() dataReg: RegisterUserDto): Promise<ReturnDataDto> {   
    return this.usersService.register(dataReg);
  }
}

