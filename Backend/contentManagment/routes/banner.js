const express = require('express');
const router = express.Router();
const {
    createBanner,
    getBanners,
    getBannerById,
    updateBanner,
    deleteBanner
} = require('../controllers/banner');

router.route('/').post(createBanner).get(getBanners);
router.route('/:id').get(getBannerById).put(updateBanner).delete(deleteBanner);

module.exports = router;
