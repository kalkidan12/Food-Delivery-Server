const mongoose = require("mongoose");
require("dotenv").config();

const conn = async () => {
	const uri = process.env.MONGODB_URL;
	// const uri = "mongodb://localhost:27017/kalkidan";

	try {
		const connection = await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		if (connection) console.log("database connected");
	} catch (error) {
		console.log(uri);
		console.log(`databse error ${error}`);
	}
};

module.exports = conn;
