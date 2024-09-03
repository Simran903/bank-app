
import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware';
import {
  addBeneficiary,
  getAllBeneficiaries,
  getBeneficiaryById,
  updateBeneficiary,
  removeBeneficiary,
} from '../controllers/beneficiary.controller';

const router = Router();

router.post('/beneficiaries', verifyJWT, addBeneficiary);
router.get('/beneficiaries', verifyJWT, getAllBeneficiaries);
router.get('/beneficiaries/:id', verifyJWT, getBeneficiaryById);
router.put('/beneficiaries/:id', verifyJWT, updateBeneficiary);
router.delete('/beneficiaries/:id', verifyJWT, removeBeneficiary);

export default router;
