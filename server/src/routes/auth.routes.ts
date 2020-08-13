import express from 'express';

import CreateClassesControler from '../controllers/CreateClassesController';
import CreateUserLogin from '../controllers/CreateUserController';
import EnsureAuthenticated from '../database/middleware/EnsureAuthenticated';

const route = express.Router();

const createClassesControler = new CreateClassesControler();
const createUserLogin = new CreateUserLogin();

route.use(EnsureAuthenticated);

route.get('/:id', createUserLogin.index);

route.get('/classes', createClassesControler.index);
route.post('/classes', createClassesControler.create);

export default route;
