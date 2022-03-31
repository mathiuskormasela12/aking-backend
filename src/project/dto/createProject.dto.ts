// ========== Create Project Dto
// import all modules
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateProjectDto {
	@MaxLength(30, { message: 'The title is too long' })
	@IsString({ message: 'The projecy title must be a string' })
	@IsNotEmpty({ message: "The project title can't be empty" })
	title: string;

	@MinLength(1, { message: 'The project color is too short' })
	@IsString({ message: 'The project color must be a string' })
	@IsNotEmpty({ message: "The project color can't be empty" })
	color: string;
}