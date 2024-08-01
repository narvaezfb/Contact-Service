const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	birthday: {
		type: Date,
		required: true,
	},
	relationship: {
		type: String,
		enum: ["friend", "family", "coworker"],
		required: true,
	},
	isActive: {
		type: Boolean,
		required: true,
	},
	language: {
		type: String,
		enum: ["Spanish", "English", "French"],
		required: true,
	},
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
