import mongoose from 'mongoose';
import config from '../utils/config';
import { injectable } from 'inversify';
import UsersModel from '../models/UserModel';

@injectable()
class DBService {
	async connect() {
		if (!config.db.uri) {
			throw new Error('DB uri must be defined');
		}

		try {
			await mongoose.connect(config.db.uri);
			console.log('Connected to DB');
		} catch (error) {
			console.error(error);
		}
	}

	get UsersModel() {
		return UsersModel;
	}
}

export default DBService;
