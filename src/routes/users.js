import { Router }  from 'express';
import usersController from '../controllers/usersController';
import { catchAsync }  from '../middlewares/errors';
import verifyToken from '../auth/authentication';
import upload from '../middlewares/multer';

export default () => {
    const api = Router();
    /** create new user */
    api.post('/', catchAsync(usersController.create));
    /** activate user by hash*/
    api.post('/activate', catchAsync(usersController.activate));
    /** get user data */
    api.get('/', verifyToken, catchAsync(usersController.findOne));
    /** get user data */
    api.get('/all', verifyToken, catchAsync(usersController.findAll));
    /** update main user data */
    api.put('/', verifyToken, catchAsync(usersController.update));
    /** update user avatar */
    api.post('/avatar', verifyToken, upload.single('avatar'),  catchAsync(usersController.updateAvatar));


    return api;
}