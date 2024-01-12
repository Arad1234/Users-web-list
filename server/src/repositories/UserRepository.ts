import { injectable } from 'inversify';
import DBService from '../services/DbService';
import axiosClient from '../utils/axiosClient';
import { UserSchemaType } from '../schema/UserSchema';
import { DocumentType } from '@typegoose/typegoose';
import { UsersClass } from '../models/UserModel';
import AppError from '../utils/appError';
import { NOT_FOUND } from '../utils/constants';

@injectable()
class UserRepository {
	constructor(private readonly dbService: DBService) {}

	public async getUserByIdFromDB(id: number, page: number) {
		const usersData = await this.getUsersByPageFromDB(page);

		if (!usersData) {
			throw new AppError(`Error fetching page ${page}`, NOT_FOUND);
		}

		const user = usersData.users.find((user) => user.id === id);

		return user;
	}

	public async getUserByIdFromAPI(id: number) {
		try {
			const { data } = await axiosClient.get(`/users/${id}`);
			const user = data.data;
			return user;
		} catch (error) {
			throw new AppError(`Error fetching user with id ${id}`, NOT_FOUND);
		}
	}

	public async getUsersByPageFromDB(page: number) {
		const usersData = await this.dbService.UsersModel.findOne({ page });
		return usersData;
	}

	public async getUsersByPageFromAPI(page: number) {
		const { data } = await axiosClient.get(`/users/?page=${page}`);
		const usersPage = data.page;
		const usersList = data.data;

		// Don't create a new doc in the DB if there are zero users.
		if (!usersList.length) {
			return { page, users: [] };
		}

		const createdDoc = await this.dbService.UsersModel.create({
			page: usersPage,
			users: usersList,
		});

		return createdDoc;
	}

	public async createUser(
		userPayload: UserSchemaType,
		usersData: DocumentType<UsersClass>
	) {
		// Creating the user with the external API and with the DB.
		await axiosClient.post(`/users/`, { ...userPayload });

		const { page, ...restPayload } = userPayload;

		const userId = usersData.users.length + 1;

		const newUser = { ...restPayload, id: userId };

		usersData.users.push(newUser);

		await usersData.save();

		return newUser;
	}
}

export default UserRepository;
