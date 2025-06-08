import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
// import availabilityReducer from "../features/availability/availabilitySlice";
// import bookingReducer from "../features/booking/bookingSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        // availability: availabilityReducer,
        // booking: bookingReducer,
    },
});
