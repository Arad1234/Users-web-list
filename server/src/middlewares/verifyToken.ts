import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../utils/config';
import AppError from '../utils/appError';
import { FORBIDDEN } from '../utils/constants';

interface UserPayload {
	email: string;
}

declare global {
	namespace Express {
		interface Request {
			userPayload?: UserPayload;
		}
	}
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const { cookie } = req.headers;
	const token = cookie?.split('=')[1];

	if (!token) {
		throw new AppError('Token must be provided, please login again', FORBIDDEN);
	}

	const userPayload = jwt.verify(token, config.auth.secretKey!) as UserPayload;

	req.userPayload = userPayload;

	next();
};

export default verifyToken;
