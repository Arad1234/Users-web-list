import { TypeOf, number, object, string } from 'zod';

export const GetUserByIdSchema = object({
	body: object({ page: number({ required_error: 'Page is required' }) }),
	params: object({ id: string({ required_error: 'Id is required' }) }),
});

export type GetUserByIdSchemaType = TypeOf<typeof GetUserByIdSchema>;

export const UserSchema = object({
	body: object({
		page: number({ required_error: 'Page is required' }),
		email: string({ required_error: 'Email is required' }).email(
			'Invalid email'
		),
		first_name: string({ required_error: 'First name is required' }),
		last_name: string({ required_error: 'Last name is required' }),
		avatar: string({ required_error: 'Avatar image is required' }),
	}),
});

export type UserSchemaType = TypeOf<typeof UserSchema>['body'];
