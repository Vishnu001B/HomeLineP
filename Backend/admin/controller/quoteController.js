const Quote = require("../models/quote"); // Capitalized for convention
const upload = require("../../modules/fileModule");
const multer = require("multer");

exports.createQuote = async (req, res) => {
  // Handle file upload
  upload.single("file")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send(err.message);
    } else if (err) {
      return res.status(500).send("An unknown error occurred.");
    }

    try {
      const { author, rating, quote } = req.body;

      // Handle image file, if uploaded
      const authorImage = req.file ? req.file.path : null;

      // Create new quote instance with the provided data
      const newQuote = new Quote({
        author,
        rating: Number(rating), // Ensure rating is stored as a number
        quote,
        authorImage, // Store the image path if it exists
      });

      // Save the new quote to the database
      await newQuote.save();

      // Respond with the newly created quote
      res.status(201).json(newQuote);
    } catch (error) {
      console.error("Error while creating quote:", error); // Log error for debugging
      res.status(500).send("Server error while creating a new quote.");
    }
  });
};

// Get all quotes
exports.getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).send("Server error while retrieving quotes.");
  }
};

// Get a single quote by ID
exports.getQuoteById = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).send("Quote not found.");
    }
    res.status(200).json(quote);
  } catch (error) {
    res.status(500).send("Server error while retrieving the quote.");
  }
};

// Update a quote by ID
// Update a quote by ID
exports.updateQuote = async (req, res) => {
  // Handle file upload
  upload.single("file")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send(err.message);
    } else if (err) {
      return res.status(500).send("An unknown error occurred.");
    }

    try {
      const { author, rating, quote } = req.body;
      const quoteId = req.params.id;

      // Find the existing quote
      const existingQuote = await Quote.findById(quoteId);
      if (!existingQuote) {
        return res.status(404).send("Quote not found.");
      }

      // Update the quote fields
      existingQuote.author = author || existingQuote.author;
      existingQuote.rating =
        rating !== undefined ? Number(rating) : existingQuote.rating;
      existingQuote.quote = quote || existingQuote.quote;

      // Handle image file update
      if (req.file) {
        // Optionally delete the old image file here if needed
        existingQuote.authorImage = req.file.path;
      }

      // Save the updated quote
      await existingQuote.save();

      // Respond with the updated quote
      res.status(200).json(existingQuote);
    } catch (error) {
      console.error("Error while updating quote:", error); // Log error for debugging
      res.status(500).send("Server error while updating the quote.");
    }
  });
};

// Delete a quote by ID
exports.deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the gift card by ID
    const giftCard = await Quote.findById(id);
    if (!giftCard) {
      return res.status(404).json({ message: "Quote not found." });
    }

    // Delete the gift card from the database
    await Quote.findByIdAndDelete(id);

    // Delete the image file from the file system (if applicable)
    if (giftCard.image) {
      // Use path.resolve to construct an absolute path
      const imagePath = path.resolve(
        __dirname,
        "../../uploads",
        giftCard.image
      );
      console.log("====================================");
      console.log(imagePath);
      console.log("====================================");

      // Use fs.promises.unlink for promise-based file deletion
      try {
        await fs.promises.unlink(imagePath);
        console.log("Image file deleted successfully");
      } catch (err) {
        console.error("Error deleting image file:", err);
        // Continue with success response even if image deletion fails
      }
    }

    // Send success response
    res.status(200).json({ message: "Quote and image deleted successfully." });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: "Server error: " + error.message });
  }
};
