import express from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateClassesControler from '../controllers/CreateClassesController';
import CreateUserLogin from '../controllers/CreateUserController';
import UpdateUserProfileController from '../controllers/UpdateUserProfileController';
import EnsureAuthenticated from '../database/middleware/EnsureAuthenticated';

const route = express.Router();
const upload = multer(uploadConfig);

const createClassesControler = new CreateClassesControler();
const createUserLogin = new CreateUserLogin();
const updateUserProfileController = new UpdateUserProfileController();

route.use(EnsureAuthenticated);

route.put('/profile', updateUserProfileController.update);
route.patch('/avatar', upload.single('avatar'), updateUserProfileController.patch);

route.get('/classes', createClassesControler.index);
route.post('/classes', createClassesControler.create);

export default route;
