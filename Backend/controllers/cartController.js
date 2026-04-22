const cartModel = require("../models/cartSchema");
const productModel = require("../models/productSchema");
const addToCart = async (req, res) => {
  try {
    const { productId, quantity, sessionId } = req.body;
    const product = await productModel.findById(productId);
    console.log(sessionId);
    console.log(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "No product found ",
      });
    }
    let result = await cartModel.findOne({ sessionId });
    console.log(result);
    if (!result) {
      result = new cartModel({
        sessionId,
        items: [],
      });
    }
    console.log(result);
    const exist = result.items.find(
      (item) => item.product.toString() === productId,
    );
    if (exist) {
      exist.quantity += quantity;
    } else {
      result.items.push({
        product: productId,
        quantity,
      });
    }
    await result.save();
    res.status(200).json({
      success: true,
      cart: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
const getCart = (req, res) => {
  const { sessionId } = req.params;
  cartModel
    .findOne({ sessionId })
    .populate("items.product")
    .then((result) => {
      if (!result) {
       return res.status(404).json({
          success: false,
          message: "No product in cart",
          items: [],
        });
      } else {
        res.status(200).json({
          success: true,
          cart: result,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    });
};

const updateCart = async (req, res) => {
  try {
    const { sessionId, id } = req.params;
    const { quantity } = req.body;

    const cart = await cartModel.findOne({ sessionId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      })
    }

    const item = cart.items.find(
      (i) => i.product.toString() === id
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      })
    }

    if (quantity === "inc") {
      item.quantity += 1;
    } else if (quantity === "dec") {
      item.quantity -= 1;

      if (item.quantity <= 0) {
        cart.items = cart.items.filter(
          (i) => i.product.toString() !== id
        );
      }
    }

    await cart.save();

    res.status(200).json({
      success: true,
      cart,
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}



const removeFromCart = async (req, res) => {
  try {
    const { sessionId, productId } = req.params

    const cart = await cartModel.findOne({ sessionId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      })
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    )

    await cart.save();

    res.status(200).json({
      success: true,
      cart,
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

module.exports = { addToCart, getCart, updateCart, removeFromCart };
