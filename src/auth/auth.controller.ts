// ========== Auth Controller
// import all modules
import { Controller, Request, Body, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
	CreateAccessTokenDto,
	GetResetCodeDto,
	LoginDto,
	RegisterDto,
	ResetPasswordDto,
} from './dto';

@Controller('api/v1')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('auth/register')
	public register(@Request() req: Request, @Body() dto: RegisterDto) {
		return this.authService.register(req, dto);
	}

	@Post('auth/login')
	public login(@Request() req: Request, @Body() dto: LoginDto) {
		return this.authService.login(req, dto);
	}

	@Post('auth/access-token')
	public createAccessToken(
		@Request() req: Request,
		@Body() dto: CreateAccessTokenDto,
	) {
		return this.authService.createAccessToken(req, dto);
	}

	@Post('auth/password')
	public getResetCode(@Request() req: Request, @Body() dto: GetResetCodeDto) {
		return this.authService.getResetCode(req, dto);
	}

	@Put('auth/password')
	public resetPassword(@Request() req: Request, @Body() dto: ResetPasswordDto) {
		return this.authService.resetPassword(req, dto);
	}
}
