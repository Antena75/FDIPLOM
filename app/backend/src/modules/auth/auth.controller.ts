import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/supports/guard/auth.guard';
import { AuthService } from './auth.service';
import { ReturnDataDto } from './interfaces/returnData.dto';
import { LoginDto } from './interfaces/login.dto';
import { RegisterDto } from './interfaces/register.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  signUp(
    @Body() registerDto: RegisterDto): Promise<ReturnDataDto> {   
    return this.authService.register(registerDto);
  }

  @Post('/login')
  signIn(@Body() loginDto: LoginDto): Promise<ReturnDataDto> {
    return this.authService.login(loginDto);
  }

  @Get('/checkauth')
  @UseGuards(JwtAuthGuard)
  checkAuth(
    @Query() data: { email: string },
  ): Promise<{ role: string; id: string }> {
    return this.authService.checkAuth(data);
  }
}
