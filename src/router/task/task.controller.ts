import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Inject,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { Task } from './schemas/task.schema';
import { Roles } from 'src/roles/roles.decorator';
import { RolesEnum } from 'src/roles/roles.enum';

@ApiTags('任务')
@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  @Get()
  @Roles(RolesEnum.User, RolesEnum.Admin)
  @ApiOperation({ summary: '获取任务' })
  @ApiResponse({
    status: 200,
  })
  async getTask(@Query() query: GetTaskDto): Promise<Task[] | Task> {
    this.logger.info('Calling getHello()', {
      controller: TaskController.name,
    });
    console.log('query: ', query);
    if (query.id !== undefined) {
      return this.taskService.getById(query.id);
    }
    return this.taskService.getAll();
  }

  @Get(':id')
  @Roles(RolesEnum.User)
  @ApiOperation({ summary: '获取任务列表，带路由参数' })
  getTaskByParams(@Param() params) {
    console.log('params: ', params);
    return 'get task by params';
  }

  @Get(':id/sub')
  @ApiOperation({ summary: '获取任务列表，二级参数' })
  getTaskByParamsSub(@Param() params) {
    console.log('params: ', params);
    return 'get task by params sub';
  }

  @Post()
  @Roles(RolesEnum.Admin)
  @ApiOperation({ summary: '添加一个任务' })
  @ApiResponse({
    status: 200,
  })
  async create(@Body() createTaskDto: CreateTaskDto) {
    const result = await this.taskService.create(createTaskDto);
    return result;
  }
}
