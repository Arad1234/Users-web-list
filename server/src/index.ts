import 'reflect-metadata';
import './controllers/UserController';
import './controllers/AuthController';
import App from './application';

const startApp = async () => {
	new App().setup();
};

startApp();
