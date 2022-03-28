// ========= User Service
// import all modules
import { Injectable, Request, Param, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { response, responseGenerator } from '../helpers';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService, private config: ConfigService) {}

	public async getUser(@Request() req: Request, @Param('id') id: number) {
		try {
			const user = await this.prisma.user.findFirst({
				where: { id },
				select: {
					id: true,
					fullName: true,
					username: true,
					photo: true,
					createdAt: true,
					updatedAt: true,
				},
			});

			if (!user) {
				throw responseGenerator(
					req.url,
					HttpStatus.NOT_FOUND,
					false,
					"The user doesn't exists",
				);
			}

			throw responseGenerator(
				req.url,
				HttpStatus.OK,
				true,
				'Success to get a user',
				{
					...user,
					photo: this.config.get('APP_URL').concat('/user-photos/', user.photo),
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
}
