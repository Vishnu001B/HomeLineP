const NavHeader = require("../models/navHeader");

// Create a new NavHeader// Ensure you have imported or required the NavHeader model

exports.createNavHeader = async (req, res) => {
    try {
        // Create a new NavHeader instance with the data from the request body
        const navHeader = new NavHeader({
            categories: req.body.categories,
            subcategories: req.body.subcategories
        });
        
        // Save the new NavHeader document to the database
        await navHeader.save();
        
        // Send a success response with the created document
        res.status(201).json(navHeader);
    } catch (error) {
        // Send an error response if something goes wrong
        res.status(400).json({ message: error.message });
    }
};


// Get all NavHeaders
exports.getAllNavHeaders = async (req, res) => {
    try {
        const navHeaders = await NavHeader.find();
        res.status(200).json(navHeaders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single NavHeader by ID
exports.getNavHeaderById = async (req, res) => {
    try {
        const navHeader = await NavHeader.findById(req.params.id);
        if (!navHeader) return res.status(404).json({ message: "NavHeader not found" });
        res.status(200).json(navHeader);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a NavHeader by ID
exports.updateNavHeader = async (req, res) => {
    try {
        const navHeader = await NavHeader.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!navHeader) return res.status(404).json({ message: "NavHeader not found" });
        res.status(200).json(navHeader);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a NavHeader by ID
exports.deleteNavHeader = async (req, res) => {
    try {
        const navHeader = await NavHeader.findByIdAndDelete(req.params.id);
        if (!navHeader) return res.status(404).json({ message: "NavHeader not found" });
        res.status(200).json({ message: "NavHeader deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
