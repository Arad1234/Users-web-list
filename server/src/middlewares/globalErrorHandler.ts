import { NextFunction, Request, Response } from 'express';
import { BAD_REQUEST } from '../utils/constants';
import AppError from '../utils/appError';
import { AxiosError } from 'axios';

const globalErrorHandler = (
	err: AppError | AxiosError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	err.status = err.status || 'error';

	if (err instanceof AxiosError) {
		return res.status(BAD_REQUEST).send({
			status: err.status,
			message: (err.response?.data as any).error,
		});
	} else if (err instanceof AppError) {
		return res.status(BAD_REQUEST).send({
			status: err.status,
			statusCode: err.statusCode,
			message: err.message,
		});
	}
};

export default globalErrorHandler;
