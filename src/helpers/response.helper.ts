// ========== Response
// import all modules
import { HttpException } from '@nestjs/common';
import { IResponse } from '../interfaces';
import { ResponseFunc } from '../types';

export const response: ResponseFunc = (results: IResponse) => {
	return new HttpException(results, results.status);
};
