const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const Chapa = require("chapa-node");

const { ChapaUrls } = require("../constants/constants");
const chapa = new Chapa(ChapaUrls.SECRETE_KEY);

//initialize payment
const InitializePayent = async (req, res) => {
	const { VERIFY_URL, TX_REF } = ChapaUrls;
	try {
		const initializeInfo = { ...req.body };
		initializeInfo["tx_ref"] = TX_REF;
		initializeInfo["return_url"] = `${VERIFY_URL}/${TX_REF}`;
		initializeInfo[
			"callback_url"
		] = `http://localhost:3000/api/payment/verify/${TX_REF}`;
		const responseData = await chapa.initialize(initializeInfo);
		const { status, data, message } = responseData;
		if (status === "success") {
			res.send({
				checkout_url: data.checkout_url,
				status,
			});
			// res.redirect(data.checkout_url);
		} else {
			throw new Error({ message, status });
		}
	} catch (error) {
		console.log("error==>", error);
	}
};

//verify payment by transaction refrence
const VerifyPayment = async (req, res) => {
	try {
		const { tx_ref } = req.params;
		const data = await chapa.verify(tx_ref);
		//process the data
		res.sendStatus(200);
	} catch (error) {
		console.log("error===>", error);
	}
};

// app.post("/api/chapa-webhook",
const WebHook = async (req, res) => {
	try {
		//read chapa web hook implemetation for more
		res.sendStatus(200);
	} catch (error) {
		console.log("error===>", error);
	}
};

module.exports = { InitializePayent, VerifyPayment, WebHook };
