import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import mongoose from 'mongoose';
import { connectDB } from './config/db.js';

import authRoutes from '../src/routers/authRoutes.js';
import availabilityRoutes from '../src/routers/availabilityRoutes.js';
import bookingRoutes from '../src/routers/bookingRoutes.js';
import publicRoutes from '../src/routers/publicRoutes.js';
import { protect } from '../src/middleware/authMiddleware.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/availability", protect, availabilityRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/public", publicRoutes);

const PORT = process.env.PORT || 5000;
// mongoose.connect(process.env.MONGO_URI)

app.listen(PORT, async () => {
    connectDB()
        .then(() => {
            app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        })
        .catch(err => console.log(err));
});

