// const express = require('express');
// const router = express.Router();
// const { createShipment } = require('../services/delhivery');

// router.post('/create-shipment', async (req, res) => {
//     try {
//         const result = await createShipment(req.body);
//         if (result.success) {
//             // result.packages[0].waybill is your Tracking ID
//             res.json({ success: true, trackingId: result.packages[0].waybill });
//         } else {
//             res.status(400).json({ success: false, error: result.errors });
//         }
//     } catch (err) {
//         res.status(500).json({ success: false, message: "Shipping failed" });
//     }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const { createShipment } = require('../services/delhivery');

// Route: POST /api/create-shipment
router.post('/create-shipment', async (req, res) => {
    try {
        console.log("Shipping Request Received for:", req.body.customerName);

        // Service ko call kar rahe hain
        const result = await createShipment(req.body);

        if (result.success) {
            // result.packages[0].waybill hi aapka asli Tracking ID hai
            console.log("Shipment Created! Tracking ID:", result.packages[0].waybill);

            res.json({
                success: true,
                trackingId: result.packages[0].waybill,
                data: result.packages
            });
        } else {
            console.log("Shipment Failed:", result.errors);
            res.status(400).json({
                success: false,
                error: result.errors
            });
        }
    } catch (err) {
        console.error("Router Error:", err);
        res.status(500).json({
            success: false,
            message: "Internal Shipping Server Error"
        });
    }
});

module.exports = router;