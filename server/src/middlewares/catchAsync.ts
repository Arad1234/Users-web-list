import { NextFunction, Request, Response } from 'express';

type AsyncMiddlewareFucntion = (
	req: Request,
	res: Response,
	next: NextFunction
) => Promise<void>;

function catchAsync(fn: AsyncMiddlewareFucntion) {
	return function (req: Request, res: Response, next: NextFunction) {
		fn(req, res, next).catch(next);
	};
}

export default catchAsync;
