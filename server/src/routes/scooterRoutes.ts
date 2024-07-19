import { Router } from 'express';
import { getAllScooters, createScooter, filterScootersByPolygon, filterAvailableScooters, updateScooter, deleteScooter } from '../contorllers/scooterController';

const router = Router();

router.get('/', getAllScooters);
router.get('/poligonfilter', filterScootersByPolygon);
router.get('/availablefilter', filterAvailableScooters);
router.post('/', createScooter);
router.put('/:id', updateScooter);
router.delete('/:id', deleteScooter);


export default router;
