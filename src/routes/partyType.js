import { Router }  from 'express';
import partyTypeController from '../controllers/partyTypeController';
import { catchAsync }  from '../middlewares/errors';
import verifyToken from '../auth/authentication';
import upload from '../middlewares/multer';

export default () => {
    const api = Router();
    /** create new party type */
    api.post('/', upload.single('icon'), catchAsync(partyTypeController.create));
    /** get all types */
    api.get('/', verifyToken, catchAsync(partyTypeController.findAll));

    return api;
}