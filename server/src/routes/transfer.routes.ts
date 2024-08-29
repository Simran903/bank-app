import { Router } from 'express';
import {
  initiateTransfer,
  getAllSentTransfers,
  getAllReceivedTransfers,
  getAllTransfers,
} from '../controllers/transfer.controller';
import { verifyJWT } from '../middlewares/auth.middleware';

const router = Router();

router.post('/transfer', verifyJWT, initiateTransfer);

router.get('/transfers/sent', verifyJWT, getAllSentTransfers);

router.get('/transfers/received', verifyJWT, getAllReceivedTransfers);
router.get('/transfers/all', verifyJWT, getAllTransfers);

export default router;
