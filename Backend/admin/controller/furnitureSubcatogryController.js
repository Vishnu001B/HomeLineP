const Subcategory = require('../models/furnitureSubcatogry');

// Create Subcategory Controller
exports.createSubcategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        // Check if an image is provided
        const image = req.file.path; // Assuming a single file upload

        const newSubcategory = new Subcategory({ name, image });
        await newSubcategory.save();

        res.status(201).json({ 
            message: 'Subcategory created successfully', 
            subcategory: newSubcategory 
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating subcategory' });
    }
};

// Get All Subcategories
exports.getSubcategories = async (req, res, next) => {
    try {
        const subcategories = await Subcategory.find({});
        res.status(200).json(subcategories);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving subcategories' });
    }
};

// Get Subcategory by ID
exports.getSubcategoryById = async (req, res, next) => {
    try {
        const subcategory = await Subcategory.findById(req.params.id);
        if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });

        res.status(200).json(subcategory);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving subcategory' });
    }
};

// Update Subcategory Controller
exports.updateSubcategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        // Prepare updated data
        let updatedData = { name };

        // Check if a new image is provided
        if (req.file) {
            updatedData.image = req.file.path; // Assuming a single file upload
        }

        const updatedSubcategory = await Subcategory.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true } // Return the updated document
        );

        if (!updatedSubcategory) return res.status(404).json({ message: 'Subcategory not found' });

        res.status(200).json({
            message: 'Subcategory updated successfully',
            subcategory: updatedSubcategory
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating subcategory' });
    }
};

// Delete Subcategory Controller
exports.deleteSubcategory = async (req, res, next) => {
    try {
        const deletedSubcategory = await Subcategory.findByIdAndDelete(req.params.id);

        if (!deletedSubcategory) return res.status(404).json({ message: 'Subcategory not found' });

        res.status(200).json({
            message: 'Subcategory deleted successfully',
            subcategory: deletedSubcategory
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting subcategory' });
    }
};
