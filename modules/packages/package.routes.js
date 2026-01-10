import { Router } from 'express';

import {
    createPackage,
    getAllPackages,
    getPackageById,
    updatePackage,
    deletePackage,
} from './package.controller.js'

import { protect } from '../../middlewares/auth.middlware.js'
import { allowRoles } from "../../middlewares/role.middleware.js"
import { ROLES } from '../../constants/roles.js';

const packageRouter = Router();
// Public
packageRouter.get('/', getAllPackages);
packageRouter.get('/:id', getPackageById);

// Admin only
packageRouter.post('/', protect, allowRoles(ROLES.ADMIN), createPackage);

packageRouter.put('/:id', protect, allowRoles(ROLES.ADMIN), updatePackage);

packageRouter.delete('/:id', protect, allowRoles(ROLES.ADMIN), deletePackage);

export default packageRouter;