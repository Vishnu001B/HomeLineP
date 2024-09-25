const express = require("express");
const router = express.Router();
const { createBooking,getAllBookings,getBookingById, updateBookingStatus ,deleteBooking } = require("../controllers/BookNowController");

router.post("/book-now", createBooking);
router.get("/book-nowdata", getAllBookings);

router.get("/bookings/:id", getBookingById); // Get booking by ID
router.put("/bookings/:id/status", updateBookingStatus); 
router.delete("/bookings/:id", deleteBooking); 

module.exports = router;
