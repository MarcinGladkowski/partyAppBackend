import { Router }  from 'express';
import authController from '../controllers/authController';
import { catchAsync }  from '../middlewares/errors';
import verifyToken from '../auth/authentication';

export default () => {
    const api = Router();
    // login to app, return active token
    api.post('/', catchAsync(authController.login));
    // check is user is still login
    api.post('/check', verifyToken, catchAsync(authController.check));
    // active user from register email 
    api.get('/activate/:hash', catchAsync(authController.activate));
    // check user is exists by email
    api.get('/is-exists', catchAsync(authController.isUserExists));
    // update user password
    api.post('/update-password', verifyToken, catchAsync(authController.updatePassword));

    return api;
}