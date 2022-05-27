import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  getTask() {
    return 'this is task list';
  }
}
