// routes/navHeaderRoutes.js

const express = require('express');
const router = express.Router();
const navHeaderController = require('../controller/navHeaderController');

// Create a new NavHeader
router.post('/navheaders', navHeaderController.createNavHeader);

// Get all NavHeaders
router.get('/navheaders', navHeaderController.getAllNavHeaders);

// Get a single NavHeader by ID
router.get('/navheaders/:id', navHeaderController.getNavHeaderById);

// Update a NavHeader by ID
router.put('/navheaders/:id', navHeaderController.updateNavHeader);

// Delete a NavHeader by ID
router.delete('/navheaders/:id', navHeaderController.deleteNavHeader);

module.exports = router;
