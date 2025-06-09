const axios = require("axios");
const otpGenerator = require("otp-generator");
const { SMS_API_KEY } = require("./config");

const sendOtpToPhone = async (phoneNumber) => {
  console.log(SMS_API_KEY);
  try {
    const smsOtp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    const res = await axios.post("https://www.fast2sms.com/dev/voice", {
      authorization: SMS_API_KEY,
      variable_values: `Your OTP: ${smsOtp}`,
      route: "otp",
      numbers: phoneNumber,
    });

    console.log(res.data);

    console.log("OTP sent successfully to your regsitered mobile number");
  } catch (err) {
    console.error("Error sending otp to phone:", err);
    throw err;
  }
};

module.exports = sendOtpToPhone;
