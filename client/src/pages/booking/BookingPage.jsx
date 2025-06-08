import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BookingPage = () => {
  const { linkId } = useParams();
  const navigate = useNavigate();
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/public/${linkId}`)
      .then((res) => {
        setDates(res.data.map((slot) => slot.date));
        if (res.data.length) {
          setSelectedDate(res.data[0].date);
        }
      })
      .catch(() => setMessage("404 - Invalid booking link"));
  }, [linkId]);

  useEffect(() => {
    if (selectedDate) {
      axios
        .get(`http://localhost:5000/api/public/${linkId}/${selectedDate}`)
        .then((res) => setAvailableSlots(res.data))
        .catch(() => setAvailableSlots([]));
    }
  }, [selectedDate, linkId]);

  const handleBooking = () => {
    if (!selectedSlot) return;

    axios
      .post(`http://localhost:5000/api/booking/create`, {
        linkId,
        date: selectedDate,
        time: selectedSlot,
      })
      .then(() => {
        setMessage("Booked successfully!");
        setAvailableSlots((prev) =>
          prev.filter((slot) => slot !== selectedSlot)
        );
        setSelectedSlot("");
      })
      .catch(() => {
        setMessage("Failed to book slot.");
      });
  };

  if (message.includes("404")) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-red-300 px-2">
        <div className="text-center text-red-600 text-2xl font-bold bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          {message}
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-md transition text-lg"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 py-8 px-2">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 border border-blue-200 flex flex-col gap-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-blue-700 mb-2 text-center drop-shadow-sm">
          Book a Slot
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Select Date:
          </label>
          <select
            className="border border-blue-200 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-base"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            {dates.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Available Slots:
          </label>
          <div className="flex flex-wrap gap-3 justify-center">
            {availableSlots.length === 0 && (
              <span className="text-gray-400 italic">
                No slots available for this date.
              </span>
            )}
            {availableSlots.map((slot, i) => (
              <button
                key={i}
                onClick={() => setSelectedSlot(slot)}
                className={`px-5 py-2 rounded-lg font-semibold border transition shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-base md:text-lg ${
                  selectedSlot === slot
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-gray-100 text-blue-700 border-blue-200 hover:bg-blue-100"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleBooking}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-bold shadow-md hover:from-green-600 hover:to-green-700 transition text-lg disabled:opacity-60"
          disabled={!selectedSlot}
        >
          Book Now
        </button>

        {message && (
          <p
            className={`mt-2 text-center text-base font-medium ${
              message.includes("success") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-md transition text-lg"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
