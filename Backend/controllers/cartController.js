import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { itemId } = req.body; // destructure itemId from body
    const userId = req.userId; // get userId from auth middleware

    if (!itemId) {
      return res
        .status(400)
        .json({ success: false, message: "itemId is required" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    res.json({ success: true, message: "Added to cart", cartData });
  } catch (error) {
    console.error("AddToCart Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export default addToCart;

const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId; // get userId from auth middleware
    const { itemId } = req.body;

    if (!itemId) {
      return res
        .status(400)
        .json({ success: false, message: "itemId is required" });
    }

    let userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) {
        delete cartData[itemId]; // remove item if quantity is 0
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Item not in cart" });
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Removed from cart", cartData });
  } catch (error) {
    console.error("RemoveFromCart Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.userId; // get userId from auth middleware

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    res.json({ success: true, cartData });
  } catch (error) {
    console.error("GetCart Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// export default getCart;

export { addToCart, removeFromCart, getCart };
