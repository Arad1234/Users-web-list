import { Container } from 'inversify';
import UserService from './services/UserService';
import UserRepository from './repositories/UserRepository';
import DBService from './services/DbService';
import AuthService from './services/AuthService';
import AuthRepository from './repositories/AuthRepository';

const container = new Container({ defaultScope: 'Singleton' });

container.bind(UserService).toSelf();
container.bind(UserRepository).toSelf();
container.bind(DBService).toSelf();
container.bind(AuthService).toSelf();
container.bind(AuthRepository).toSelf();

export default container;
