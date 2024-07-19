import { Router } from 'express';
import { getAllParkingSpots, createNewParkingSpot, getParkingAvailability,getParkingSpotById, updateParkingSpotById, deleteParkingSpotById  } from '../contorllers/parkingController';

const router = Router();

router.get('/', getAllParkingSpots);
router.post('/', createNewParkingSpot);
router.get('/availability', getParkingAvailability);
router.get('/:id', getParkingSpotById);
router.put('/:id', updateParkingSpotById);
router.delete('/:id', deleteParkingSpotById);

export default router;
