const About = require('../models/about');
const multer = require('multer');
const asyncHandler = require('express-async-handler');
const path = require('path');
const upload = require("../../modules/fileModule");

// Controller to create About with file upload
exports.createAbout = asyncHandler(async (req, res) => {
  // Upload file middleware
  upload.single('file')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send(err.message);
    } else if (err) {
      return res.status(500).send("An unknown error occurred.");
    }

    // Validate required fields
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    // Validate file upload
    if (!req.file) {
      return res.status(400).json({ message: 'File is required' });
    }

    // Create new About document
    const about = new About({
      filename: req.file.filename,
      title,
      description,
    });

    // Save to database
    try {
      const createdAbout = await about.save();
      res.status(201).json(createdAbout);
    } catch (error) {
      res.status(500).json({ message: 'Error saving to database', error });
    }
  });
});



exports.getAbout = asyncHandler(async (req,res)=>{

    const about = await About.find({});
    res.json(about)

})


// Controller to update About document
exports.updateAbout = asyncHandler(async (req, res) => {
  // Handle file upload if provided
  upload.single('file')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send(err.message);
    } else if (err) {
      return res.status(500).send("An unknown error occurred.");
    }

    // Validate required fields
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    try {
      // Find the existing document
      const about = await About.findById(id);
      if (!about) {
        return res.status(404).json({ message: 'Document not found' });
      }

      // Update fields
      about.title = title;
      about.description = description;

      // Update file if a new one is provided
      if (req.file) {
        about.filename = req.file.filename;
      }

      // Save updated document
      const updatedAbout = await about.save();
      res.status(200).json(updatedAbout);
    } catch (error) {
      res.status(500).json({ message: 'Error updating document', error });
    }
  });
});
  // Controller to delete About document
exports.deleteAbout = asyncHandler(async (req, res) => {
    // Extract ID from request parameters
    const { id } = req.params;
  
    // Find and delete the About document
    try {
      const about = await About.findById(id);
      if (!about) {
        return res.status(404).json({ message: 'About document not found' });
      }
  
      // Delete the document
      await about.deleteOne();
      res.json({ message: 'About document deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting document', error });
    }
  });
  
