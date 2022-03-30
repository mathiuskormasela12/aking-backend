// ========== Reset Password Dto

import {
	IsNotEmpty,
	IsNumberString,
	Length,
	IsString,
	MinLength,
	Matches,
} from 'class-validator';

export class ResetPasswordDto {
	@Length(4, 4, { message: 'The reset code is invalid' })
	@IsNumberString({ message: 'The reset code must be a number string' })
	@IsNotEmpty({ message: "The reset code can't be empty" })
	resetCode: string;

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
