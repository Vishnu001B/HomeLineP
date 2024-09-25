const BookNow = require("../models/BookNow");

exports.createBooking = async (req, res, next) => {
    try {
        const { useName, productId, productName, phoneNumber,productImage } = req.body;
        const bookNow = new BookNow({ useName, productId, productName, phoneNumber,productImage });
        await bookNow.save();
        res.status(201).json({ message: "Book Now Created Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};






// Get all bookings
exports.getAllBookings = async (req, res, next) => {
    try {
      const bookings = await BookNow.find();
      res.status(200).json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };


// Get booking by ID
  exports.getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await BookNow.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



exports.updateBookingStatus = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedBooking = await BookNow.findByIdAndUpdate(
        id,
        { status },
        { new: true } // Return the updated document
      );
      if (!updatedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.status(200).json({ message: "Booking status updated", updatedBooking });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  


  // Delete a booking
exports.deleteBooking = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedBooking = await BookNow.findByIdAndDelete(id);
      if (!deletedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };