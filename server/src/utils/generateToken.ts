import jwt from 'jsonwebtoken';
import config from './config';

export const generateToken = (payload: { email: string }) => {
	const token = jwt.sign(payload, config.auth.secretKey!);

	return token;
};
