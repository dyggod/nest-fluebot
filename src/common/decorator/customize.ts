import { SetMetadata } from '@nestjs/common';

// 自定义装饰器，添加'no-auth'元数据
export const NoAuth = () => SetMetadata('no-auth', true);
