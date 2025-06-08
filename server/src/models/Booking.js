import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    linkId: String,
    date: String,
    time: String
});

export default mongoose.model("Booking", bookingSchema);
