import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../../supports/decorators/roles.decorator';
import { JwtAuthGuard } from '../../supports/guard/auth.guard';
import { RolesGuard } from '../../supports/guard/roles.guard';
import { ID } from '../../supports/types/type.id';
import { SearchUsersDto } from './interfaces/searchuser.dto';
import { UpdateRoleDto } from './interfaces/updaterole.dto';
import { Users } from './schema/users.schema';
import { UsersService } from './users.service';
import { RegisterDto } from '../auth/interfaces/register.dto';
import { ReturnDataDto } from '../auth/interfaces/returnData.dto';
import { AuthService } from '../auth/auth.service';

@Controller('api/users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @Get()
  @Roles('admin', 'manager')
  searchUsers(
    @Query() searchParams: Partial<SearchUsersDto>,
  ): Promise<Users[]> {
    return this.usersService.findAll(searchParams);
  }

  @Put(':id')
  @Roles('admin')
  updateRole(
    @Param('id') userId: ID,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Users> {
    return this.usersService.updateRole(userId, updateRoleDto.role);
  }

  
  @Post()
  @Roles('admin')
  signUp(
    @Body() registerDto: RegisterDto): Promise<ReturnDataDto> {   
    return this.authService.register(registerDto);
  }
}

