import express from 'express';

import CreateClassesControler from './controllers/CreateClassesController';
import CreateConnectionsController from './controllers/CreateConnectionsController';

const route = express.Router();

const createClassesControler = new CreateClassesControler();
const createConnectionsController = new CreateConnectionsController();

route.get('/classes', createClassesControler.index);
route.post('/classes', createClassesControler.create);

route.get('/connections', createConnectionsController.index);
route.post('/connections', createConnectionsController.create);

export default route;
