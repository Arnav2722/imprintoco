// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     host: 'smtp-relay.brevo.com',
//     port: 587, // Brevo ke liye ye port use hota hai
//     secure: false,
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });

// const sendOrderConfirmation = async (customerEmail, customerName, orderId) => {
//     const mailOptions = {
//         from: '"Imprinto" <support.imprinto@gmail.com>',
//         to: customerEmail,
//         subject: `Order Confirmed: ${orderId}`,
//         html: `
//             <div style="font-family: sans-serif; padding: 20px;">
//                 <h1 style="color: #000;">Order Received!</h1>
//                 <p>Hi ${customerName},</p>
//                 <p>Your order <strong>${orderId}</strong> is confirmed and will be shipped soon.</p>
//                 <p>Thanks for shopping with Imprinto.</p>
//             </div>
//         `
//     };

//     try {
//         const info = await transporter.sendMail(mailOptions);
//         console.log("Email sent successfully: " + info.response);
//         return info;
//     } catch (error) {
//         console.error("Error sending email: ", error);
//         throw error;
//     }
// };

// module.exports = { sendOrderConfirmation };

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOrderConfirmation = async (email, customerName, orderId) => {
    const mailOptions = {
        from: '"Imprinto" <hello@imprinto.store>', // Jo sender address verify kiya hai
        to: email,
        subject: 'Order Confirmation - Imprinto',
        html: `
            <div style="font-family: sans-serif; padding: 20px;">
                <h1>Order Confirmed!</h1>
                <p>Hello ${customerName},</p>
                <p>Your order <strong>${orderId}</strong> has been received and is being processed.</p>
                <p>We will notify you once it ships.</p>
                <br>
                <p>Best regards,<br>Team Imprinto</p>
            </div>
        `
    };

    return await transporter.sendMail(mailOptions);
};

module.exports = { sendOrderConfirmation };