const nodemailer = require("nodemailer");
const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
} = require("./config");

const sendOtpToEmail = async (option) => {
  try {
   

    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: true,
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    });

    const emailOptions = {
      from: "Travel planner support <suport@travelplaner.com>",
      to: option.email,
      subject: option.subject,
      html: option.message,
    };
    await transporter.sendMail(emailOptions);

    console.log("OTP email sent successfully");
  } catch (err) {
    console.error("Error sending otp email:", err);
    throw err;
  }
};

module.exports = sendOtpToEmail;
