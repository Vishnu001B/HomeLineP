const express = require('express');
const router = express.Router();
const userController = require('../controllers/address');

// Add a new address to user
router.post('/:userId', userController.addAddress);

router.get('/:userId', userController.getAllAddresses);


// Update an existing address of user
router.put('/:userId/:addressId', userController.updateAddress);

// Delete an address of user
router.delete('/:userId/:addressId', userController.deleteAddress);

module.exports = router;