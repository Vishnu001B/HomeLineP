const User = require('../models/User');
const mongoose = require('mongoose');

exports.addAddress = async (req, res) => {
  const { userId } = req.params; 
  console.log(userId)
  const { street, city, state, country, postalCode, name, phone, addressType, location } = req.body;

  try {
    // Ensure userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Find user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create new address
    const newAddress = { street, city, state, country, postalCode, name, phone, addressType, location };
    
    // Push new address to the user's addresses array
    user.addresses.push(newAddress);
    await user.save();

    res.status(201).json({ message: 'Address added successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error adding address', error });
  }
};



// Update an existing address of user
exports.updateAddress = async (req, res) => {
  const { userId, addressId } = req.params;
  const { street, city, state, country, postalCode, name, phone, addressType, location } = req.body;

  try {
    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the address within user's addresses array by addressId
    const address = user.addresses.id(addressId);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // Update address fields
    address.street = street;
    address.city = city;
    address.state = state;
    address.country = country;
    address.postalCode = postalCode;
    address.name = name;
    address.phone = phone;
    address.addressType = addressType;
    address.location = location;
    

    await user.save();

    res.status(200).json({ message: 'Address updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating address', error });
  }
};

// Delete an address of user
exports.deleteAddress = async (req, res) => {
  const { userId, addressId } = req.params;

  try {
    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the index of the address to be removed
    const addressIndex = user.addresses.findIndex(address => address._id.toString() === addressId);
    if (addressIndex === -1) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // Remove the address from the addresses array
    user.addresses.splice(addressIndex, 1);
    await user.save();

    res.status(200).json({ message: 'Address deleted successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting address', error });
  }
};


// Get all addresses of user

exports.getAllAddresses = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Addresses retrieved successfully', addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving addresses', error });
  }
};