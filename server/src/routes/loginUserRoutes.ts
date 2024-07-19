import { Router } from 'express';
import { loginUser } from '../contorllers/authController';

const router = Router();

router.post('/', loginUser);

export default router;
