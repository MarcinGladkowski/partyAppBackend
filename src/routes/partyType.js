import { Router }  from 'express';
import partyTypeController from '../controllers/partyTypeController';
import { catchAsync }  from '../middlewares/errors';
import verifyToken from '../auth/authentication';
import upload from '../middlewares/multer';

export default () => {
    const api = Router();
    // const upload = multer({dest: 'uploads/'});

    api.post('/', catchAsync(partyTypeController.create));

    api.get('/', catchAsync(partyTypeController.list));

    api.post('/upload', upload.single('icon'), catchAsync(partyTypeController.upload));

    return api;
}