import {
	controller,
	httpDelete,
	httpGet,
	httpPost,
	httpPut,
} from 'inversify-express-utils';
import { NextFunction, Request, Response } from 'express';
import { CREATED, NO_CONTENT, OK } from '../utils/constants';
import {
	GetUserByIdSchema,
	GetUserByIdSchemaType,
	GetUserByPageSchema,
	GetUserByPageSchemaType,
	UserSchema,
	UserSchemaType,
} from '../schema/UserSchema';
import validateResource from '../middlewares/validateResource';
import verifyToken from '../middlewares/verifyToken';
import UserService from '../services/UserService';

@controller('/api')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@httpGet('/getUsers/:page', validateResource(GetUserByPageSchema))
	public async getUsers(
		req: Request<GetUserByPageSchemaType['params']>,
		res: Response,
		next: NextFunction
	) {
		const page = parseInt(req.params.page, 10);

		const users = await this.userService.getUsersByPage(page);

		res.status(OK).json({ status: 'Success', data: users });
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
		const page = parseInt(req.body.page, 10);

		const user = await this.userService.getUserById(id, page);

		res.status(OK).json({ status: 'Success', data: user });
	}

	@httpPost('/createUser', verifyToken, validateResource(UserSchema))
	public async createUser(
		req: Request<{}, {}, UserSchemaType>,
		res: Response,
		next: NextFunction
	) {
		const { avatar, email, first_name, last_name, page } = req.body;

		const createdUser = await this.userService.createUser({
			page,
			avatar,
			email,
			first_name,
			last_name,
		});

		res.status(CREATED).json({ status: 'Success', data: createdUser });
	}

	@httpPut('/updateUser/:id', verifyToken, validateResource(UserSchema))
	public async updateUser(
		req: Request<{ id: string }, {}, UserSchemaType>,
		res: Response,
		next: NextFunction
	) {
		const { avatar, email, first_name, last_name, page } = req.body;
		const id = parseInt(req.params.id, 10);

		const updatedUser = await this.userService.updateUser({
			page,
			avatar,
			email,
			first_name,
			last_name,
			id,
		});

		res.status(OK).json({ status: 'Success', data: updatedUser });
	}

	@httpDelete(
		'/deleteUser/:id',
		verifyToken,
		validateResource(GetUserByIdSchema)
	)
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
		const page = parseInt(req.body.page, 10);

		await this.userService.deleteUser(id, page);
		res.sendStatus(NO_CONTENT);
	}
}
