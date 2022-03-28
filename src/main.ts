// ========== Main
// import all modules
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { appConfig } from './config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await app.listen(appConfig.PORT);
	Logger.log(`The RESTful API is running at ${appConfig.API_URL}`, 'API URL');
}
bootstrap();
