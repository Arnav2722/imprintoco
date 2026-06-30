const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// SMTP Check
transporter.verify((error) => {
    if (error) {
        console.error("SMTP ERROR:", error);
    } else {
        console.log("BREVO SMTP READY");
    }
});

const sendOrderConfirmation = async (
    email,
    customerName,
    orderId,
    orderDate,
    orderTotal
) => {
    const mailOptions = {
        from: '"Imprinto Co." <support.imprinto@gmail.com>',
        to: email,
        subject: "Your Imprinto Order Has Been Confirmed 💙",

        html: `
        <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;background:#ffffff;padding:40px;color:#111111;">

            <h1 style="margin-bottom:10px;">
                Thank you for shopping with Imprinto Co. 💙
            </h1>

            <p>Hi ${customerName},</p>

            <p>
                Your order has been successfully placed, and we're excited to bring your obsession to life.
            </p>

            <div style="
                border:1px solid #e5e5e5;
                padding:20px;
                margin:30px 0;
                border-radius:8px;
                background:#fafafa;
            ">
                <h3 style="margin-top:0;">Order Details</h3>

                <p><strong>Order ID:</strong> ${orderId}</p>
                <p><strong>Order Date:</strong> ${orderDate}</p>
                <p><strong>Total Amount:</strong> ₹${orderTotal}</p>
            </div>

            <p>
                Our team has started preparing your order.
            </p>

            <p>
                As soon as your order is packed and shipped, we'll send you another email with your tracking details.
            </p>

            <p>
                At Imprinto, every poster is carefully packed to ensure it arrives in perfect condition.
            </p>

            <p>
                If you have any questions, simply reply to this email — we're always happy to help.
            </p>

            <br>

            <p>
                Thank you for choosing Imprinto.
            </p>

            <p>
                <strong>Own Your Obsession.</strong>
            </p>

            <hr style="margin:30px 0;">

            <p>
                Team Imprinto Co.
            </p>

            <p>
                imprintoco.in
            </p>

        </div>
        `
    };

    return await transporter.sendMail(mailOptions);
};

module.exports = { sendOrderConfirmation };