import { Router } from 'express';
import { getAllUsers, createUser, getUserById, updateUserById, deleteUserById } from '../contorllers/userController';

const router = Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

export default router;
