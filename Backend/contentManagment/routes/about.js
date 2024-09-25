const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/about');
router.route('/').post(aboutController.createAbout).get(aboutController.getAbout)
// Route to update an existing About document
router.put('/about/:id', aboutController.updateAbout);

// Route to delete an About document
router.delete('/about/:id', aboutController.deleteAbout);

module.exports = router ;