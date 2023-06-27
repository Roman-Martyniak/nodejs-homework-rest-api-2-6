const { isValidObjectId } = require("mongoose");
const HttpError = require("../helpers/HttpError");

const isValidUserId = (req, res, next) => {
    const { userId } = req.params;
    if (!isValidObjectId(userId)) {
        throw HttpError(400, `${userId} is not valid id`);
    }
    next();
};

module.exports = isValidUserId;