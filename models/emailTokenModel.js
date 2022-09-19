const { Schema, model } = require("mongoose");

const EmailToken = new Schema({
	UserId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "Users",
		unique: true,
	},
	emailToken: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		expires: 3600, //1hr
	},
});

module.exports = model("EmailToken", EmailToken);
