const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");
const userRoutes = require("./user/routes/userRoutes");
const quotetionRoutes = require("./admin/routes/quotetionRoutes");

const productRoutes = require("./admin/routes/productRoutes");

// const categoryRoutes = require("./user/routes/categoryRoutes");

const admin = require("./admin/routes/adminRoutes");

const banner = require("./admin/routes/bannerRouters");

const bookNow = require("./user/routes/bookNowRouter");

const navHeaderRoutes = require("./admin/routes/navHeaderRoutes");

const categoryRoutes = require("./admin/routes/category.routes");

const quoteRoutes = require("./admin/routes/quoteRoutes");

const bannerRoutes = require("../Backend/contentManagment/routes/banner");
const aboutRoutes = require("../Backend/contentManagment/routes/about");

const privacyRoutes = require("../Backend/contentManagment/routes/privacyPolicy")

const UserDetailsRouter = require("../Backend/user/routes/userdetails");
const addressRoutes = require("./user/routes/addressRoutes");
const path = require("path");
const productOrderRoutes = require("./user/routes/productOrderRoutes");

const furnitureSubcatogry = require("./admin/routes/furnitureSubcatogryRoute" )

connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Home route for admin routes
app.get("/", (req, res) => {
  res.send("API is running successfully");
});
// Routes
app.use("/api/admin", navHeaderRoutes);
app.use("/api/address", addressRoutes);

app.use("/api/user", userRoutes);

app.use("/api/user", bookNow);

app.use("/api/user", UserDetailsRouter);

app.use("/api/productOrder",productOrderRoutes)

app.use("/api/admin", admin);

app.use("/api/admin", banner);
app.use("/api/admin", productRoutes);
app.use("/api/categories", categoryRoutes);

app.use("/api/quotes", quoteRoutes);
app.use('/api', quotetionRoutes);

app.use("/api/furnitureSubcatogry", furnitureSubcatogry)


//content Managment
app.use('/api/content-banner', bannerRoutes);

app.use('/api/content-about', aboutRoutes)
app.use('/api' , privacyRoutes)

//deliver boys Users

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
