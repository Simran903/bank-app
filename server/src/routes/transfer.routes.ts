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

router.get('/transfers/sent', verifyJWT, getAllSentTransfers);

router.get('/transfers/received', verifyJWT, getAllReceivedTransfers);

router.get('/transfers/all', verifyJWT, getAllTransfers);


router.get('/transfers/:id', verifyJWT, getTransferById);

router.get('/transfers/filters', verifyJWT, getFilteredTransactions);

router.get('/transfers/last-5', verifyJWT, getLast5Transactions);


export default router;
