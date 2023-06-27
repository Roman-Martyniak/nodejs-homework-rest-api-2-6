const HttpError = require("../helpers/HttpError");
const {ctrlWrapper} = require("../helpers");
const Contact = require('../models/contacts')

const getListContacts = async (req, res) => {
        const { _id: owner } = req.user;
        const { page = 1, limit = 10, ...query } = req.query;
        const skip = (page - 1) * limit;
        const result = await Contact.find({ owner, ...query }, "", {
                skip,
                limit,
        }).populate("owner", "email name");
        res.json(result);
};

const getContacts = async (req, res) => {
        const { id } = req.params;
        const result = await Contact.findById(id);
        if (!result) {
                throw HttpError(404, `Contact with id=${id} not found`);
        }
        res.json(result);
};


const postAddContact = async (req, res) => {
        const { _id: owner } = req.user;
        const result = await Contact.create({ ...req.body, owner });
        res.status(201).json(result);
};

const putUpdateContact = async (req, res) => {
        const { id } = req.params;
        const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        if (!result) {
                throw HttpError(404, `Contact with id=${id} not found`);
        }
        res.json(result);
};
const deleteContact = async (req, res) => {
        const { id } = req.params;
        const result = await Contact.findByIdAndDelete(id);
        if (!result) {
                throw HttpError(404, "Not found");
        }
        res.json({message: "Delete success"});
};

const updateStatusContact = async (req, res, next) => {
        const { id } = req.params;
        const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        if (!result) {
                throw HttpError(404, "Not found");
        }
        res.json(result);
};

module.exports = {
        putUpdateContact: ctrlWrapper(putUpdateContact),
        deleteContact: ctrlWrapper(deleteContact),
        postAddContact: ctrlWrapper(postAddContact),
        getContacts: ctrlWrapper(getContacts),
        getListContacts: ctrlWrapper(getListContacts),
        updateStatusContact: ctrlWrapper(updateStatusContact),
};