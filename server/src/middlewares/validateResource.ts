import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema } from 'zod';
import AppError from '../utils/appError';
import { BAD_REQUEST } from '../utils/constants';

const validateResource = (schema: ZodSchema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({ body: req.body, query: req.query, params: req.params });
			next();
		} catch (error) {
			const zodError = error as ZodError;
			const [issue] = zodError.issues;
			next(new AppError(issue.message, BAD_REQUEST));
		}
	};
};

export default validateResource;
