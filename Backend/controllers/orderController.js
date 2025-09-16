
// export {placeOrder}
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  // const frontend_url = "http://localhost:5173";
  const frontend_url = "http://localhost:5174";


  try {
    const newOrder = new orderModel({
      userId: req.userId, // ✅ from auth middleware
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    console.log("👉 items from frontend:", req.body.items);


    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: item.price * 100, // Stripe expects cents
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Delivery charges" },
        unit_amount: 200, // example: $2 delivery fee
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};


const verifyOrder=async(req,res)=>{
    const {orderId , success}= req.body

    try {
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true, message:"paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false, message:"Not paid"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}


const userOrders = async (req, res) => {
  try {
    const userId = req.userId; // get from auth middleware
     console.log("👉 userId from middleware:", userId); // add this

    const orders = await orderModel.find({ userId }).sort({ createdAt: -1 }); // latest first

    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("UserOrders Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// listing orders for admin panal

const listOrders =async(req,res)=>{
  try {
    const orders =await orderModel.find({})
    res.json({success:true, data:orders})
  } catch (error) {
    console.log(error)
    res.json({success:true, message:"Error"})

  }
}

// update the status  api order 

const updateStates=async(req,res)=>{
  try {
      await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
      res.json({success:true,message:"Status updated"})
  } catch (error) {
    console.log(error)
      res.json({success:true,message:"Error"})

  }
}

export { placeOrder, verifyOrder ,userOrders,listOrders,updateStates};
