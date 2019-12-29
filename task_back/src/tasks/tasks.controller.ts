import { Controller, Get, Query, Post, Body, UseGuards, Put } from '@nestjs/common';
import { TaskAllDto } from './dto/taskAll-dto';
import { TaskDto } from './dto/task-dto';
import { TaskCreateDto } from './dto/task-create-dto'
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getTask(@Query() taskDto: TaskDto): Promise<any> {
        return await this.taskService.getTask(taskDto)
    }

    @Get('all')
    @UseGuards(AuthGuard('jwt'))
    async allTaskByUser(@Query() taskDto: TaskAllDto): Promise<any> {
        return await this.taskService.allTaskByUser(taskDto)
    }
    @Get('overcome')
    @UseGuards(AuthGuard('jwt'))
    async taskOvercome(@Query() taskDto: TaskAllDto): Promise<any> {
        return await this.taskService.taskOvercome(taskDto)
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() taskCreateDto: TaskCreateDto): Promise<any> {
        return await this.taskService.createTask(taskCreateDto)
    }
    @Put()
    @UseGuards(AuthGuard('jwt'))
    async update(@Query() taskDto: TaskDto, @Body() taskCreateDto: TaskCreateDto): Promise<any> {
        return await this.taskService.update(taskDto, taskCreateDto)
    }
}
