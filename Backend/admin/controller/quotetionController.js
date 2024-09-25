const Quotetion = require('../models/quotetion');

// Create a new quotation
exports.createQuotetion = async (req, res) => {
  try {
    const { orderNumber, orderDetails, servicePrice, settlementPrice } = req.body;

    const newQuotetion = new Quotetion({
      orderNumber,
      orderDetails,
      servicePrice,
      settlementPrice
    });

    // Save the new quotation
    const savedQuotetion = await newQuotetion.save();
    res.status(201).json({ message: 'Quotetion created successfully', quotetion: savedQuotetion });
  } catch (error) {
    console.error('Error creating quotation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all quotations
exports.getAllQuotetions = async (req, res) => {
  try {
    const quotetions = await Quotetion.find();
    res.status(200).json(quotetions);
  } catch (error) {
    console.error('Error fetching quotations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a single quotation by order number
exports.getQuotetionByOrderNumber = async (req, res) => {
  try {
    const quotetion = await Quotetion.findOne({ orderNumber: req.params.orderNumber });

    if (!quotetion) {
      return res.status(404).json({ message: 'Quotetion not found' });
    }

    res.status(200).json(quotetion);
  } catch (error) {
    console.error('Error fetching quotation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a quotation by order number
exports.updateQuotetion = async (req, res) => {
  try {
    const updatedQuotetion = await Quotetion.findOneAndUpdate(
      { orderNumber: req.params.orderNumber },
      req.body,
      { new: true } // Return the updated document
    );

    if (!updatedQuotetion) {
      return res.status(404).json({ message: 'Quotetion not found' });
    }

    res.status(200).json({ message: 'Quotetion updated successfully', quotetion: updatedQuotetion });
  } catch (error) {
    console.error('Error updating quotation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a quotation by order number
exports.deleteQuotetion = async (req, res) => {
  try {
    const deletedQuotetion = await Quotetion.findOneAndDelete({ orderNumber: req.params.orderNumber });

    if (!deletedQuotetion) {
      return res.status(404).json({ message: 'Quotetion not found' });
    }

    res.status(200).json({ message: 'Quotetion deleted successfully' });
  } catch (error) {
    console.error('Error deleting quotation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
