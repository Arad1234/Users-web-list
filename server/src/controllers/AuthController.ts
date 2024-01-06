import { NextFunction, Request, Response } from 'express';
import { controller, httpPost } from 'inversify-express-utils';
import { AuthSchema, AuthSchemaType } from '../schema/AuthSchema';
import AuthService from '../services/AuthService';
import { OK, cookieOptions } from '../utils/constants';
import validateResource from '../middlewares/validateResource';

@controller('/api')
class AuthController {
	constructor(private readonly authService: AuthService) {}

	@httpPost('/login', validateResource(AuthSchema))
	public async loginUser(
		req: Request<{}, {}, AuthSchemaType>,
		res: Response,
		next: NextFunction
	) {
		const { email, password } = req.body;

		try {
			const token = await this.authService.login({ email, password });
			res.cookie('token', token, cookieOptions);

			res.status(OK).json({ status: 'Authorized' });
		} catch (error) {
			next(error);
		}
	}
}

export default AuthController;
