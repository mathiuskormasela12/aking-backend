// ========== Auth Service
// import all modules
import { Injectable, Request, Body, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { response, responseGenerator, sendResetCode } from '../helpers';
import {
	CreateAccessTokenDto,
	GetResetCodeDto,
	LoginDto,
	RegisterDto,
	ResetPasswordDto,
} from './dto';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
		private config: ConfigService,
		private mailer: MailerService,
	) {}

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
						HttpStatus.CREATED,
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

	public async login(@Request() req: Request, @Body() dto: LoginDto) {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					username: dto.username,
				},
			});

			if (!user || !(await argon.verify(user.password, dto.password))) {
				throw responseGenerator(
					req.url,
					HttpStatus.BAD_REQUEST,
					false,
					'The username or the password is wrong',
				);
			}
			const accessTokenSecret = this.config.get('JWT_ACCESS_TOKEN_SECRET_KEY');
			const accessTokenExpiresIn = this.config.get('ACCESS_TOKEN_EXPIRES_IN');
			const refreshTokenExpiresIn = this.config.get('REFRESH_TOKEN_EXPIRES_IN');
			const refreshTokenSecret = this.config.get(
				'JWT_REFRESH_TOKEN_SECRET_KEY',
			);
			const accessToken = this.jwt.sign(
				{ id: user.id },
				{ expiresIn: accessTokenExpiresIn, secret: accessTokenSecret },
			);
			const refreshToken = this.jwt.sign(
				{ id: user.id },
				{ expiresIn: refreshTokenExpiresIn, secret: refreshTokenSecret },
			);

			throw responseGenerator(
				req.url,
				HttpStatus.CREATED,
				true,
				'Login Successfully',
				{ accessToken, refreshToken },
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

	public async createAccessToken(
		@Request() req: Request,
		@Body() dto: CreateAccessTokenDto,
	) {
		const refreshTokenSecret = this.config.get('JWT_REFRESH_TOKEN_SECRET_KEY');
		const refreshTokenExpiresIn = this.config.get('REFRESH_TOKEN_EXPIRES_IN');

		try {
			const decode = this.jwt.verify(dto.refreshToken, {
				secret: refreshTokenSecret,
			});
			const accesssTokenSecret = this.config.get('JWT_ACCESS_TOKEN_SECRET_KEY');
			const accessTokenExpiresIn = this.config.get('ACCESS_TOKEN_EXPIRES_IN');
			const newAccessToken = this.jwt.sign(
				{ id: decode.id },
				{ secret: accesssTokenSecret, expiresIn: accessTokenExpiresIn },
			);
			const newRefreshToken = this.jwt.sign(
				{ id: decode.id },
				{ secret: refreshTokenSecret, expiresIn: refreshTokenExpiresIn },
			);

			throw responseGenerator(
				req.url,
				HttpStatus.CREATED,
				true,
				'The access token is created successfully',
				{
					accessToken: newAccessToken,
					refreshToken: newRefreshToken,
				},
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

	public async getResetCode(
		@Request() req: Request,
		@Body() dto: GetResetCodeDto,
	) {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					username: dto.username,
				},
			});

			if (!user) {
				throw responseGenerator(
					req.url,
					HttpStatus.NOT_FOUND,
					false,
					"The username doesn't exists",
				);
			}

			if (user.resetCode) {
				throw responseGenerator(
					req.url,
					HttpStatus.BAD_REQUEST,
					false,
					'You have the reset code already, please check your email',
				);
			}

			const resetCode = `${Math.floor(Math.random() * 9) + 1}${
				Math.floor(Math.random() * 9) + 1
			}${Math.floor(Math.random() * 9) + 1}${
				Math.floor(Math.random() * 9) + 1
			}`;

			try {
				await sendResetCode(
					this.mailer,
					dto.username,
					this.config.get('EMAIL'),
					resetCode,
				);

				try {
					await this.prisma.user.update({
						where: { id: user.id },
						data: { resetCode },
					});

					throw responseGenerator(
						req.url,
						HttpStatus.CREATED,
						true,
						'The reset code has been sent',
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
					console.log(err, this.config.get('EMAIL'));
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

	public async resetPassword(
		@Request() req: Request,
		@Body() dto: ResetPasswordDto,
	) {
		if (dto.password !== dto.passwordConfirmation) {
			throw response({
				status: HttpStatus.BAD_REQUEST,
				success: false,
				message: "The password and the confirm password doesn't match",
			});
		}

		try {
			const user = await this.prisma.user.findFirst({
				where: { resetCode: dto.resetCode },
			});

			if (!user) {
				throw responseGenerator(
					req.url,
					HttpStatus.BAD_REQUEST,
					false,
					"The reset code doesn't exists",
				);
			}

			try {
				const hashed = await argon.hash(dto.password);

				try {
					await this.prisma.user.update({
						where: { id: user.id },
						data: { password: hashed, resetCode: null },
					});

					throw responseGenerator(
						req.url,
						HttpStatus.OK,
						true,
						'The password has been updated',
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
						HttpStatus.INTERNAL_SERVER_ERROR,
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
