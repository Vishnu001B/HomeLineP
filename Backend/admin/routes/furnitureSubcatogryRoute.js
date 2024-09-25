const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 
const subcategoryController = require('../controller/furnitureSubcatogryController');
const express = require("express");
const router = express.Router();

// Create Subcategory Route (with image upload)
router.post('/subcategory', upload.single('image'), subcategoryController.createSubcategory);

// Update Subcategory Route (with image upload)
router.put('/subcategory/:id', upload.single('image'), subcategoryController.updateSubcategory);

// Delete Subcategory Route
router.delete('/subcategory/:id', subcategoryController.deleteSubcategory);

// Get a Subcategory by ID Route
router.get('/subcategory/:id', subcategoryController.getSubcategoryById);

// Get all Subcategories Route
router.get('/subcategories', subcategoryController.getSubcategories);

module.exports = router;
