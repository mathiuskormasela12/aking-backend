// ========== Get Reset Code Dto

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GetResetCodeDto {
	@IsEmail({ message: 'The username must be an email' })
	@IsString({ message: 'The username must be a string' })
	@IsNotEmpty({ message: "The username can't be empty" })
	username: string;
}
