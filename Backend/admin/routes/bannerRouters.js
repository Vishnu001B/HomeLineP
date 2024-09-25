const express = require('express');
const router = express.Router();

const banner = require('../controller/bannerController');

// Define routes with appropriate middlewares
router.get('/banners', banner.getBanners);
router.post('/banners',  banner.createBanner); // Assuming you're uploading a single file with the key 'image'
router.get('/banners/:id', banner.getBannerById);
router.put('/banners/:id', banner.updateBanner);
router.delete('/banners/:id', banner.deleteBanner);

module.exports = router;
