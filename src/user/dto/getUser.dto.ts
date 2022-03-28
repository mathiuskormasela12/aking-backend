// ========== Get User Dto
// import all modules

import { IsInt } from 'class-validator';

export class GetUserDto {
	@IsInt({ message: 'The id must be an integer' })
	id: number;
}
