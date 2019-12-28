import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskcShema } from './schemas/task.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Tasks', schema: TaskcShema }])],
  providers: [TasksService],
  controllers: [TasksController],
  exports:[TasksService]
})
export class TasksModule {}
