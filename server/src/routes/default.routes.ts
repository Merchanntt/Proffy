import express from 'express';

import CreateUserController from '../controllers/CreateUserController';
import CreateConnectionsController from '../controllers/CreateConnectionsController';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const route = express.Router();

const createConnectionsController = new CreateConnectionsController();
const createUserController = new CreateUserController();
const forgotPasswordController = new ForgotPasswordController();

route.post('/create-user', createUserController.create);

route.post('/send-email', forgotPasswordController.index);
route.post('/reset-password', forgotPasswordController.update);

route.get('/connections', createConnectionsController.index);
route.post('/connections', createConnectionsController.create);

export default route;
