// ========== Auth Service
// import all modules
import { Injectable, Request, Body, HttpStatus } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { response, responseGenerator } from '../helpers';
import { RegisterDto } from './dto';

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService) {}
	public async register(@Request() req: Request, @Body() dto: RegisterDto) {
		if (dto.password !== dto.passwordConfirmation) {
			throw response({
				status: HttpStatus.BAD_REQUEST,
				success: false,
				message: "The password and the password comfirmation don't match",
			});
		}

		try {
			const user = await this.prisma.user.findFirst({
				where: {
					username: dto.username,
				},
			});

			if (user) {
				throw responseGenerator(
					req.url,
					HttpStatus.BAD_REQUEST,
					false,
					'The username is already in used',
				);
			}

			try {
				const hashed = await argon.hash(dto.password);
				try {
					const result = await this.prisma.user.create({
						data: {
							fullName: dto.fullName,
							username: dto.username,
							password: hashed,
						},
					});

					delete result.password;
					delete result.photo;

					throw responseGenerator(
						req.url,
						HttpStatus.OK,
						true,
						'Register Successfully',
						result,
					);
				} catch (err) {
					if (err instanceof Error) {
						throw responseGenerator(
							req.url,
							HttpStatus.BAD_REQUEST,
							false,
							err.message,
						);
					} else {
						throw err;
					}
				}
			} catch (err) {
				if (err instanceof Error) {
					throw responseGenerator(
						req.url,
						HttpStatus.BAD_REQUEST,
						false,
						err.message,
					);
				} else {
					throw err;
				}
			}
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
