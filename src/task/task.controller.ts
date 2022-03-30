import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateTaskDto } from './dto';
import { TaskService } from './task.service';

@Controller('api/v1')
export class TaskController {
	constructor(private taskService: TaskService) {}

	@Post('task')
	@UseGuards(AuthGuard)
	public createTask(@Request() req: Request, @Body() dto: CreateTaskDto) {
		return this.taskService.createTask(req, dto);
	}
}
