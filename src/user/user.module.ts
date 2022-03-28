// ========= User Module
// import all modules
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { ValidationPipe } from './user.pipe';
import { UserService } from './user.service';

@Module({
	imports: [JwtModule.register({})],
	providers: [
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
		UserService,
	],
	controllers: [UserController],
})
export class UserModule {}
