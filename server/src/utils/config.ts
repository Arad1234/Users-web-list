import dotenv from 'dotenv';
dotenv.config();

const { PORT, DB_URI, AUTH_EMAIL, AUTH_PASSWORD, SECRET_KEY } = process.env;

const config = {
	server: {
		port: PORT,
	},
	db: {
		uri: DB_URI,
	},
	auth: {
		email: AUTH_EMAIL,
		password: AUTH_PASSWORD,
		secretKey: SECRET_KEY,
	},
};

export default config;
