// ========== Auth Controller
// import all modules
import { Controller, Request, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/v1')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('auth/register')
	public register(@Request() req: Request, @Body() body: Body) {
		return this.authService.register(req, body);
	}
}
