import { CookieOptions } from 'express';
import { StatusCodes } from 'http-status-codes';

export const {
	OK,
	NO_CONTENT,
	NOT_FOUND,
	BAD_REQUEST,
	CREATED,
	INTERNAL_SERVER_ERROR,
	FORBIDDEN,
} = StatusCodes;

export const cookieOptions: CookieOptions = {
	httpOnly: true,
	secure: true,
	sameSite: 'none',
};

export const ONE_HOUR = 60 * 60 * 1000;
