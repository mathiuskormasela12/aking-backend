// ========== App Config
// import all modules
import 'dotenv/config';

export const appConfig = {
	PORT: process.env.PORT,
	APP_URL: process.env.APP_URL,
	API_URL: process.env.API_URL,
	PUBLIC_URL: process.env.PUBLIC_URL,
	WHITE_LIST: ['http://localhost:3000'],
};
