const orderModel = require("../models/orderSchema");
const cartModel = require("../models/cartSchema");
const productModel = require("../models/productSchema");
const getOrder = (req, res) => {
  const { id } = req.params;
  orderModel
    .findById(id).populate("items.product").populate("user")
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          message: "No order was found",
        });
      } else {
        res.status(200).json({
          success: true,
          order: result,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    });
};

const getAllOrder = (req, res) => {
  orderModel
    .find({}).populate("user").populate("items.product")
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          message: "No orders found",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "All order",
          orders: result,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    });
};
const getMyOrders = async (req, res) => {
  const userId=req.token.id
  try {
    const result = await orderModel.find({ user :userId}).populate("items.product").populate("user");
    if (result.length === 0) {
      res.status(404).json({
        success: false,
        message: "No order was found",
      });
    } else {
      res.status(200).json({
        success: true,
        order: result,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const userId = req.token.id;
    console.log("token",userId)
    const cart = await cartModel
      .findOne({ sessionId })
      .populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    let totalPrice = 0;
    const orderItems = cart.items.map((item) => {
      totalPrice += item.product.price * item.quantity;
      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      };
    });
    console.log(orderItems)

    const newOrder = await orderModel.create({
      user: userId,
      items: orderItems,
      totalPrice
    })
    cart.items = [];
    await cart.save();
   console.log(newOrder)

    console.log(cart)
    res.status(201).json({ 
      success: true,
      message: "Order created successfully",
       order: newOrder });
  } catch (err) {
    res.status(500).json({ success: false, message:err.message});
  }
};

module.exports = { getOrder, getAllOrder, getMyOrders, createOrder };
