// const axios = require('axios');

// const DELHI_API = 'https://track.delhivery.com/api/cmu/create.json';
// const TRACK_API = 'https://track.delhivery.com/api/v1/packages/json/';

// // Function to create a shipment in Delhivery
// const createShipment = async (orderData) => {
//     const payload = `format=json&data=${JSON.stringify({
//         shipments: [{
//             name: orderData.customerName,
//             add: orderData.address,
//             pin: orderData.pincode,
//             phone: orderData.phone,
//             order: orderData.orderId,
//             payment_mode: "Prepaid", // Since you use Razorpay
//             total_amount: orderData.totalAmount,
//             quantity: "1",
//             description: "Art Prints",
//             weight: "0.5" // in kg
//         }],
//         pickup_location: {
//             name: "Imprinto Co.",
//             add: "Home",
//             phone: "+91 6350083427"
//         }
//     })}`;

//     try {
//         const response = await axios.post(DELHI_API, payload, {
//             headers: {
//                 'Authorization': `Token ${process.env.DELHIVERY_TOKEN}`,
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Shipment Error:", error.response?.data || error.message);
//         throw error;
//     }
// };

// module.exports = { createShipment };


const axios = require('axios');

const DELHI_API = 'https://track.delhivery.com/api/cmu/create.json';

const createShipment = async (orderData) => {
    // 1. Precise formatting
    const mode = orderData.paymentMode === "COD" ? "COD" : "Prepaid";
    const amountToCollect = orderData.paymentMode === "COD" ? orderData.totalAmount : 0;

    // 2. Exact Data Object
    const shipmentData = {
        shipments: [{
            name: orderData.customerName,
            add: orderData.address,
            pin: orderData.pincode,
            phone: orderData.phone,
            order: orderData.orderId,
            payment_mode: mode,
            total_amount: orderData.totalAmount,
            cod_amount: amountToCollect, // 🔴 Bhej rahe hain as a number/float
            quantity: "1",
            description: "Art Prints",
            weight: 0.5
        }],
        pickup_location: {
            name: "Home"
        }
    };

    // 3. Using URLSearchParams for perfect form-data encoding
    const params = new URLSearchParams();
    params.append('format', 'json');
    params.append('data', JSON.stringify(shipmentData));

    try {
        const response = await axios.post(DELHI_API, params.toString(), {
            headers: {
                'Authorization': `Token ${process.env.DELHIVERY_TOKEN}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        console.log("Delhivery Full Response:", JSON.stringify(response.data));

        if (response.data && response.data.packages && response.data.packages.length > 0) {
            const pkg = response.data.packages[0];
            if (pkg.waybill) {
                return { success: true, packages: response.data.packages };
            } else {
                // Agar waybill nahi hai, toh remarks mein error hoga
                return { success: false, errors: pkg.remarks || "Validation Failed" };
            }
        }
        return { success: false, errors: response.data.remarks || "No package created" };

    } catch (error) {
        console.error("Delhivery API Exception:", error.response?.data || error.message);
        return { success: false, errors: error.message };
    }
};

module.exports = { createShipment };