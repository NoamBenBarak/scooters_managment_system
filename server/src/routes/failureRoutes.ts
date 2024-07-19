import { Router } from 'express';
import {     
    createNewFailure, 
    getActiveFailuresByScooterId, 
    getFailureHistoryByScooterId, 
    getAllFailures,
    getFailureById,
    updateFailureById,
    deleteFailureById } from '../contorllers/failureController';

const router = Router();

router.post('/', createNewFailure)
router.get('/scooters/:scooterId/current', getActiveFailuresByScooterId);
router.get('/scooters/:scooterId/history', getFailureHistoryByScooterId);
router.get('/', getAllFailures);
router.get('/:id', getFailureById);
router.put('/:id', updateFailureById);
router.delete('/:id', deleteFailureById);


export default router;


