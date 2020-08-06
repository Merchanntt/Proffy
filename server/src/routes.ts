import express from 'express';

import CreateClassesControler from './controllers/CreateClassesController';
import CreateConnectionsController from './controllers/CreateConnectionsController';

const routes = express();

const createClassesControler = new CreateClassesControler();
const createConnectionsController = new CreateConnectionsController();

routes.get('classes', createClassesControler.index);
routes.post('classes', createClassesControler.create);

routes.get('connections', createConnectionsController.index);
routes.post('connections', createConnectionsController.create);

export default routes;
