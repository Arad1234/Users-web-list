import {
	controller,
	httpDelete,
	httpGet,
	httpPost,
	httpPut,
} from 'inversify-express-utils';
import { UserService } from '../services/UserService';
import { NextFunction, Request, Response } from 'express';
import { CREATED, NO_CONTENT, OK } from '../utils/constants';
import {
	GetUserByIdSchema,
	GetUserByIdSchemaType,
	UserSchema,
	UserSchemaType,
} from '../schema/UserSchema';
import validateResource from '../middlewares/validateResource';
import verifyToken from '../middlewares/verifyToken';

@controller('/api')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@httpGet('/getUsers/:page', verifyToken)
	public async getUsers(req: Request, res: Response, next: NextFunction) {
		const page = parseInt(req.params.page, 10);
		console.log('page', page);
		try {
			const users = await this.userService.getUsersByPage(page);

			res.status(OK).json({ status: 'Success', data: users });
		} catch (error) {
			next(error);
		}
	}

	@httpGet('/getUser/:id', validateResource(GetUserByIdSchema))
	public async getUser(
		req: Request<
			GetUserByIdSchemaType['params'],
			{},
			GetUserByIdSchemaType['body']
		>,
		res: Response,
		next: NextFunction
	) {
		const id = parseInt(req.params.id, 10);
		const { page } = req.body;

		try {
			const user = await this.userService.getUserById(id, page);

			res.status(OK).json({ status: 'Success', data: user });
		} catch (error) {
			next(error);
		}
	}

	@httpPost('/createUser', validateResource(UserSchema))
	public async createUser(
		req: Request<{}, {}, UserSchemaType>,
		res: Response,
		next: NextFunction
	) {
		const { avatar, email, first_name, last_name, page } = req.body;

		try {
			const creadedUser = await this.userService.createUser({
				page,
				avatar,
				email,
				first_name,
				last_name,
			});

			res.status(CREATED).json({ status: 'Success', data: creadedUser });
		} catch (error) {
			next(error);
		}
	}

	@httpPut('/updateUser/:id', validateResource(UserSchema))
	public async updateUser(
		req: Request<{ id: string }, {}, UserSchemaType>,
		res: Response,
		next: NextFunction
	) {
		const { avatar, email, first_name, last_name, page } = req.body;
		const id = parseInt(req.params.id, 10);

		try {
			const updatedUser = await this.userService.updateUser({
				page,
				avatar,
				email,
				first_name,
				last_name,
				id,
			});

			res.status(OK).json({ status: 'Success', data: updatedUser });
		} catch (error) {
			next(error);
		}
	}

	@httpDelete('/deleteUser/:id', validateResource(GetUserByIdSchema))
	public async deleteUser(
		req: Request<
			GetUserByIdSchemaType['params'],
			{},
			GetUserByIdSchemaType['body']
		>,
		res: Response,
		next: NextFunction
	) {
		const id = parseInt(req.params.id, 10);
		const { page } = req.body;

		try {
			await this.userService.deleteUser(id, page);
			res.sendStatus(NO_CONTENT);
		} catch (error) {
			next(error);
		}
	}
}
