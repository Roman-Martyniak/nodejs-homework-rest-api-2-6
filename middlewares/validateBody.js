const HttpError = require("../helpers/HttpError");

const validateBody = (schema) => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            const fieldName = error.details[0].path[0];
            throw new HttpError(400, `missing required ${fieldName} field`);
        }
        next();
    };

    return func;
};

module.exports = validateBody;
