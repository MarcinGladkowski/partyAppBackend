import { Router }  from 'express';
import authController from '../controllers/authController';
import { catchAsync }  from '../middlewares/errors';

export default () => {
    const api = Router();

    api.post('/', catchAsync(authController.login));

    return api;
}