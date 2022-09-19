const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const EmailToken = require("../models/emailTokenModel");
const SendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const { EmailServiceUrl } = require("../constants/constants");
require("dotenv").config();

const SignUp = async (req, res, next) => {
	const { first_name, last_name, email, phone, password } = req.body;
	try {
		const existingUser = await UserModel.findOne({ email });
		if (existingUser)
			return res
				.status(400)
				.json({ message: "User With This Email Already Exist!" });
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		if (!hashedPassword)
			return res.status(400).json({ message: "password hash failed!" });
		const user = await UserModel.create({
			first_name,
			last_name,
			email,
			phone,
			password: hashedPassword,
		});

		if (!user) return res.status(400).json({ message: "User Signup Faild!" });
		const token = jwt.sign({ _id: user._id, email: user.email }, "SECRETE_KEY");
		// const emailToken = await EmailToken.create({
		// 	UserId: user._id,
		// 	emailToken: crypto.randomBytes(32).toString("hex"),
		// });
		// const url = `${EmailServiceUrl.BASE_URL}/users/${user._id}/verify/${emailToken.emailToken}`;
		// const isEmailSent = await SendEmail(user.email, "Verfiy Email", url);
		// if (!isEmailSent)
		// 	return res.status(400).json({ message: "email can notbe send!" });
		return res.status(201).json({
			message: "Signup successfully!",
			user: {
				_id: user._id,
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				TOKEN: token,
			},
		});
	} catch (error) {
		res.status(500).json({ message: `error ${error}` });
		next();
	}
};

const Login = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await UserModel.findOne({ email });
		if (!user)
			return res
				.status(400)
				.json({ message: "User With This Email Does Not Exist!" });

		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (!isPasswordMatch)
			return res.status(400).json({ message: "Password Does Not Match!" });
		const token = jwt.sign({ _id: user._id, email: user.email }, "SECRETE_KEY");

		return res.status(201).json({
			message: "LoggedIn successfully",
			user: {
				_id: user._id,
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				TOKEN: token,
			},
		});
	} catch (error) {
		res.status(500).json({ message: `error ${error}` });
		next();
	}
};
const getAllUser = async (req, res) => {
	try {
		const allUser = await UserModel.find();
		return res.json(allUser);
	} catch (error) {
		console.log(error);
	}
};

module.exports = { SignUp, Login, getAllUser };
