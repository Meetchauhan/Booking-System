import express from 'express';
import { createBooking, getBookedSlots } from '../controller/bookingController.js';

const router = express.Router();

router.post('/create', createBooking);
router.get('/link/:linkId/booked', getBookedSlots);

export default router;
