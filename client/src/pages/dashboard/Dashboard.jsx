import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

const Dashboard = () => {
  const { token, user } = useSelector((state) => state.auth);
  const [availability, setAvailability] = useState([]);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddAvailability = async () => {
    if (!date || !startTime || !endTime) return;

    const payload = {
      date,
      startTime,
      endTime,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/availability/save",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAvailability([...availability, res.data]);
      setDate("");
      setStartTime("");
      setEndTime("");
    } catch (err) {
      console.error("Failed to save availability:", err);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-blue-200 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-2 gap-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 text-center drop-shadow-sm">
            Welcome, {user?.name}
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-bold shadow transition"
          >
            Logout
          </button>
        </div>
        <section className="mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4 text-center">
            Add Your Availability
          </h2>
          <form
            className="flex flex-col md:flex-row gap-4 items-center justify-center"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddAvailability();
            }}
          >
            <input
              type="date"
              className="border border-blue-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full md:w-auto text-base"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="time"
              className="border border-blue-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full md:w-auto text-base"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              disabled={!date}
            />
            <input
              type="time"
              className="border border-blue-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full md:w-auto text-base"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              disabled={!date}
              min={startTime} // Dynamically set the minimum time
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-md hover:from-blue-600 hover:to-blue-700 transition w-full md:w-auto disabled:opacity-60"
              disabled={!date || !startTime || !endTime}
            >
              Save
            </button>
          </form>
        </section>

        <section className="mb-4">
          <h2 className="text-lg md:text-xl font-medium mb-2 text-gray-700 text-center">
            Current Availabilities
          </h2>
          <ul className="space-y-2">
            {availability.length === 0 && (
              <li className="text-gray-400 italic text-center">
                No availabilities added yet.
              </li>
            )}
            {availability.map((item, index) => {
              let formattedDate = "";
              try {
                formattedDate = item?.availability?.date
                  ? format(new Date(item?.availability?.date), "PPP")
                  : item?.availability?.date;
              } catch (e) {
                formattedDate = item?.date || "Invalid date";
                console.error("Error formatting date:", e);
                
              }
              return (
                <li
                  key={index}
                  className="bg-blue-50 border border-blue-100 p-3 rounded flex flex-col md:flex-row items-center gap-2 md:gap-4 justify-between"
                >
                  <span className="font-semibold text-blue-700 text-base md:text-lg">
                    {formattedDate}
                  </span>
                  <span className="text-gray-600 text-base md:text-lg">
                    {item?.availability?.startTime || item?.startTime} -{" "}
                    {item?.availability?.endTime || item?.endTime}
                  </span>
                  {item?.availability?.linkId && (
                    <Link
                      to={`http://localhost:5173/book/${item.availability.linkId}`}
                      className="text-green-600 underline font-semibold hover:text-green-800 transition text-base md:text-lg"
                      rel="noopener noreferrer"
                    >
                      Generated Booking Link
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;