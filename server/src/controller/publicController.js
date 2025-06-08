import Availability from "../models/Availability.js";
import Booking from "../models/Booking.js";


export const getAvailableDates = async (req, res) => {
    try {
        const { linkId } = req.params;

        const slots = await Availability.find({ linkId });

        if (!slots.length) return res.status(404).json({ error: "Invalid link" });

        res.status(200).json(slots);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const getAvailableSlotsByDate = async (req, res) => {
    try {
        const { linkId, date } = req.params;

        const availability = await Availability.findOne({ linkId, date });
        if (!availability) return res.status(404).json({ error: "No availability found" });

        const { startTime, endTime } = availability;


        const generateTimeSlots = (start, end) => {
            const slots = [];
            let [h, m] = start.split(":").map(Number);
            const [endH, endM] = end.split(":").map(Number);

            while (h < endH || (h === endH && m < endM)) {
                const formatted = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
                slots.push(formatted);
                m += 30;
                if (m >= 60) {
                    h += 1;
                    m -= 60;
                }
            }
            return slots;
        };

        const allSlots = generateTimeSlots(startTime, endTime);


        const booked = await Booking.find({ linkId, date });
        const bookedTimes = booked.map((b) => b.time);

        const available = allSlots.filter((slot) => !bookedTimes.includes(slot));

        res.status(200).json(available);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
