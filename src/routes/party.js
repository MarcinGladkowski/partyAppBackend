import { Router }  from 'express';
import partyController from '../controllers/partyController';
import { catchAsync }  from '../middlewares/errors';
import verifyToken from '../auth/authentication';

export default () => {
    const api = Router();

    api.post('/', verifyToken, catchAsync(partyController.create));

    api.get('/', catchAsync(partyController.getAll));

    api.get('/:id', catchAsync(partyController.findById));

    return api;
}