import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  /**
   * 验证策略
   * 如果正确验证用户，返回用用户名及用户ID
   * 如果验证错误，则返回无权限错误
   * 结果返回给@UseGuards()装饰后的结果中user的值
   */
  async validate(username: string, password: string): Promise<any> {
    console.log('username: ', username);
    console.log('password: ', password);
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      /**
       * 此处使用空对象`{}`特指没有查询到用户
       * 交由接口层判断并处理
       */
      return {} as any;
    }
    return user;
  }
}
