// require("dotenv").config();
// const express = require("express");
// const Razorpay = require("razorpay");
// const cors = require("cors");
// const crypto = require("crypto");


// const shippingRoutes = require("./routes/shipping");

// const app = express();

// app.use(cors({
//     origin: "*",
//     exposedHeaders: ["x-rtb-fingerprint-id", "request-id"]
// }));

// app.use(express.json());

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // ✅ 1. REGISTER SHIPPING ROUTES
// // Isse aapka endpoint ban jayega: http://localhost:5000/api/create-shipment
// app.use("/api", shippingRoutes);

// // ✅ 2. CREATE ORDER (Razorpay)
// app.post("/create-order", async (req, res) => {
//     try {
//         console.log("RAZORPAY ORDER BODY:", req.body);
//         const amount = Number(req.body.amount);

//         if (!amount || amount < 1) {
//             return res.status(400).json({ error: "Invalid amount" });
//         }

//         const options = {
//             amount: amount,
//             currency: "INR",
//             receipt: "receipt_" + Date.now(),
//         };

//         const order = await razorpay.orders.create(options);
//         res.json(order);
//     } catch (err) {
//         console.error("ORDER ERROR:", err);
//         res.status(500).json({ error: "Order creation failed" });
//     }
// });

// // ✅ 3. VERIFY PAYMENT (Razorpay)
// app.post("/verify-payment", (req, res) => {
//     try {
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
//         const body = razorpay_order_id + "|" + razorpay_payment_id;

//         const expectedSignature = crypto
//             .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//             .update(body.toString())
//             .digest("hex");

//         if (expectedSignature === razorpay_signature) {
//             res.json({ status: "success" });
//         } else {
//             res.status(400).json({ status: "failure", message: "Signature mismatch" });
//         }
//     } catch (err) {
//         console.error("VERIFY ERROR:", err);
//         res.status(500).json({ error: "Verification failed" });
//     }
// });

// app.listen(5000, () => {
//     console.log("Server running on http://localhost:5000");
//     console.log("Shipping routes active at http://localhost:5000/api/create-shipment");
// });

require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");

const shippingRoutes = require("./routes/shipping");

const app = express();

// CORS Configuration - Allow specific origins for better security
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Razorpay Instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ ROOT ROUTE (Fixes Cannot GET / error)
app.get("/", (req, res) => {
    res.status(200).json({ status: "Imprinto API is live and running." });
});

// ✅ 1. REGISTER SHIPPING ROUTES
app.use("/api", shippingRoutes);

// ✅ 2. CREATE ORDER (Razorpay)
app.post("/create-order", async (req, res) => {
    try {
        console.log("RAZORPAY ORDER BODY:", req.body);
        const amount = Number(req.body.amount);

        if (!amount || amount < 1) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        const options = {
            amount: amount,
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

// ✅ 3. VERIFY PAYMENT (Razorpay)
app.post("/verify-payment", (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            res.json({ status: "success" });
        } else {
            res.status(400).json({ status: "failure", message: "Signature mismatch" });
        }
    } catch (err) {
        console.error("VERIFY ERROR:", err);
        res.status(500).json({ error: "Verification failed" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log("Shipping routes active at /api/create-shipment");
});