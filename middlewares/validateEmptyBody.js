const HttpError = require("../helpers/HttpError");

const validateEmptyBody = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new HttpError(400, "missing fields"));
    }

    next();
};

module.exports = validateEmptyBody;