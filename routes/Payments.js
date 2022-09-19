const router = require("express").Router();
const {
	VerifyPayment,
	InitializePayent,
} = require("../controllers/PaymentController");

router.post("/initialize-payment", InitializePayent);
router.get("verify/:tx_ref", VerifyPayment);
module.exports = router;
