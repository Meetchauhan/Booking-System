import { Navigate, Route, Router, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import Dashboard from "./pages/dashboard/Dashboard";
import BookingPage from "./pages/booking/BookingPage";
import Error from "./pages/error/Error404";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import GuestRoute from "./components/guestRoute/GuestRoute";

function App() {
  return (
    <Routes>
      {/* Guest-only routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        }
      />

      {/* Authenticated-only route */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* Public Booking link */}
      <Route path="/book/:linkId" element={<BookingPage />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
