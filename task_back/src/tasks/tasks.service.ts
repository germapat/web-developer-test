import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskInterface } from './interfaces/task-interface'
import { TaskCreateDto } from './dto/task-create-dto'
import { TaskDto } from './dto/task-dto'
import { ErrorCode } from '../commons/ErrorCode'
@Injectable()
export class TasksService {
    constructor(@InjectModel('Tasks') private readonly taskModel: Model<TaskInterface>
    ) { }

    async getTask(dto) {
        return await this.taskModel.findOne({ _id: dto._id });
    }

    async createTask(taskCreateDto: TaskCreateDto): Promise<TaskInterface> {
        const task = new this.taskModel(taskCreateDto)
        return await task.save();
    }
    async update(dto: TaskDto, taskCreateDto: TaskCreateDto): Promise<TaskInterface> {
        try {
            let task = await this.taskModel.findOne({ _id: dto._id }).exec();
            (await task).name = taskCreateDto.name;
            (await task).priority = taskCreateDto.priority;
            (await task).expirationDate = taskCreateDto.expirationDate;
            (await task).status = taskCreateDto.status || task.status;
            return (await task).save()
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
}
