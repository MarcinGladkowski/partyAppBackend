import { Router }  from 'express';
import verifyToken from '../auth/authentication';
import { catchAsync }  from '../middlewares/errors';
import partyInviteController from '../controllers/partyInviteController';

export default () => {
    const api = Router();

    api.post('/', catchAsync(partyInviteController.create));

    api.get('/:partyId', catchAsync(partyInviteController.findByParty));

    api.patch('/:Id', catchAsync(partyInviteController.sendInvite));

    return api;
}