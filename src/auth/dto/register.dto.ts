// ========== Register Dto
import {
	IsEmail,
	IsNotEmpty,
	IsString,
	Matches,
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

	@IsString({ message: 'The password must be a string' })
	@MinLength(5, { message: 'The password is too short' })
	@Matches(/([A-Z])/, { message: 'The password is too weak' })
	@Matches(/([A-Z])/, { message: 'The password is too weak' })
	@Matches(/([0-9])/, { message: 'The password is too weak' })
	@Matches(/[\W]/, { message: 'The password is too weak' })
	@IsNotEmpty({ message: "The password can't be empty" })
	password: string;

	@IsString({ message: 'The password confirmation must be a string' })
	@MinLength(5, { message: 'The password confirmation is too short' })
	@Matches(/([A-Z])/, { message: 'The password confirmation is too weak' })
	@Matches(/([A-Z])/, { message: 'The password confirmation is too weak' })
	@Matches(/([0-9])/, { message: 'The password confirmation is too weak' })
	@Matches(/[\W]/, { message: 'The password confirmation is too weak' })
	@IsNotEmpty({ message: "The password confirmation can't be empty" })
	passwordConfirmation: string;
}
