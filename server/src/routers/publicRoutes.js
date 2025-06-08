import express from "express";
import { getAvailableDates, getAvailableSlotsByDate } from "../controller/publicController.js";

const router = express.Router();

router.get("/:linkId", getAvailableDates);
router.get("/:linkId/:date", getAvailableSlotsByDate);

export default router;
