// ========== Auth Service
// import all modules
import { Injectable, Request, Body, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { response } from '../helpers';

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService) {}
	public async register(@Request() req: Request, @Body() body: Body) {
		console.log(req);
		console.log(body);
		throw response({
			status: HttpStatus.OK,
			success: true,
			message: 'Hello World',
		});
	}
}
