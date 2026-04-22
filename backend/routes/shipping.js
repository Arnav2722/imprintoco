const express = require('express');
const router = express.Router();
const { createShipment } = require('../services/delhivery');

router.post('/create-shipment', async (req, res) => {
    try {
        const result = await createShipment(req.body);
        if (result.success) {
            // result.packages[0].waybill is your Tracking ID
            res.json({ success: true, trackingId: result.packages[0].waybill });
        } else {
            res.status(400).json({ success: false, error: result.errors });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "Shipping failed" });
    }
});

module.exports = router;