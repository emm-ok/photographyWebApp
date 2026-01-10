import { Router } from "express";
import { getMyProfile, updateMyProfile, getUserById, getAllUsers } from './user.controller.js';
import { protect } from '../../middlewares/auth.middlware.js'

import { allowRoles } from '../../middlewares/role.middleware.js'
import { ROLES } from '../../constants/roles.js'

const userRouter = Router();

// Logged-in User routes
userRouter.get('/me', protect, getMyProfile);
userRouter.put('/me', protect, updateMyProfile);

// Admin routes
userRouter.get('/', protect, allowRoles(ROLES.ADMIN),  getAllUsers);
userRouter.get('/:id', protect, allowRoles(ROLES.ADMIN),  getUserById);

// userRouter.patch('/:id/role', protect, allowRoles(ROLES.ADMIN), updateUserRole);

export default userRouter;