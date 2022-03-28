// ========== Response Generator
// import all modules
import { parse } from 'url';
import { IResponse } from '../interfaces';
import { ResponseGeneratorFunc } from '../types';
import { appConfig } from '../config';

export const responseGenerator: ResponseGeneratorFunc = (
	url: string,
	status: number,
	success: boolean,
	message: string,
	results?: any,
	totalData?: number,
	totalPages?: number,
): IResponse => {
	if (results && totalData && totalPages) {
		const {
			pathname,
			query: { page = 1, ...query },
		} = parse(url, true);

		const queries = { ...query, page };

		return {
			status,
			success,
			message,
			results,
			pageInfo: {
				totalData: Number(totalData),
				totalPages: Number(totalPages),
				page: Number(page),
				previousLink:
					page > 1
						? `${appConfig.APP_URL}${pathname}?${Object.keys(queries).map(
								(item, index) =>
									`${item}=${
										item === 'page'
											? Number(Object.values(queries)[index]) - 1
											: Object.values(queries)[index]
									}`,
						  )}`
						: null,
				nextLink:
					page < totalPages
						? `${appConfig.APP_URL}${pathname}?${Object.keys(queries).map(
								(item, index) =>
									`${item}=${
										item === 'page'
											? Number(Object.values(queries)[index]) + 1
											: Object.values(queries)[index]
									}`,
						  )}`
						: null,
			},
		};
	} else if (results) {
		return {
			status,
			success,
			message,
			results,
		};
	} else {
		return {
			status,
			success,
			message,
		};
	}
};
