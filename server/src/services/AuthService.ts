import { injectable } from 'inversify';
import { AuthSchemaType } from '../schema/AuthSchema';
import config from '../utils/config';
import AppError from '../utils/appError';
import { FORBIDDEN } from '../utils/constants';
import AuthRepository from '../repositories/AuthRepository';

@injectable()
class AuthService {
	constructor(private readonly authRepo: AuthRepository) {}
	public async login(credentials: AuthSchemaType) {
		if (
			credentials.email !== config.auth.email ||
			credentials.password !== config.auth.password
		) {
			throw new AppError('Credentials are not correct', FORBIDDEN);
		}

		const token = this.authRepo.generateToken({ email: credentials.email });

		return token;
	}
}

export default AuthService;
