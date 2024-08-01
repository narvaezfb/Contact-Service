const axios = require("axios");
const sendResponse = require("../utils/responseHelper");
const { STATUS, MESSAGES } = require("../utils/responseConstants");

const validateTokenWithUserService = (endpoint) => {
	return async (req, res, next) => {
		try {
			const token = req.header("Authorization")?.replace("Bearer ", "");

			if (!token) {
				return sendResponse(
					res,
					STATUS.BAD_REQUEST,
					null,
					MESSAGES.NOT_TOKEN_PROVIDED
				);
			}

			let response;
			try {
				// Send the token to the User Service for validation
				response = await axios.get(`http://localhost:3000/api/${endpoint}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				console.log(response.data);
			} catch (error) {
				// Handle the error response from the auth service
				if (error.response) {
					console.error(
						"Error in making request to auth service:",
						error.response.data
					);
					return sendResponse(
						res,
						error.response.status,
						error.response.data.data,
						error.response.data.message
					);
				} else {
					console.error(
						"Error in making request to auth service:",
						error.message
					);
					return sendResponse(
						res,
						STATUS.UNAUTHORIZED,
						null,
						MESSAGES.INVALID_TOKEN
					);
				}
			}

			const isAuth = response.data.data.isAuth;

			if (!isAuth) {
				return sendResponse(
					res,
					STATUS.UNAUTHORIZED,
					null,
					MESSAGES.INVALID_TOKEN
				);
			}

			req.user = response.data.user;
			next();
		} catch (error) {
			console.error("Error in authentication middleware:", error.message);
			sendResponse(res, STATUS.UNAUTHORIZED, null, MESSAGES.INVALID_TOKEN);
		}
	};
};

module.exports = { validateTokenWithUserService };
