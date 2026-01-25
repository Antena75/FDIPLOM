import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { ReturnDataDto } from './interfaces/returndata';
import { LoginDto } from './interfaces/login';
import { IJwtPayload } from './interfaces/jwtpayload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

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
    return { token, role: user.role, id: user.id, name: user.name, email: user.email};
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
