import cors from 'cors';
import { InversifyExpressServer } from 'inversify-express-utils';
import globalErrorHandler from './middlewares/globalErrorHandler';
import express from 'express';
import container from './di-container';
import config from './utils/config';
import DBService from './services/DbService';
import Application from './lib/abstract-application';
import cookieParser from 'cookie-parser';

class App extends Application {
	async setup() {
		const _db = container.get(DBService);

		await _db.connect();

		const port = 3000 || config.server.port;

		const server = new InversifyExpressServer(container);

		server.setConfig((app) => {
			app.use(
				cors({
					origin: [
						'https://localhost:5173',
						'https://www.google.com',
						'https://www.facebook.com',
					],
					credentials: true,
				})
			);

			app.use(cookieParser());

			app.use(express.json());
		});

		server.setErrorConfig((app) => {
			app.use(globalErrorHandler);
		});

		const app = server.build();

		app.listen(port, () =>
			console.log(`Server listening on http://localhost:${port}`)
		);
	}
}

export default App;
