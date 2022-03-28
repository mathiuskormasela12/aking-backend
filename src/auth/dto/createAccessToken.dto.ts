// ========= Create Access Token Dto
// import all modules

import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class CreateAccessTokenDto {
	@IsJWT({ message: 'Invalid refresh token' })
	@IsString({ message: 'The refresh token must be a string' })
	@IsNotEmpty({ message: "The refresh token can't be empty" })
	refreshToken: string;
}
