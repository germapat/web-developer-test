import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

const config = new ConfigService();

@Module({
  imports: [
    MongooseModule.forRoot(`${config.get('DB_HOST')}/${config.get('DB_NAME')}`, {
      useNewUrlParser: true
    }),
    AuthModule,
    UsersModule,
    ConfigModule,
    TasksModule,
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule { }
