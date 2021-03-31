import { Router } from 'express';
import authController from '../controllers/AuthController';
import userController from '../controllers/UserController';

const router = new Router();

router.post('/', authController.store);
router.post('/register', userController.store);

export default router;
