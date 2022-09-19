const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
	first_name: {
		type: String,
	},
	last_name: {
		type: String,
	},
	email: {
		type: String,
	},
	phone: {
		type: String,
	},
	password: {
		type: String,
	},
	verified: {
		type: Boolean,
		default: false,
	},
});

module.exports = model("Users", UserSchema);
