// ========== Auth Module
// import all modules
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ValidationPipe } from './auth.pipe';
import { APP_PIPE } from '@nestjs/core';

@Module({
	imports: [JwtModule.register({})],
	controllers: [AuthController],
	providers: [
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
		AuthService,
	],
})
export class AuthModule {}
