const nodemailer = require("nodemailer");
const EmailServiceUrl = require("../constants/constants");
const SendEmail = async (email, subject, text) => {
	try {
		const Transporter = nodemailer.createTransport({
			host: EmailServiceUrl.HOST,
			service: EmailServiceUrl.SERVICE,
			port: EmailServiceUrl.EMAIL_PORT,
			secure: EmailServiceUrl.SECURE,
			auth: {
				user: EmailServiceUrl.USER,
				pass: EmailServiceUrl.PASS,
			},
			tls: {
				rejectUnauthorized: false,
			},
		});
		await Transporter.sendMail({
			from: EmailServiceUrl.USER,
			to: email,
			subject: subject,
			text: text,
		});

		console.log("Email sent successfully");
	} catch (error) {
		console.log("Email not sent!", error);
	}
};
module.exports = SendEmail;
