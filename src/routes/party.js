import { Router }  from 'express';
import partyController from '../controllers/partyController';
import { catchAsync }  from '../middlewares/errors';

export default () => {
    const api = Router();

    api.post('/', catchAsync(partyController.create));

    api.get('/', catchAsync(partyController.list));


    return api;
}