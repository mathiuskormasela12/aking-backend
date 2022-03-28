// ========== Main
// import all modules
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { appConfig } from './config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// Setup Cors
	app.enableCors({
		origin: appConfig.WHITE_LIST,
	});
	/* 
		Setup Global Pipes 
		This is for allow we use some validation
		using pipe and class-validator.
	*/
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
		}),
	);
	await app.listen(appConfig.PORT);
	Logger.log(`The RESTful API is running at ${appConfig.API_URL}`, 'API URL');
}
bootstrap();
