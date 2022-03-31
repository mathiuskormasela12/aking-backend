// // ========== Project Service
// import all modules
import { Body, HttpStatus, Injectable, Request } from "@nestjs/common";
import { response, responseGenerator } from "../helpers";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProjectDto } from "./dto";

@Injectable()
export class ProjectService {
	constructor(private prismaService: PrismaService) {}

	public async createProject(@Request() req: Request, @Body() dto: CreateProjectDto) {
		try {
			const projectTitle = await this.prismaService.project.findFirst({ where: {
				title: dto.title
			}})

			if(projectTitle) {
				throw responseGenerator(req.url, HttpStatus.BAD_REQUEST, false, 'The project already exists')
			}

			try {
				const result = await this.prismaService.project.create({
					data: {
						title: dto.title,
						color: dto.color
					}
				})

				throw responseGenerator(req.url, HttpStatus.CREATED, true, 'The project has been created successfully', result)
	
			} catch (err) {
				if(err instanceof Error) {
					throw responseGenerator(req.url, HttpStatus.BAD_REQUEST, false, err.message)
				} else {
					throw err
				}
			}
			
		} catch (err) {
			if(err instanceof Error) {
				throw response({
					status: HttpStatus.BAD_REQUEST,
					success: false,
					message: err.message
				})
			} else {
				throw response(err)
			}
		}
	}
}