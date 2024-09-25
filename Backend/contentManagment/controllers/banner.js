const Banner = require('../models/banner'); // Make sure the path to your model is correct
const asyncHandler = require('express-async-handler');

// @desc    Create a new banner
// @route   POST /api/banner
// @access  Public or Private (as needed)
const createBanner = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const banner = new Banner({
        title,
        description
    });

    const createdBanner = await banner.save();
    res.status(201).json(createdBanner);
});

// @desc    Get all banners
// @route   GET /api/banner
// @access  Public or Private (as needed)
const getBanners = asyncHandler(async (req, res) => {
    const banners = await Banner.find({});
    res.json(banners);
});

// @desc    Get a single banner by ID
// @route   GET /api/banner/:id
// @access  Public or Private (as needed)
const getBannerById = asyncHandler(async (req, res) => {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
        res.status(404);
        throw new Error('Banner not found');
    }

    res.json(banner);
});

// @desc    Update a banner by ID
// @route   PUT /api/banner/:id
// @access  Public or Private (as needed)
const updateBanner = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    const banner = await Banner.findById(req.params.id);

    if (!banner) {
        res.status(404);
        throw new Error('Banner not found');
    }

    banner.title = title || banner.title;
    banner.description = description || banner.description;

    const updatedBanner = await banner.save();
    res.json(updatedBanner);
});

// @desc    Delete a banner by ID
// @route   DELETE /api/banner/:id
// @access  Public or Private (as needed)
const deleteBanner = asyncHandler(async (req, res) => {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
        res.status(404);
        throw new Error('Banner not found');
    }

    await banner.deleteOne();
    res.json({ message: 'Banner removed' });
});

module.exports = {
    createBanner,
    getBanners,
    getBannerById,
    updateBanner,
    deleteBanner
};
