import 'reflect-metadata';
import './controllers/UserController';
import './controllers/AuthController';
import App from './application';

const startApp = () => {
	new App().setup();
};

startApp();
