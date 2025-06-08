import express from 'express';
import { saveAvailability, getAvailabilityByLink } from '../controller/availabilityController.js';

const router = express.Router();

router.post('/save', saveAvailability);
router.get('/link/:linkId', getAvailabilityByLink);

export default router;
