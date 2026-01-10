import {
  // ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { ReturnDataDto } from './interfaces/returnData.dto';
import { LoginDto } from './interfaces/login.dto';
import { RegisterDto } from './interfaces/register.dto';
import { IJwtPayload } from './interfaces/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<ReturnDataDto> {
    const { email, password, name, contactPhone, role } = registerDto;

    const existUser = await this.userService.findByEmail(registerDto.email);
    if (existUser) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST, // 400
          error: `Пользователь ${existUser.email} уже зарегистрирован`,
        },
        HttpStatus.BAD_REQUEST,
        {cause: `Пользователь ${existUser.email} уже зарегистрирован`,},
      );
    }

    // const userData = await this.userService.findByEmail(email);
    // if (userData) {
    //   throw new ConflictException(
    //     'Пользователь с указанным email уже существует!',
    //   );
    // }

    const passwordHash = await bcrypt.hash(registerDto.password, 10);
    const newUser = await this.userService.create({
      email,
      passwordHash,
      name,
      contactPhone: contactPhone || 'Не указан',
      role: role || 'client'
    });

    // const token = this.jwtService.sign({ email: newUser.email });
    // return { token, role: newUser.role, id: newUser.id };

    return { role: newUser.role, id: newUser.id };
  }

  async login(loginDto: LoginDto): Promise<ReturnDataDto> {
    const { email, password } = loginDto;

    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Неправильный email или пароль!');
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      user.passwordHash,
    );

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Неправильный email или пароль!');
    }

    const payload: IJwtPayload = {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
      contactPhone: user.contactPhone,
    };

    const token = await this.jwtService.signAsync(payload);
    return { token, role: user.role, id: user.id };
  }

  async checkAuth(data: {
    email: string;
  }): Promise<{ role: string; id: string }> {
    const { email } = data;

    const userData = await this.userService.findByEmail(email);
    if (!userData) {
      throw new NotFoundException('Неправильный email или пароль!');
    }

    return { role: userData.role, id: userData.id };
  }
}
