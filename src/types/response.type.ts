// ========== Response Type
import { HttpException } from '@nestjs/common';
import { IResponse } from '../interfaces';

export type ResponseFunc = (results: IResponse) => HttpException;

export type ResponseGeneratorFunc = (
	url: string,
	status: number,
	success: boolean,
	message: string,
	results?: any,
	totalData?: number,
	totalPages?: number,
) => IResponse;
