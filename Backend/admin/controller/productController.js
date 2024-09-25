const Product = require("../models/product");
const upload = require("../../modules/fileModule");
const multer = require("multer");

// Create a new product with multiple images and additional fields
exports.createProduct = async (req, res, next) => {
  // Multiple file upload using multer
  upload.array("files", 10)(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(500).json({ message: "An unknown error occurred." });
    }

    try {
      // Extract additional fields from the request body
      const {
        title,
        descriptions,
        category,
        subcategory,
        price,
        discount,
        skuCode,
        rating,
        productCollection,
        patternNumber,
        mrp_roll,
        quality,
        color,
        endUse,
        compositions,
        gsm,
        martindale,
        material,
        rollSizeHeight,
        rollSizeWeight,
        specialsCategory
      } = req.body;

      // Parse price and discount as numbers, ensuring they are valid
      const parsedPrice = price ? parseFloat(price) : 0;
      const parsedDiscount = discount ? parseFloat(discount) : 0;

      // Calculate total price after applying the discount
      const discountAmount = (parsedPrice * parsedDiscount) / 100;
      const totalPrice = parsedPrice - discountAmount;

      // Check if totalPrice is valid
      if (isNaN(totalPrice)) {
        return res
          .status(400)
          .json({ message: "Invalid totalPrice calculation." });
      }

      // Collect file paths from the uploaded files
      const imagePaths = req.files.map((file) => file.filename);

      // Handle RollSize data
      const rollSize = {
        height: rollSizeHeight,
        weight: rollSizeWeight,
      };

      // Create a new product document
      const productData = new Product({
        images: imagePaths, // Store multiple image paths
        title,
        descriptions,
        categories:category,
        subcategory: subcategory ? subcategory.split(",") : [], // Assuming subcategories are sent as a comma-separated string
        price: parsedPrice, // Store parsed price
        discount: parsedDiscount, // Store parsed discount
        totalPrice, // Store calculated total price
        skuCode,
        rating,
        productCollection, // Renamed field
        patternNumber,
        RollSize: [rollSize], // Store RollSize as an array with height and weight
        mrp_roll,
        quality,
        color,
        endUse,
        compositions,
        gsm,
        martindale,
        material,
        specialsCategory
      });

      // Save the product document to MongoDB
      await productData.save();

      // Construct the file URLs
      const fileUrls = req.files.map(
        (file) =>
          `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );

      // Send a successful response with the product data
      res.json({
        message: "Product created successfully",
        files: req.files,
        urls: fileUrls,
        totalPrice, // Send totalPrice in the response
      });
    } catch (error) {
      res.status(500).json({
        message: "Error saving product data to the database.",
        error: error.message,
      });
    }
  });
};

// Get a product by its ID
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product by ID
    const product = await Product.findById(productId);

    // If the product is not found, return an error response
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Send the product data as the response
    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving product by ID",
      error: error.message,
    });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    // Retrieve all products from the database
    const products = await Product.find();

    // Send the products data as the response
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving products",
      error: error.message,
    });
  }
};

// Update a product by its ID
exports.updateProduct = async (req, res, next) => {
  upload.array("files", 10)(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(500).json({ message: "An unknown error occurred." });
    }

    try {
      const productId = req.params.id;
      const {
        title,
        descriptions,
        categories,
        subcategory,
        price,
        discount,
        skuCode,
        rating,
        productCollection,
        patternNumber,
        mrp_roll,
        quality,
        color,
        endUse,
        compositions,
        gsm,
        martindale,
        material,
        rollSizeHeight,
        rollSizeWeight,
        specialsCategory,
      } = req.body;

      const parsedPrice = price ? parseFloat(price) : 0;
      const parsedDiscount = discount ? parseFloat(discount) : 0;
      const discountAmount = (parsedPrice * parsedDiscount) / 100;
      const totalPrice = parsedPrice - discountAmount;

      if (isNaN(totalPrice)) {
        return res.status(400).json({ message: "Invalid totalPrice calculation." });
      }

      const productData = {};

      if (title) productData.title = title;
      if (descriptions) productData.descriptions = descriptions;
      if (categories) productData.categories = categories;
      if (subcategory) productData.subcategory = subcategory.split(",");
      if (price) productData.price = parsedPrice;
      if (discount) productData.discount = parsedDiscount;
      if (totalPrice) productData.totalPrice = totalPrice;
      if (skuCode) productData.skuCode = skuCode;
      if (rating) productData.rating = rating;
      if (productCollection) productData.productCollection = productCollection;
      if (patternNumber) productData.patternNumber = patternNumber;
      if (mrp_roll) productData.mrp_roll = mrp_roll;
      if (quality) productData.quality = quality;
      if (color) productData.color = color;
      if (endUse) productData.endUse = endUse;
      if (compositions) productData.compositions = compositions;
      if (gsm) productData.gsm = gsm;
      if (martindale) productData.martindale = martindale;
      if (material) productData.material = material;
      if (rollSizeHeight || rollSizeWeight) {
        productData.RollSize = [{ height: rollSizeHeight, weight: rollSizeWeight }];
      }
      if (specialsCategory) productData.specialsCategory = specialsCategory;

      if (req.files.length > 0) {
        const imagePaths = req.files.map((file) => file.filename);
        productData.images = imagePaths;
      }

      const upsertedProduct = await Product.findByIdAndUpdate(
        productId,
        productData,
        { new: true, upsert: true, runValidators: true }
      );

      const fileUrls = req.files.map(
        (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );

      res.json({
        message: productId ? "Product updated successfully" : "Product created successfully",
        files: req.files,
        urls: fileUrls,
        totalPrice,
        product: upsertedProduct,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error saving product data to the database.",
        error: error.message,
      });
    }
  });
};


// Delete a product by ID
exports.deleteProductById = async (req, res, next) => {
  try {
    // Extract product ID from request parameters
    const productId = req.params.id;

    // Find and delete the product by ID
    const deletedProduct = await Product.findByIdAndDelete(productId);

    // Check if the product was found and deleted
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Send a success response
    res.json({
      message: "Product deleted successfully.",
      deletedProduct,
    });
  } catch (error) {
    // Handle any errors that occurred during the deletion
    res.status(500).json({
      message: "Error deleting product.",
      error: error.message,
    });
  }
};


exports.lastedProduct = async (req, res) => {
  try {
    // Fetch products sorted by 'createdAt' in descending order, limit to 1 to get the latest product
    const latestProduct = await Product.find().sort({ createdAt: -1 });

    if (latestProduct) {
      res.status(200).json({
        success: true,
        message: "Latest product retrieved successfully",
        product: latestProduct,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No products found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve the latest product",
      error: error.message,
    });
  }
};

  
  exports.getAllsubcategorysByProduct = async (req, res) => {
    try {
      // Aggregate to group products by subcategory
      const productsBySubcategory = await Product.aggregate([
        {
          $group: {
            _id: "$subcategory", // Group by subcategory
            firstProduct: { $first: "$$ROOT" } // Get the first product document in each group
          }
        },
        {
          $project: {
            _id: "$firstProduct._id",
            images: "$firstProduct.images",
            subcategory: "$_id", // Use the grouped subcategory
            title: "$firstProduct.title" // Get the title from the first product
          }
        }
      ]);
  
      res.status(200).json({
        success: true,
        message: "Products retrieved successfully for each unique subcategory",
        productsBySubcategory,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve products by subcategory",
        error: error.message,
      });
    }
  };
  
  

  exports.getAllcategorysByProduct = async (req, res) => {
    try {
      // Aggregate to group products by category
      const productsByCategory = await Product.aggregate([
        {
          $group: {
            _id: "$categories", // Group by category
            firstProduct: { $first: "$$ROOT" } // Get the first product document in each group
          }
        },
        {
          $project: {
            _id: "$firstProduct._id", // Use the product ID of the first product in each category
            images: "$firstProduct.images", // Get the thumbnail from the first product
            categories: "$_id", // Use the grouped category
            title: "$firstProduct.title" // Get the title from the first product
          }
        }
      ]);
  
      res.status(200).json({
        success: true,
        message: "Products retrieved successfully for each unique category",
        productsByCategory,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve products by category",
        error: error.message,
      });
    }
  };
  


exports.getProductByCategory = async (req, res) => {
  try {
    const { categories } = req.params;

    const decodedsCategories = decodeURIComponent(categories).toLocaleLowerCase(); // Decode the encoded subcategory
    console.log(decodedsCategories);

    const productsByCategory = await Product.find({ categories:decodedsCategories });

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully for the given category",
      productsByCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve products by category",
      error: error.message,
    });
  }
};

exports.getProductBySubcategory = async (req, res) => {
  try {
    const { subcategory } = req.params;
    const decodedSubcategory = decodeURIComponent(subcategory).toLocaleLowerCase(); // Decode the encoded subcategory
    console.log(decodedSubcategory);

    const productsBySubcategory = await Product.find({ subcategory: decodedSubcategory });

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully for the given subcategory",
      productsBySubcategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve products by subcategory",
      error: error.message,
    });
  }
};

 


exports.getCategoriesWithSubcategories = async (req, res) => {
  try {
    // Aggregation pipeline to group by category and collect subcategories
    const result = await Product.aggregate([
      {
        $group: {
          _id: "$categories",
          subcategories: { $addToSet: "$subcategory" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          subcategories: {
            $reduce: {
              input: "$subcategories",
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] },
            },
          },
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching categories and subcategories:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};