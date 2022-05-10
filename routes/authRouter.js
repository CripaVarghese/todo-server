import { Router as createRouter} from 'express';
import * as authController from '../controllers/authController';
import * as auth from '../middleware/auth';

const router = createRouter();

router.post('/login', authController.loginUser);

router.post('/register', authController.registerUser);

router.post('/logout', authController.logoutUser);

router.post('/token', authController.refreshAccessToken);


export default router;