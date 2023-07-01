const jwt = require("jsonwebtoken");
const  {User}  = require("../models/user");
const  HttpError  = require("../helpers/HttpError");

const { SECRET_KEY } = process.env;


const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        throw new HttpError(401, "Not authorized");
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token) {
            throw new HttpError(401, "Not authorized");
        }
        req.user = user;
        next();
    } catch {
        throw new HttpError(401, "Not authorized");
    }
};

module.exports = authenticate;

