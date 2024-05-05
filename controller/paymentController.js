import { instance } from "../index.js";
import crypto from "crypto";

export const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100), // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({ success: true, order });
};

export const paymentVerification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    
    res.redirect(`${process.env.FRONTEND_URL}/login?referenceid=${razorpay_payment_id}`)
  } else {
    res.status(403).json({success: false})
  }
};
