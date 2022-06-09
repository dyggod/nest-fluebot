import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { successResponseWrap, failResponseWrap } from 'src/utils/reponse';

export enum AuthCode {
  ErrorUser = 40001, // 用户名或密码错误
}

export enum AuthCodeMessage {
  ErrorUser = '用户名或密码错误',
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  // 验证用户名和密码，正确则返回用户名和用户ID，错误则返回null
  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOne(username);
    if (user?.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    if (!user?.username) {
      return failResponseWrap(
        null,
        AuthCode.ErrorUser,
        AuthCodeMessage.ErrorUser,
      );
    } else {
      const payload = {
        username: user.username,
        sub: user.userId,
        roles: user.roles,
      };
      return successResponseWrap({
        token: this.jwtService.sign(payload),
      });
    }
  }
}
