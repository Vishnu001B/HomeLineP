const ProductOrder = require("../models/productOrderSchema");
const Product = require("../../admin/models/product");
const mongoose = require("mongoose");
const User = require("../models/User");
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "amitkumar425863@gmail.com",
    pass: "wqql hbvq udjt erat",
  },
  tls: {
    rejectUnauthorized: false,
  },
});


const productOrder = async (req, res) => {
  try {
    const { userId, products, address, paymentMethod } = req.body;

    // Validate the required fields
    if (!userId || !products || !address || !paymentMethod) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate productIds in products array
    const isValidProductIds = products.every((product) =>
      mongoose.Types.ObjectId.isValid(product.productId)
    );

    if (!isValidProductIds) {
      return res.status(400).json({ message: "Invalid productId format." });
    }

    // Create a new product order
    const newOrder = new ProductOrder({
      userId,
      products,
      address,
      paymentMethod,
      paymentStatus: "unpaid",
      status: "pending",
    });

    // Save the product order to the database
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
// Fetch product orders by user ID
const getProductOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate the user ID
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format." });
    }

    // Find product orders by user ID
    const orders = await ProductOrder.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).populate("address");

    // Fetch addresses for each order
    const ordersWithAddresses = await Promise.all(
      orders.map(async (order) => {
        const user = await User.findById(order.userId).select("addresses");
        const address = user.addresses.id(order.address);
        return { ...order.toObject(), address };
      })
    );

    if (!ordersWithAddresses.length) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    res.status(200).json(ordersWithAddresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const cancelledOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    if (!orderId) {
      return res.status(400).json({ message: "orderId is required" });
    }

    const cancelledOrder = await ProductOrder.findByIdAndUpdate(
      orderId,
      { status: "cancelled" },
      { new: true }
    );

    if (!cancelledOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res
      .status(200)
      .json({ message: "Order cancelled successfully", cancelledOrder });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling order", error });
  }
};

const productOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({ message: "orderId is required." });
    }

    // Fetch the order with populated product details
    const order = await ProductOrder.findById(orderId).populate(
      "products.productId"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    // Fetch the user who placed the order
    const user = await User.findById(order.userId).select("addresses");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find the address from the user's addresses using the address ID from the order
    const address = user.addresses.id(order.address);

    if (!address) {
      return res.status(404).json({ message: "Address not found." });
    }

    // Add address details to the order object
    const orderWithAddress = {
      ...order.toObject(),
      address,
    };

    res.status(200).json(orderWithAddress);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const assgintoDeliveryBoy = async (req, res) => {
  try {
    const { orderId, deliveryBoyId } = req.body;

    if (!orderId || !deliveryBoyId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate deliveryBoyId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(deliveryBoyId)) {
      return res
        .status(400)
        .json({ message: "Invalid deliveryBoy ID format." });
    }

    const updatedOrder = await ProductOrder.findByIdAndUpdate(
      orderId,
      { deliveryBoy: deliveryBoyId },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    res
      .status(200)
      .json({ message: "Order assigned to delivery boy successfully", updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }

}

const getAllOrder = async (req, res, next) => {
  try {
    // Fetch all orders
    const orders = await ProductOrder.find({});

    // Fetch user info and address details for each order
    const ordersWithDetails = await Promise.all(orders.map(async (order) => {
      // Fetch user information
      const user = await User.findById(order.userId).exec();

      // Find the address within the user's addresses array
      const address = user ? user.addresses.find(addr => addr._id.toString() === order.address.toString()) : null;

      // Construct the order with additional user and address info
      return {
        ...order._doc,
        user: user ? {
          _id: user._id,
          email: user.email,
          customUserId: user.customUserId,
          isVerified: user.isVerified,
          wallet: user.wallet,
          security: user.security,
          // Add other user fields if needed
        } : null,
        address: address ? {
          _id: address._id,
          street: address.street,
          city: address.city,
          state: address.state,
          country: address.country,
          postalCode: address.postalCode,
          name: address.name,
          phone: address.phone,
          addressType: address.addressType,
          // Add other address fields if needed
        } : null
      };
    }));

    res.status(200).json(ordersWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;
  try {
    if (!orderId ||!status) {
      return res.status(400).json({ message: "orderId and status are required" });
    }
    // Validate status
    if (!["processing", "shipped", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    // Update the order status
    const updatedOrder = await ProductOrder.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order status updated successfully", updatedOrder });
    // Send order status update notification to the user
    // sendOrderStatusNotification(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

const sendOtp = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch the user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP
    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();

    // Set OTP and expiry time (e.g., 10 minutes)
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes from now
    await user.save();

    // Send OTP via email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: user.email,
      subject: "Your OTP for Order Verification",
      text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const verifyAndDeliverOrder = async (req, res) => {
  const { orderId, otp } = req.body;

  try {
    // Fetch the order details
    const order = await ProductOrder.findById(orderId).populate("userId");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    console.log("Order", order);

    // Fetch the user details associated with the order
    const user = order.userId; // Use embedded userId directly
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User", user.opt);

    // Verify the OTP
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if OTP is expired
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Mark the order as delivered
    order.status = "delivered";
    await order.save();

    // Clear the OTP and expiry time
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Send confirmation email
    const mailOptions = {
      from: "amitkumar425863@gmail.com",
      to: user.email,
      subject: "Order Delivered Successfully",
      text: `Your order with ID ${order._id} has been successfully delivered.`,
    };
    transporter.sendMail(mailOptions);



    res.status(200).json({ message: "Order delivered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = {
  productOrder,
  cancelledOrder,
  getProductOrdersByUserId,
  productOrderById,
  assgintoDeliveryBoy,
  getAllOrder,
  sendOtp,
  verifyAndDeliverOrder,
  updateOrderStatus
};