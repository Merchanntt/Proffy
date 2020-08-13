import express from 'express';

import CreateUserController from '../controllers/CreateUserController';
import CreateConnectionsController from '../controllers/CreateConnectionsController';

const route = express.Router();

const createConnectionsController = new CreateConnectionsController();
const createUserController = new CreateUserController();

route.post('/create-user', createUserController.create);

route.get('/connections', createConnectionsController.index);
route.post('/connections', createConnectionsController.create);

export default route;
