import { Router } from 'express';
import {
  initiateTransfer,
  getAllSentTransfers,
  getAllReceivedTransfers,
  getAllTransfers,
  getTransferById,
  getFilteredTransactions,
  getLast5Transactions,
} from '../controllers/transfer.controller';
import { verifyJWT } from '../middlewares/auth.middleware';

const router = Router();

router.post('/transfer', verifyJWT, initiateTransfer);

router.get('/sent', verifyJWT, getAllSentTransfers);

router.get('/received', verifyJWT, getAllReceivedTransfers);

router.get('/all', verifyJWT, getAllTransfers);


router.get('/:id', verifyJWT, getTransferById);

router.get('/filters', verifyJWT, getFilteredTransactions);

router.get('/last-5', verifyJWT, getLast5Transactions);


export default router;
