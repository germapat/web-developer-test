import { Controller, Get, Query, Post, Body, UseGuards, Put } from '@nestjs/common';
import { TaskDto } from './dto/task-dto'
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
