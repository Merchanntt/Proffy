import { Router } from 'express';

import AuthRoutes from './auth.routes';
import DefaultRoutes from './default.routes';
import SessionsRoutes from './sessions.routes';

const router = Router();

router.use('/', DefaultRoutes);
router.use('/sessions', SessionsRoutes);
router.use('/users', AuthRoutes);

export default router;
