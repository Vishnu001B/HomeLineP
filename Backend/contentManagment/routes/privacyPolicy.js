const express = require('express');
const privacyPolicyController = require('../controllers/privacyPolicy');
const router = express.Router();

// Create a new privacy policy
router.post('/privacy-policy', privacyPolicyController.createPrivacyPolicy);

// Get all privacy policies
router.get('/privacy-policy', privacyPolicyController.getAllPrivacyPolicies);

// Get a single privacy policy by ID
router.get('/privacy-policy/:id', privacyPolicyController.getPrivacyPolicyById);

// Update a privacy policy by ID
router.put('/privacy-policy/:id', privacyPolicyController.updatePrivacyPolicy);

// Delete a privacy policy by ID
router.delete('/privacy-policy/:id', privacyPolicyController.deletePrivacyPolicy);

module.exports = router;
