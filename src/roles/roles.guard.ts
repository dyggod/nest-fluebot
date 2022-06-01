import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from './roles.enum';
import { ROLES_KEY } from './roles.decorator';

//TODO: 完成授权流程以及颗粒度更细的权限，到动作级别而不仅仅是接口层次
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    console.log('requiredRoles: ', requiredRoles);
    // 如果接口没有权限要求，返回true
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    console.log('user: ', user);
    // 如果用户权限包含有Admin，返回true
    if (user.roles.includes(RolesEnum.Admin)) {
      return true;
    }
    // 返回用户所拥有的角色中是否有满足接口需要的角色
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
