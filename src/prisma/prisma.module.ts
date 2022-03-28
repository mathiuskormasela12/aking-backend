// ========== Prisma Module
// import all modules
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/* 
	Make the Prisma become global module. 
	So, we can access prisma to 
	any module, controllers and
	services. We don't need
	import the service module on
	the other file if we want 
	to user the prisma service.
*/
@Global()
@Module({
	providers: [PrismaService],
	/*
		Export prisma.
		We export the prisma service to allow
		the prisma service is called from
		the other modules, controllers and
		services. But we have to import the
		prisma service from its. 
	*/
	exports: [PrismaService],
})
export class PrismaModule {}
