const nodemailer = require('nodemailer');

// Yahan process.env.EMAIL_USER aur EMAIL_PASS use ho raha hai
// Jo tumne .env file mein set kiya hai
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587, // Brevo ke liye ye port use hota hai
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOrderConfirmation = async (customerEmail, customerName, orderId) => {
    const mailOptions = {
        from: '"Imprinto" <support.imprinto@gmail.com>',
        to: customerEmail,
        subject: `Order Confirmed: ${orderId}`,
        html: `
            <div style="font-family: sans-serif; padding: 20px;">
                <h1 style="color: #000;">Order Received!</h1>
                <p>Hi ${customerName},</p>
                <p>Your order <strong>${orderId}</strong> is confirmed and will be shipped soon.</p>
                <p>Thanks for shopping with Imprinto.</p>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully: " + info.response);
        return info;
    } catch (error) {
        console.error("Error sending email: ", error);
        throw error;
    }
};

module.exports = { sendOrderConfirmation };