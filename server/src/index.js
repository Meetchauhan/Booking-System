import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import authRoutes from '../src/routers/authRoutes.js';
import availabilityRoutes from '../src/routers/availabilityRoutes.js';
import bookingRoutes from '../src/routers/bookingRoutes.js';
import publicRoutes from '../src/routers/publicRoutes.js';
import { protect } from '../src/middleware/authMiddleware.js';

dotenv.config();
const app = express();

app.use(
    cors({
      origin: ["http://localhost:5173", "https://booking-system-ten-virid.vercel.app"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/availability", protect, availabilityRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/public", publicRoutes);

const PORT = process.env.PORT || 5000;


app.listen(PORT, async () => {
    connectDB()
        .then(() => {
            app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        })
        .catch(err => console.log(err));
});

