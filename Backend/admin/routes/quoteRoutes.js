const express = require("express");
const router = express.Router();
const quoteController = require("../controller/quoteController"); // Adjust path as necessary

// Create a new quote
router.post("/new-quotes", quoteController.createQuote);

router.get("/new-quotes", quoteController.getAllQuotes);

router.get("/new-quotes/:id", quoteController.getQuoteById);

router.put("/new-quotes/:id", quoteController.updateQuote);

router.delete("/new-quotes/:id", quoteController.deleteQuote);

module.exports = router;
