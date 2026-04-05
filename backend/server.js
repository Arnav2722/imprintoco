const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");

const app = express();

app.use(cors());
app.use(express.json());

// 🔴 PUT YOUR REAL KEYS
require("dotenv").config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// ✅ CREATE ORDER
app.post("/create-order", async (req, res) => {
    try {
        console.log("BODY:", req.body); // DEBUG

        const amount = Number(req.body.amount);

        if (!amount || amount < 1) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        const options = {
            amount: amount, // already in paise
            currency: "INR",
            receipt: "receipt_" + Date.now(),
        };

        const order = await razorpay.orders.create(options);

        res.json(order);
    } catch (err) {
        console.error("ORDER ERROR:", err);
        res.status(500).json({ error: "Order creation failed" });
    }
});

// ✅ VERIFY PAYMENT
app.post("/verify-payment", (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", "YOUR_KEY_SECRET")
            .update(body)
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            res.json({ status: "success" });
        } else {
            res.status(400).json({ status: "failure" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Verification failed" });
    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});