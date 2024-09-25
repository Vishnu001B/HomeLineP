const express = require('express');
const router = express.Router();
const userController = require('../controllers/userdetails');

// Save user details
router.post('/save', userController.saveDetails);

// Get all users
router.get('/all', userController.getAllUsers);

// Delete user by ID
router.delete('/:id', userController.deleteUserById);

// Update user by ID
router.put('/:id', userController.updateUserById);

module.exports = router;
