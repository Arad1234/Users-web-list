import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema } from 'zod';
import AppError from '../utils/appError';
import { NOT_FOUND } from '../utils/constants';

const validateResource = (schema: ZodSchema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({ body: req.body, query: req.query, params: req.params });
			next();
		} catch (error) {
			const zodError = error as ZodError;
			const [issue] = zodError.issues;

			// Your instructions specified that a 404 status code should be returned when the content of the request is incorrect.
			next(new AppError(issue.message, NOT_FOUND));
		}
	};
};

export default validateResource;
