import { Router } from 'express'
import { register, login, fetchMe, logout } from './auth.controller.js'
import { protect } from '../../middlewares/auth.middlware.js'

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

authRouter.get('/me', protect, fetchMe);

export default authRouter;