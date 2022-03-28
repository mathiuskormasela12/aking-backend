// ========== Auth Service
// import all modules
import { Injectable, Request, Body, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { response } from '../helpers';
import { RegisterDto } from './dto';

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService) {}
	public async register(@Request() req: Request, @Body() dto: RegisterDto) {
		console.log(req);
		console.log(dto);
		throw response({
			status: HttpStatus.OK,
			success: true,
			message: 'Hello World',
		});
	}
}
