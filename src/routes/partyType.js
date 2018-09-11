import { Router }  from 'express';
import partyTypeController from '../controllers/partyTypeController';
import { catchAsync }  from '../middlewares/errors';
import verifyToken from '../auth/authentication';

export default () => {
    const api = Router();

    api.post('/', catchAsync(partyTypeController.create));

    api.get('/', catchAsync(partyTypeController.list));

    return api;
}