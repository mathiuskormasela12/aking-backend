// ========== Task Service
import { Body, Request, Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto';
import { response, responseGenerator } from '../helpers';

@Injectable()
export class TaskService {
	constructor(private prismaService: PrismaService) {}

	public async createTask(@Request() req: Request, @Body() dto: CreateTaskDto) {
		try {
			const results = await this.prismaService.task.create({
				data: {
					projectId: dto.projectId,
					userId: dto.userId,
					title: dto.title,
					description: dto.description,
					dueDate: dto.dueDate,
					creatorId: dto.creatorId,
				},
			});
			throw responseGenerator(
				req.url,
				HttpStatus.CREATED,
				true,
				'The task has been created successfully',
				results,
			);
		} catch (err) {
			if (err instanceof Error) {
				throw response({
					status: HttpStatus.BAD_REQUEST,
					success: false,
					message: err.message,
				});
			} else {
				throw response(err);
			}
		}
	}
}
