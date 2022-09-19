const router = require("express").Router();
const { SignUp, Login, getAllUser } = require("../auth/userAuth");

router.post("/signup", SignUp);
router.post("/login", Login);
router.get("/all", getAllUser);

module.exports = router;
