// ========== App Module
// import all modules
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { appConfig } from './config';
console.log(
	`smtps://${appConfig.EMAIL.NAME}:${appConfig.EMAIL.PASSWORD}@${appConfig.EMAIL.HOST}`,
);
@Module({
	imports: [
		/* 
			Config module setup. 
			After we've set this one, 
			we can access the env variable 
			using dependency injection
		*/
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		// Static files setup (seems like app.use(express.static()))
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '../public'),
		}),
		MailerModule.forRoot({
			transport: `smtps://${appConfig.EMAIL.NAME}:${appConfig.EMAIL.PASSWORD}@${appConfig.EMAIL.HOST}`,
		}),
		AuthModule,
		UserModule,
		PrismaModule,
	],
})
export class AppModule {}
