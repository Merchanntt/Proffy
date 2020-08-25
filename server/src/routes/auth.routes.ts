import express from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateClassesControler from '../controllers/CreateClassesController';
import ScheduleUpdateController from '../controllers/ScheduleUpdateController';
import UpdateUserProfileController from '../controllers/UpdateUserProfileController';
import EnsureAuthenticated from '../database/middleware/EnsureAuthenticated';

const route = express.Router();
const upload = multer(uploadConfig);

const createClassesControler = new CreateClassesControler();
const scheduleUpdateController = new ScheduleUpdateController();
const updateUserProfileController = new UpdateUserProfileController();

route.use(EnsureAuthenticated);

route.put('/profile', updateUserProfileController.update);
route.patch('/avatar', upload.single('avatar'), updateUserProfileController.patch);

route.get('/classes', createClassesControler.index);
route.post('/classes', createClassesControler.create);

route.get('/classes-schedule', scheduleUpdateController.index);
route.put('/classes-schedule', scheduleUpdateController.update);
route.delete('/classes-schedule/:id', scheduleUpdateController.delete);

export default route;
