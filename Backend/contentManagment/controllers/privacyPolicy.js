const PrivacyPolicy = require('../models/privacyPolicy'); // Import the PrivacyPolicy model

// Create a new privacy policy
exports.createPrivacyPolicy = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Create a new privacy policy document
    const newPolicy = new PrivacyPolicy({
      title,
      description,
    });

    // Save the document in the database
    await newPolicy.save();

    res.status(201).json({
      success: true,
      message: 'Privacy policy created successfully!',
      data: newPolicy,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating privacy policy',
      error: error.message,
    });
  }
};

// Get all privacy policies
exports.getAllPrivacyPolicies = async (req, res) => {
  try {
    const policies = await PrivacyPolicy.find();
    res.status(200).json({
      success: true,
      data: policies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching privacy policies',
      error: error.message,
    });
  }
};

// Get a single privacy policy by ID
exports.getPrivacyPolicyById = async (req, res) => {
  try {
    const policy = await PrivacyPolicy.findById(req.params.id);

    if (!policy) {
      return res.status(404).json({
        success: false,
        message: 'Privacy policy not found',
      });
    }

    res.status(200).json({
      success: true,
      data: policy,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching privacy policy',
      error: error.message,
    });
  }
};

// Update an existing privacy policy by ID
exports.updatePrivacyPolicy = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Find the document by ID and update it
    const updatedPolicy = await PrivacyPolicy.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updatedPolicy) {
      return res.status(404).json({
        success: false,
        message: 'Privacy policy not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Privacy policy updated successfully!',
      data: updatedPolicy,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating privacy policy',
      error: error.message,
    });
  }
};

// Delete a privacy policy by ID
exports.deletePrivacyPolicy = async (req, res) => {
  try {
    const policy = await PrivacyPolicy.findByIdAndDelete(req.params.id);

    if (!policy) {
      return res.status(404).json({
        success: false,
        message: 'Privacy policy not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Privacy policy deleted successfully!',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting privacy policy',
      error: error.message,
    });
  }
};
