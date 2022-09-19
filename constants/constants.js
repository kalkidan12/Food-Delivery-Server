const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const ChapaUrls = {
	SECRETE_KEY: "CHASECK_TEST-NGJwUSsHXRs6x34QSW5rNQrfbjYuFDT2", //process.env.CHAPA_SECRETE_KEY,
	CHAPA_BASE_URL: "https://api.chapa.co/v1/transaction",
	VERIFY_URL: "https://api.chapa.co/v1/transaction/verify",
	TX_REF: uuidv4(),
};

const EmailServiceUrl = {
	BASE_URL: "http://localhost:3000",
	HOST: "smtp.gmail.com",
	SERVICE: "gmail",
	EMAIL_PORT: 587,
	SECURE: true,
	USER: "kalget1203@gmail.com",
	PASS: "Kalkidan@1203",
};
module.exports = { ChapaUrls, EmailServiceUrl };
