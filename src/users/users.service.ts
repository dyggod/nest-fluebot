import { Injectable } from '@nestjs/common';
import { RolesEnum } from 'src/roles/roles.enum';

// TODO: 将User类型定义为实际的类型结构
export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'john123',
        roles: RolesEnum.User,
      },
      {
        userId: 2,
        username: 'jack',
        password: 'jack123',
        roles: [RolesEnum.Admin],
      },
      {
        userId: 3,
        username: 'tom',
        password: 'tom123',
        roles: [RolesEnum.User, RolesEnum.Admin],
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
