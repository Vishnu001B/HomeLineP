const express = require("express");
const router = express.Router();

const product = require("../controller/productController");

// Define routes with appropriate middlewares
router.post("/createProduct", product.createProduct);
// Route to get a product by ID
router.get("/products/:id", product.getProductById);
router.get("/products", product.getAllProducts);

// Route to update a product by ID

router.put("/products/:id", product.updateProduct);

// Route to delete a product by ID
router.delete("/product/:id", product.deleteProductById);

router.get("/lastedproducts", product.lastedProduct)

router.get("/getAllSubcategory", product.getAllsubcategorysByProduct)

router.get("/getAllCategory", product.getAllcategorysByProduct)

router.get("/getProductByCatogry/:categories", product.getProductByCategory)

router.get("/getProductBySubcategory/:subcategory", product.getProductBySubcategory)

router.get("/categories", product.getCategoriesWithSubcategories);




module.exports = router;
