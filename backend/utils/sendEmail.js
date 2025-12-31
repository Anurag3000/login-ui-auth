import nodemailer from 'nodemailer';

export const sendEmail = async(to, otp)=>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: "Email Verification OTP",
        text: `Your OTP for email verification is ${otp}. It is valid for 10 minutes.`
    });

    console.log("✅ Email sendMail() completed");
}