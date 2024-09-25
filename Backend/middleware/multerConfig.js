const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Upload directory
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

// File filter for image files
const fileFilter = (req, file, cb) => {
  const mimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/tiff', 'image/svg+xml'];
  
  if (!mimeTypes.includes(file.mimetype)) {
    return cb(new Error('Only images are allowed'), false);
  }
  cb(null, true);
};

// Multer middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }  // 5MB limit
});

module.exports = upload;
