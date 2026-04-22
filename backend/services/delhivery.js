const axios = require('axios');

const DELHI_API = 'https://track.delhivery.com/api/cmu/create.json';
const TRACK_API = 'https://track.delhivery.com/api/v1/packages/json/';

// Function to create a shipment in Delhivery
const createShipment = async (orderData) => {
    const payload = `format=json&data=${JSON.stringify({
        shipments: [{
            name: orderData.customerName,
            add: orderData.address,
            pin: orderData.pincode,
            phone: orderData.phone,
            order: orderData.orderId,
            payment_mode: "Prepaid", // Since you use Razorpay
            total_amount: orderData.totalAmount,
            quantity: "1",
            description: "Art Prints",
            weight: "0.5" // in kg
        }],
        pickup_location: {
            name: "Imprinto Co.",
            add: "Your Pickup Address here",
            phone: "Your Phone"
        }
    })}`;

    try {
        const response = await axios.post(DELHI_API, payload, {
            headers: {
                'Authorization': `Token ${process.env.DELHIVERY_TOKEN}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Shipment Error:", error.response?.data || error.message);
        throw error;
    }
};

module.exports = { createShipment };