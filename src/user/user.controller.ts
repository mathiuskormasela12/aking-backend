// ========== User Controller
// import all modules

import {
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Request,
	UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';

@Controller('api/v1')
export class UserController {
	constructor(private userService: UserService) {}

	@Get('user/:id')
	@UseGuards(AuthGuard)
	public getUser(
		@Request() req: Request,
		@Param('id', ParseIntPipe) id: number,
	) {
		return this.userService.getUser(req, id);
	}
}
