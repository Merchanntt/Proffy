import express from 'express';

import CreateSessionController from '../controllers/CreateSessionController';

const route = express.Router();

const createSessionController = new CreateSessionController();

route.post('/', createSessionController.create);

export default route;
