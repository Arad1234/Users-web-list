import { injectable } from 'inversify';
import axiosClient from '../utils/axiosClient';
import { UserSchemaType } from '../schema/UserSchema';
import AppError from '../utils/appError';
import { NOT_FOUND } from '../utils/constants';
import UserRepository from '../repositories/UserRepository';

@injectable()
class UserService {
	constructor(private readonly userRepo: UserRepository) {}

	public async getUsersByPage(page: number) {
		let usersData;
		usersData = await this.userRepo.getUsersByPageFromDB(page);

		if (usersData) {
			return usersData.users;
		}

		usersData = await this.userRepo.getUsersByPageFromAPI(page);
		return usersData.users;
	}

	public async getUserById(id: number, page: number) {
		const user = await this.userRepo.getUserByIdFromDB(id, page);

		if (!user) {
			const userFromApi = await this.userRepo.getUserByIdFromAPI(id);

			return userFromApi;
		}

		return user;
	}

	public async createUser(userPayload: UserSchemaType) {
		const usersData = await this.userRepo.getUsersByPageFromDB(
			userPayload.page
		);

		if (!usersData) {
			throw new AppError(`Page ${userPayload.page} does not exist`, NOT_FOUND);
		}

		const createdUser = await this.userRepo.createUser(userPayload, usersData);
		return createdUser;
	}

	public async updateUser(userPayload: UserSchemaType & { id: number }) {
		const { id, page, ...updatedProperties } = userPayload;

		await axiosClient.put(`/users/${id}`, {
			...updatedProperties,
		});

		const usersData = await this.userRepo.getUsersByPageFromDB(page);

		if (!usersData) {
			throw new AppError(`Page ${page} does not exist`, NOT_FOUND);
		}

		let userIndex = usersData?.users.findIndex((user) => user.id === id);

		if (userIndex === -1) {
			throw new AppError(`User not found with id ${id}`, NOT_FOUND);
		}

		usersData.users[userIndex] = {
			...usersData.users[userIndex],
			...updatedProperties,
		};

		await usersData.save();

		return usersData.users[userIndex];
	}

	public async deleteUser(id: number, page: number) {
		await axiosClient.delete(`/users/${id}`);

		const usersData = await this.userRepo.getUsersByPageFromDB(page);

		if (!usersData) {
			throw new AppError(`Page ${page} does not exist`, NOT_FOUND);
		}

		const newUsersList = usersData.users.filter((user) => user.id !== id);

		if (newUsersList.length === usersData.users.length) {
			throw new AppError(`User not found with id ${id}`, NOT_FOUND);
		}

		usersData.users = newUsersList;
		await usersData.save();
	}
}

export default UserService;
