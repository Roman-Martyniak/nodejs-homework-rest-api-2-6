const {httpError} = require("../helpers");

const validateBody = (schema) => {
    const validate = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return next(httpError(400, `missing required name field ${error.message}`));
        }

        next();
    };

    return validate;
};

module.exports = validateBody;