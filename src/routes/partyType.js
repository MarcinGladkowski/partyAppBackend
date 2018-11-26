import { Router }  from 'express';
import partyTypeController from '../controllers/partyTypeController';
import { catchAsync }  from '../middlewares/errors';
import verifyToken from '../auth/authentication';
import upload from '../middlewares/multer';

export default () => {
    const api = Router();

    api.post('/', upload.single('icon'), catchAsync(partyTypeController.create));

    api.get('/', catchAsync(partyTypeController.list));

    return api;
}