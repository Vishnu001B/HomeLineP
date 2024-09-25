import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";

// Moment.js localization
const localizer = momentLocalizer(moment);

const Order = () => {
  const [view, setView] = useState("month");
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("pending"); // Default status
  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchOrder();
  }, [status]); // Re-fetch orders when the status changes

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`${URI}api/productOrder/`);
      const filteredOrders = response.data.filter(
        (order) => order.status.toLowerCase() === status
      );
      const sortedOrders = filteredOrders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      // Map order data to calendar events
      const calendarOrders = sortedOrders.map((order) => ({
        id: order._id,
        title: `${order.products.length} orders`,
        start: new Date(order.createdAt),
        end: new Date(order.createdAt),
      }));

      setOrders(calendarOrders);
      console.log(calendarOrders);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Order</h1>

      {/* Status Tabs */}
      <div className="flex justify-center space-x-4 mb-4">
        {["pending", "processing", "shipped", "delivered", "cancelled"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setStatus(tab)}
              className={`px-4 py-2 rounded-md ${
                status === tab
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          )
        )}
      </div>

      {/* Calendar UI */}
      <Calendar
        localizer={localizer}
        events={orders}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={["month", "week", "day", "agenda"]}
        step={60}
        showMultiDayTimes
        defaultDate={new Date(2024, 8, 1)} // Default to September 2024
        className="bg-white shadow-md rounded-lg text-black"
        eventPropGetter={() => ({
          className: "bg-blue-500 text-black px-2 py-1 rounded",
        })}
      />

      {/* Add navigation buttons */}
      <div className="flex justify-end mt-4 text-black">
        <button
          onClick={() => setView("month")}
          className={`px-4 py-2 bg-gray-100 rounded-md mr-2 ${
            view === "month" ? "bg-blue-500 text-black" : ""
          }`}
        >
          Month
        </button>
        <button
          onClick={() => setView("week")}
          className={`px-4 py-2 bg-gray-100 rounded-md mr-2 ${
            view === "week" ? "bg-blue-500 text-black" : ""
          }`}
        >
          Week
        </button>
        <button
          onClick={() => setView("day")}
          className={`px-4 py-2 bg-gray-100 rounded-md ${
            view === "day" ? "bg-blue-500 text-black" : ""
          }`}
        >
          Day
        </button>
      </div>
    </div>
  );
};

export default Order;
