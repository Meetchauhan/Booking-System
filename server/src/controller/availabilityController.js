import Availability from '../models/Availability.js';
import { v4 as uuidv4 } from 'uuid';

export const saveAvailability = async (req, res) => {
    try {
        const { date, startTime, endTime } = req.body;

        // Check if availability already exists for the same user, date, startTime, and endTime
        const existingAvailability = await Availability.findOne({
            userId: req.user.userId,
            date,
            startTime,
            endTime
        });

        if (existingAvailability) {
            return res.status(400).json({ error: "Availability already exists for the given date, start time, and end time." });
        }

        const linkId = uuidv4();
        const availability = new Availability({
            userId: req.user.userId,
            date,
            startTime,
            endTime,
            linkId
        });

        await availability.save();
        return res.status(200).json({ availability });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const getAvailabilityByLink = async (req, res) => {
    try {
        const { linkId } = req.params;
        const slots = await Availability.find({ linkId });
        if (slots.length === 0) return res.status(404).json({ error: "Invalid link" });
        res.status(200).json({ slots });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
