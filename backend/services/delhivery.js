const axios = require('axios');

const DELHI_API = 'https://track.delhivery.com/api/cmu/create.json';

const createShipment = async (orderData) => {
    const mode = orderData.paymentMode === "COD" ? "COD" : "Prepaid";
    const totalAmount = Number(orderData.totalAmount);
    const codAmount = mode === "COD" ? totalAmount : 0;

    // Packaging Logic
    const hasLargePoster = orderData.items?.some(
        item => item.size === "A3" || item.size === "13x19"
    );

    const packageDetails = hasLargePoster
        ? {
            weight: 0.41,   // Poster tube ~409g
            length: 32,
            breadth: 8,
            height: 8
        }
        : {
            weight: 0.10,   // A5/A6 + courier bag
            length: 25,
            breadth: 18,
            height: 2
        };

    console.log("PACKAGE TYPE:", hasLargePoster ? "POSTER TUBE" : "COURIER PACK");
    console.log("PACKAGE DETAILS:", packageDetails);

    const shipmentData = {
        shipments: [{
            name: orderData.customerName,
            add: orderData.address,
            pin: String(orderData.pincode),
            city: orderData.city,
            state: orderData.state,
            phone: orderData.phone,
            order: orderData.orderId,
            payment_mode: mode,
            total_amount: totalAmount,
            cod_amount: codAmount,
            quantity: "1",
            description: "Art Prints",
            weight: packageDetails.weight,
            length: packageDetails.length,
            breadth: packageDetails.breadth,
            height: packageDetails.height,
        }],
        pickup_location: {
            name: "Home"
        }
    };
    console.log("DELHIVERY REQUEST:");
    console.log(JSON.stringify(shipmentData, null, 2));

    const params = new URLSearchParams();
    params.append('format', 'json');
    params.append('data', JSON.stringify(shipmentData));

    try {
        console.log("DELHIVERY PACKAGE:");
        console.log(JSON.stringify(shipmentData, null, 2));

        const response = await axios.post(DELHI_API, params.toString(), {
            headers: {
                'Authorization': `Token ${process.env.DELHIVERY_TOKEN}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // Delhivery ka success response check
        if (response.data.success === true) {
            return { success: true, packages: response.data.packages };
        } else {
            // Agar API success:false bhejti hai par status code 200 hota hai
            return { success: false, errors: response.data.rmk || response.data.packet_errors?.[0]?.error || "Unknown Error" };
        }
    } catch (error) {
        // Detailed error capture
        const errorMsg = error.response?.data?.rmk || error.message;
        console.error("Delhivery API Exception:", errorMsg);
        return { success: false, errors: errorMsg };
    }
};

module.exports = { createShipment };

console.log("TOKEN VALUE:", process.env.DELHIVERY_TOKEN);
