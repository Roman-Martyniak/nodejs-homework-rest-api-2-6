const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user.js");
const { ctrlWrapper } = require("../helpers");
const HttpError = require('../helpers/HttpError')

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({
        user: { email: newUser.email, subscription: newUser.subscription },
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }

    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
        throw HttpError(401, "Email or password is wrong");
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "47h" });

    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    });
};

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({ email, subscription });
};

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json();

};

const updateSubscriptionUser = async (req, res) => {
    const { userId } = req.params;
    const result = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
    });

    if (!result) {
        throw HttpError(404, "Not Found");
    }
    res.json(result);
};

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscriptionUser: ctrlWrapper(updateSubscriptionUser),
};