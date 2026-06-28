// require("dotenv").config();
// const express = require("express");
// const Razorpay = require("razorpay");
// const cors = require("cors");
// const crypto = require("crypto");

// const shippingRoutes = require("./routes/shipping");

// const app = express();

// app.use(cors({
//     origin: "*",
//     methods: ["GET", "POST", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));

// app.use(express.json());

// app.get("/health", (req, res) => {
//     res.status(200).send("Imprinto server is active.");
// });

// app.get("/", (req, res) => {
//     res.status(200).json({ status: "Imprinto API is live." });
// });

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// app.use("/api", shippingRoutes);

// app.post("/create-order", async (req, res) => {
//     try {
//         const amount = Number(req.body.amount);
//         if (!amount || amount < 1) return res.status(400).json({ error: "Invalid amount" });
//         const order = await razorpay.orders.create({
//             amount: amount,
//             currency: "INR",
//             receipt: "receipt_" + Date.now(),
//         });
//         res.json(order);
//     } catch (err) {
//         console.error("ORDER ERROR:", err);
//         res.status(500).json({ error: "Order creation failed" });
//     }
// });

// app.post("/verify-payment", (req, res) => {
//     try {
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
//         const body = razorpay_order_id + "|" + razorpay_payment_id;
//         const expectedSignature = crypto
//             .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//             .update(body.toString())
//             .digest("hex");

//         if (expectedSignature === razorpay_signature) res.json({ status: "success" });
//         else res.status(400).json({ status: "failure", message: "Signature mismatch" });
//     } catch (err) {
//         res.status(500).json({ error: "Verification failed" });
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const shippingRoutes = require("./routes/shipping");
const { sendOrderConfirmation } = require("./services/email");

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Transporter for Email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ✅ Health Endpoint for Cron-job (Render Uptime Fix)
app.get("/health", (req, res) => {
    res.status(200).send("Imprinto server is active.");
});

// Root Route
app.get("/", (req, res) => {
    res.status(200).json({ status: "Imprinto API is live." });
});

// Razorpay Instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Shipping Routes
app.use("/api", shippingRoutes);

// ✅ Email Confirmation Route
app.post("/send-confirmation", async (req, res) => {
    try {
        const {
            email,
            customerName,
            orderId,
            orderDate,
            orderTotal
        } = req.body;

        await sendOrderConfirmation(
            email,
            customerName,
            orderId,
            orderDate,
            orderTotal
        );

        res.json({ success: true });

    } catch (err) {
        console.error("EMAIL ERROR:", err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// Razorpay Create Order
app.post("/create-order", async (req, res) => {
    try {
        const amount = Number(req.body.amount);
        if (!amount || amount < 1) return res.status(400).json({ error: "Invalid amount" });
        const order = await razorpay.orders.create({
            amount: amount,
            currency: "INR",
            receipt: "receipt_" + Date.now(),
        });
        res.json(order);
    } catch (err) {
        console.error("ORDER ERROR:", err);
        res.status(500).json({ error: "Order creation failed" });
    }
});

// Razorpay Verify Payment
app.post("/verify-payment", (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) res.json({ status: "success" });
        else res.status(400).json({ status: "failure", message: "Signature mismatch" });
    } catch (err) {
        res.status(500).json({ error: "Verification failed" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});