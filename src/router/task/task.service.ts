import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createTask = new this.taskModel(createTaskDto);
    return createTask.save();
  }

  async getAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async getById(id: TaskDocument['_id']): Promise<Task> {
    return this.taskModel.findById(id);
  }
}
