import express from 'express';
import { UserRegister } from '../controllers/User';

const router = express.Router();

router.post('/signup', UserRegister);
router.post('/signin', UserLogin);

export default router;
