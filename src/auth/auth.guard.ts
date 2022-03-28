// ========== Auth Guard
// import all modules
import {
	CanActivate,
	ExecutionContext,
	HttpStatus,
	Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { response } from 'src/helpers';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private jwt: JwtService, private config: ConfigService) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		const token = request.headers['x-access-token'];
		const secretKey = this.config.get('JWT_ACCESS_TOKEN_SECRET_KEY');

		if (!token) {
			throw response({
				status: HttpStatus.FORBIDDEN,
				success: false,
				message: 'Forbidden',
			});
		} else {
			try {
				const decode = this.jwt.verify(token, { secret: secretKey });
				request.app.locals.decode = decode;
				return true;
			} catch (err) {
				throw response({
					status: HttpStatus.BAD_REQUEST,
					success: false,
					message: err.message,
				});
			}
		}
	}
}
