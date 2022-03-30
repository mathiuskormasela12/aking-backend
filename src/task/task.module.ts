import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TaskController } from './task.controller';
import { ValidationPipe } from './task.pipe';
import { TaskService } from './task.service';

@Module({
	imports: [JwtModule.register({})],
	controllers: [TaskController],
	providers: [
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
		TaskService,
	],
})
export class TaskModule {}
