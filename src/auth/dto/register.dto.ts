// ========== Register Dto

import {
	IsAlphanumeric,
	IsEmail,
	IsNotEmpty,
	IsString,
	MinLength,
} from 'class-validator';

export class RegisterDto {
	@MinLength(3, { message: 'The full name is too short' })
	@IsString({ message: 'The full name must be a string' })
	@IsNotEmpty({ message: "The full name can't be empty" })
	fullName: string;

	@IsEmail({ message: 'The username must be an email' })
	@IsString({ message: 'The username must be a string' })
	@IsNotEmpty({ message: "The username can't be empty" })
	username: string;

	@IsAlphanumeric()
	@IsNotEmpty({ message: "The password can't be empty" })
	password: string;

	@IsAlphanumeric()
	@IsNotEmpty({ message: "The password confirmation can't be empty" })
	passwordConfirmation: string;
}
