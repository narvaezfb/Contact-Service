const express = require("express");
const router = express.Router();
const {
	getContacts,
	getContactById,
	getContactsByUserId,
	createContact,
	updateContact,
	deleteContact,
} = require("../controllers/contactController");
const {
	validateTokenWithUserService,
} = require("../middlewares/validate-token");

const tokenValidationEndpointForAdmin = "validate-token/admin";
const tokenValidationEndpointForAdminAndUser = "validate-token/admin-user";
const tokenValidationEndpointForUser = "validate-token/user";

router.get(
	"/contacts",
	validateTokenWithUserService(tokenValidationEndpointForAdmin),
	getContacts
);

router.get(
	"/contacts/:id",
	validateTokenWithUserService(tokenValidationEndpointForAdminAndUser),
	getContactById
);

router.get(
	"/user/:userId/contacts",
	validateTokenWithUserService(tokenValidationEndpointForAdminAndUser),
	getContactsByUserId
);

router.post(
	"/contacts",
	validateTokenWithUserService(tokenValidationEndpointForAdminAndUser),
	createContact
);

router.patch(
	"/contacts/:id",
	validateTokenWithUserService(tokenValidationEndpointForAdminAndUser),
	updateContact
);

router.delete(
	"/contacts/:id",
	validateTokenWithUserService(tokenValidationEndpointForAdminAndUser),
	deleteContact
);

module.exports = router;
