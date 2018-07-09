import { Router }  from 'express';
import authController from '../controllers/authController';
import { catchAsync }  from '../middlewares/errors';
import verifyToken from '../auth/authentication';

export default () => {
    const api = Router();

    api.post('/', catchAsync(authController.login));

    api.post('/check', verifyToken,  catchAsync(authController.check));

    return api;
}