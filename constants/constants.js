const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const ChapaUrls = {
	SECRETE_KEY: process.env.CHAPA_SECRETE_KEY,
	CHAPA_BASE_URL: "https://api.chapa.co/v1/transaction",
	VERIFY_URL: "https://api.chapa.co/v1/transaction/verify",
	TX_REF: uuidv4(),
};

const EmailServiceUrl = {
	BASE_URL: process.env.FRONT_END_BASE_USRL,
	HOST: "smtp.gmail.com",
	SERVICE: "gmail",
	EMAIL_PORT: 587,
	SECURE: true,
	USER: process.env.EMAIL_USER,
	PASS: process.env.EMAIL_PASS,
};
module.exports = { ChapaUrls, EmailServiceUrl };
