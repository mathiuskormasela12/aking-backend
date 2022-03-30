// ========== Create Task Dto

import {
	IsDateString,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
} from 'class-validator';

export class CreateTaskDto {
	@IsInt({ message: 'The userId must be a number' })
	@IsNotEmpty({ message: "The userId can't be empty" })
	userId: number;

	@IsInt({ message: 'The projectId must be a number' })
	@IsNotEmpty({ message: "The projectId can't be empty" })
	projectId: number;

	@IsInt({ message: 'The creatorId must be a number' })
	@IsNotEmpty({ message: "The creatorId can't be empty" })
	creatorId: number;

	@IsInt({ message: 'The memberId must be a number' })
	@IsOptional()
	memberId: number;

	@IsDateString({ message: 'The dueDate must be a number' })
	@IsNotEmpty({ message: "The dueDate can't be empty" })
	dueDate: string;

	@IsString({ message: 'The title must be a string' })
	@IsNotEmpty({ message: "The title can't be empty" })
	title: string;

	@IsString({ message: 'The description must be a string' })
	@IsNotEmpty({ message: "The description can't be empty" })
	description: string;

	@IsOptional()
	file: string;
}
