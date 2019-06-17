import * as express from 'express';
import * as asyncWrap from 'express-async-wrap';
import UserRoles from 'constants/roles.constants';
import UserController from 'controllers/user.controller';
import { authenticate, authorize } from 'middlewares/authentication.middleware';

const router = express.Router();

router.post('/login', asyncWrap(UserController.login));

router.put('/:userId/password', authenticate,  authorize([UserRoles.Admin]), asyncWrap(UserController.updateUserPassword));

router.put('/:userId', authenticate, authorize([UserRoles.Admin]), asyncWrap(UserController.updateUser));

router.delete('/:userId', authenticate, authorize([UserRoles.Admin]), asyncWrap(UserController.deleteUser));

//router.post('/register', asyncWrap(UserController.register));

router.get('/', authenticate, authorize([UserRoles.Admin]), asyncWrap(UserController.getAll));

router.post('/', authenticate, authorize([UserRoles.Admin]), asyncWrap(UserController.createUser));

export default router;
