const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category.controller');
const upload = require('../../middleware/multerConfig');

// Create a new category
router.post('/', upload.array('files', 10), categoryController.createCategory);

// Get all categories
router.get('/', categoryController.getCategories);

// Get a single category by ID
router.get('/:id', categoryController.getCategoryById);

// Update a category by ID
router.put('/:id', upload.array('files', 10), categoryController.updateCategory);

// Delete a category by ID
router.delete('/:id', categoryController.deleteCategory);

router.post('/categories/:id/subcategories', categoryController.addSubcategory);

// Route to update a subcategory in a specific category
router.put('/categories/:id/subcategories', categoryController.updateSubcategory);

// Route to delete a subcategory from a specific category
router.delete('/categories/:id/subcategories', categoryController.deleteSubcategory);

module.exports = router;
