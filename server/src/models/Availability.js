import mongoose from 'mongoose';

const availabilitySchema = new mongoose.Schema({
  userId: String,
  date: String,
  startTime: String,
  endTime: String,
  linkId: String
});

export default mongoose.model("Availability", availabilitySchema);
