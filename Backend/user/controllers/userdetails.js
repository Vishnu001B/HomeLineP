const UserDetails = require('../models/userdetails');

// Save user details
exports.saveDetails = async (req, res) => {
    try {
        const { name, phoneNumber } = req.body;

        // Check if both fields are provided
        if (!phoneNumber || !name) {
            return res.status(400).json({ message: 'Name and Phone Number are required.' });
        }

        // Check if user details with the provided phone number already exist
        let existingUser = await UserDetails.findOne({ phoneNumber });

        if (existingUser) {
            return res.status(400).json({ message: 'User with this phone number already exists.' });
        }

        // Create and save new user
        const newUser = new UserDetails({ name, phoneNumber });
        await newUser.save();

        return res.status(201).json({ message: 'User details saved successfully.', data: newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while saving user details.' });
    }
};

// Get all user details
exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserDetails.find();
        return res.status(200).json({ data: users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while retrieving user details.' });
    }
};

// Delete user by ID
exports.deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await UserDetails.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while deleting the user.' });
    }
};

// Update user by ID
exports.updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phoneNumber } = req.body;

        // Check if both fields are provided
        if (!phoneNumber || !name) {
            return res.status(400).json({ message: 'Name and Phone Number are required.' });
        }

        const updatedUser = await UserDetails.findByIdAndUpdate(id, { name, phoneNumber }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.status(200).json({ message: 'User updated successfully.', data: updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while updating the user.' });
    }
};
