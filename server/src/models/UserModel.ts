import { getModelForClass, prop } from '@typegoose/typegoose';

export class User {
	@prop()
	id: number;
	@prop({ unique: true })
	email: string;
	@prop()
	first_name: string;
	@prop()
	last_name: string;
	@prop()
	avatar: string;
}

export class UsersClass {
	@prop({ unique: true })
	page: number;
	@prop()
	users: User[];
}

const UsersModel = getModelForClass(UsersClass, {
	options: { customName: 'Users' },
});

export default UsersModel;
