import { TypeOf, object, string } from 'zod';

export const AuthSchema = object({
	body: object({
		email: string({ required_error: 'Email must be provided' })
			.trim()
			.min(1, 'Email must be provided')
			.email('Must be a valid email'),
		password: string({ required_error: 'Password must be provided' }).min(
			6,
			'Password must be at least 6 chars'
		),
	}),
});

export type AuthSchemaType = TypeOf<typeof AuthSchema>['body'];
