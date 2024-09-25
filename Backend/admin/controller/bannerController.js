const Banner = require("../models/banner");
const upload = require("../../modules/fileModule");
const multer = require("multer");

// Create a new banner
exports.createBanner = async (req, res, next) => {
  upload.single("file")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send(err.message);
    } else if (err) {
      return res.status(500).send("An unknown error occurred.");
    }

    // Save file metadata to the database
    const { title, description } = req.body;

    const fileData = new Banner({
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
      title:title,        // Add title
      description   // Add description
    });

    try {
      await fileData.save();
      const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
      res.json({ message: "Upload successful", file: req.file, url: fileUrl });
    } catch (error) {
      res.status(500).send("Error saving file data to the database.");
    }
  });
};

// Get all banners
exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching banners',
      error: error.message,
    });
  }
};

// Get a banner by ID
exports.getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({
        message: 'Banner not found',
      });
    }
    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching banner',
      error: error.message,
    });
  }
};

// Update a banner by ID
exports.updateBanner = async (req, res) => {
  upload.single('file')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send(err.message);
    } else if (err) {
      return res.status(500).send('An unknown error occurred.');
    }

    try {
      const { title, description } = req.body;
      const file = req.file;

      // Validate if at least one field is provided
      if (!title && !description && !file) {
        return res.status(400).json({
          message: 'No data provided for update',
        });
      }

      // Find the banner by ID
      const banner = await Banner.findById(req.params.id);
      if (!banner) {
        return res.status(404).json({
          message: 'Banner not found',
        });
      }

      // Update only the fields provided
      if (title) banner.title = title;
      if (description) banner.description = description;
      if (file) {
        banner.filename = file.filename;
        banner.path = file.path;
        banner.mimetype = file.mimetype;
        banner.size = file.size;
      }

      // Save the updated banner
      const updatedBanner = await banner.save();

      res.status(200).json({
        message: 'Banner updated successfully',
        banner: updatedBanner,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error updating banner',
        error: error.message,
      });
    }
  });
};

// Delete a banner by ID
exports.deleteBanner = async (req, res) => {
  try {
    const deletedBanner = await Banner.findByIdAndDelete(req.params.id);

    if (!deletedBanner) {
      return res.status(404).json({
        message: 'Banner not found',
      });
    }

    res.status(200).json({
      message: 'Banner deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting banner',
      error: error.message,
    });
  }
};
