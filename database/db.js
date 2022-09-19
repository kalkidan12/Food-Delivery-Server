const mongoose = require("mongoose");
require("dotenv").config();

const conn = async () => {
	try {
		const uri = process.env.MONGODB_URL;
		const connection = mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		if (connection) console.log("database connected");
	} catch (error) {
		console.log(`databse error ${error}`);
	}
};

module.exports = conn;
