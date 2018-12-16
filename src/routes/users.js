import { Router }  from 'express';
import usersController from '../controllers/usersController';
import { catchAsync }  from '../middlewares/errors';
import verifyToken from '../auth/authentication';

export default () => {
    const api = Router();

    api.post('/', catchAsync(usersController.create));
    api.post('/activate', catchAsync(usersController.activate));
    api.get('/', verifyToken, catchAsync(usersController.findOne));
    api.put('/', verifyToken, catchAsync(usersController.update));

    return api;
}