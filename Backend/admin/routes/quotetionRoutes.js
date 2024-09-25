const express = require('express');
const router = express.Router();
const quotetionController = require('../controller/quotetionController');

// Create a new quotation
router.post('/quotetion', quotetionController.createQuotetion);

// Get all quotations
router.get('/quotetions', quotetionController.getAllQuotetions);

// Get a single quotation by order number
router.get('/quotetion/:orderNumber', quotetionController.getQuotetionByOrderNumber);

// Update a quotation by order number
router.put('/quotetion/:orderNumber', quotetionController.updateQuotetion);

// Delete a quotation by order number
router.delete('/quotetion/:orderNumber', quotetionController.deleteQuotetion);

module.exports = router;
