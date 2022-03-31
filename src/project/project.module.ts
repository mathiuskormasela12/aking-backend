// ========== Project Module
// import all module
import { Module } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { ProjectController } from "./project.controller";
import { ValidationPipe } from "./project.pipe";
import { ProjectService } from "./project.service";

@Module({
	imports: [JwtModule.register({})],
	providers: [
		{
			provide: APP_PIPE,
			useClass: ValidationPipe
		},
		ProjectService],
	controllers: [ProjectController]
})
export class ProjectModule {}