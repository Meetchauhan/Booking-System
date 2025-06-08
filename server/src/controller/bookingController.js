import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
    try {
        const { linkId, date, time } = req.body;

        const exists = await Booking.findOne({ linkId, date, time });
        if (exists) return res.status(400).json({ error: "Slot already booked" });

        const booking = new Booking({ linkId, date, time });
        await booking.save();
        res.status(200).json({ booking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getBookedSlots = async (req, res) => {
    try {
        const { linkId } = req.params;
        const bookings = await Booking.find({ linkId });
        res.status(200).json({ bookings });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
