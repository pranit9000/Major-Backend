import express from "express";
import { config } from "dotenv";
import paymentRoute from "./routes/paymentRoute.js";
import cors from "cors";

config({ path: "./config/config.env" });
export const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", paymentRoute);

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API })
);
app.get("/", (req, res) =>
{
  res.send("Server is up and running");
})

import Razorpay from 'razorpay';

export const instance = new Razorpay({ key_id: process.env.RAZORPAY_API, key_secret: process.env.RAZORPAY_SECRET });

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})