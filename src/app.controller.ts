import {
  Controller,
  Request,
  Body,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { NoAuth } from './common/decorator/customize';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getTest(): string {
    return 'this is test api';
  }

  @Get('test/async')
  async getTestAsync(): Promise<string> {
    return 'this is test async api';
  }

  @NoAuth()
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
