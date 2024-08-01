const Contact = require("../models/contact");
const sendResponse = require("../utils/responseHelper");
const { STATUS, MESSAGES } = require("../utils/responseConstants");

// Get all contacts
module.exports.getContacts = async (req, res) => {
	try {
		const contacts = await Contact.find();
		sendResponse(res, STATUS.OK, contacts, MESSAGES.CONTACTS_RETRIEVED);
	} catch (error) {
		sendResponse(res, STATUS.INTERNAL_SERVER_ERROR, null, error.message);
	}
};

// Get contact by ID
module.exports.getContactById = async (req, res) => {
	const { id } = req.params;

	try {
		const contact = await Contact.findById(id);
		if (!contact) {
			return sendResponse(
				res,
				STATUS.NOT_FOUND,
				null,
				MESSAGES.CONTACT_NOT_FOUND
			);
		}
		sendResponse(res, STATUS.OK, contact, MESSAGES.CONTACT_RETRIEVED);
	} catch (error) {
		sendResponse(res, STATUS.INTERNAL_SERVER_ERROR, null, error.message);
	}
};

module.exports.getContactsByUserId = async (req, res) => {
	const { userId } = req.params;

	try {
		const contacts = await Contact.find({ userId });
		if (contacts.length === 0) {
			return sendResponse(
				res,
				STATUS.NOT_FOUND,
				null,
				MESSAGES.CONTACTS_NOT_FOUND
			);
		}
		sendResponse(res, STATUS.OK, contacts, MESSAGES.CONTACTS_RETRIEVED);
	} catch (error) {
		sendResponse(res, STATUS.INTERNAL_SERVER_ERROR, null, error.message);
	}
};

// Create a new contact
module.exports.createContact = async (req, res) => {
	const { userId, name, birthday, relationship, isActive, language } = req.body;

	try {
		const newContact = new Contact({
			userId,
			name,
			birthday,
			relationship,
			isActive,
			language,
		});
		const savedContact = await newContact.save();
		sendResponse(res, STATUS.CREATED, savedContact, MESSAGES.CONTACT_CREATED);
	} catch (error) {
		sendResponse(res, STATUS.INTERNAL_SERVER_ERROR, null, error.message);
	}
};

// Update a contact
module.exports.updateContact = async (req, res) => {
	const { id } = req.params;
	const { name, birthday, relationship, isActive, language } = req.body;

	try {
		const updates = {};
		if (name) updates.name = name;
		if (birthday) updates.birthday = birthday;
		if (relationship) updates.relationship = relationship;
		if (isActive !== undefined) updates.isActive = isActive;
		if (language) updates.language = language;

		const contact = await Contact.findByIdAndUpdate(id, updates, { new: true });
		if (!contact) {
			return sendResponse(
				res,
				STATUS.NOT_FOUND,
				null,
				MESSAGES.CONTACT_NOT_FOUND
			);
		}
		sendResponse(res, STATUS.OK, contact, MESSAGES.CONTACT_UPDATED);
	} catch (error) {
		sendResponse(res, STATUS.INTERNAL_SERVER_ERROR, null, error.message);
	}
};

// Delete a contact
module.exports.deleteContact = async (req, res) => {
	const { id } = req.params;

	try {
		const contact = await Contact.findByIdAndDelete(id);
		if (!contact) {
			return sendResponse(
				res,
				STATUS.NOT_FOUND,
				null,
				MESSAGES.CONTACT_NOT_FOUND
			);
		}
		sendResponse(res, STATUS.OK, null, MESSAGES.CONTACT_DELETED);
	} catch (error) {
		sendResponse(res, STATUS.INTERNAL_SERVER_ERROR, null, error.message);
	}
};
