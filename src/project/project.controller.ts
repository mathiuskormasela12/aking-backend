// ========== Project Controller
// import all modules
import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { CreateProjectDto } from "./dto";
import { ProjectService } from "./project.service";

@Controller('api/v1')
export class ProjectController {
	constructor(private projectService: ProjectService) {}

	@Post('project')
	@UseGuards(AuthGuard)
	public createProject(@Request() req: Request, @Body() dto: CreateProjectDto) {
		return this.projectService.createProject(req, dto)
	}
}