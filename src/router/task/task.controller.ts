import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { CrateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';

@ApiTags('任务')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiOperation({ summary: '获取任务列表' })
  @ApiResponse({
    status: 200,
  })
  getTask(@Query() query: GetTaskDto): string {
    console.log('query: ', query);
    return this.taskService.getTask();
  }

  @Get(':id')
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
  @ApiOperation({ summary: '添加一个任务' })
  @ApiResponse({
    status: 200,
  })
  create(@Body() createTaskDto: CrateTaskDto) {
    console.log('createTaskDto: ', createTaskDto);
    return 'add a task';
  }
}
