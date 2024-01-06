import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import config from '../utils/config';

@injectable()
class AuthRepository {
	public async generateToken(payload: { email: string }) {
		const token = jwt.sign(payload, config.auth.secretKey!);

		return token;
	}
}

export default AuthRepository;
