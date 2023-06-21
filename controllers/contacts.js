const HttpError = require("../helpers/HttpError");
const {ctrlWrapper} = require("../helpers");
const {Contact} = require('../models/contacts')
const getListContacts = async (req, res) => {
        const result = await Contact.find({}, "-createdAt -updatedAt");
        if (!result) {
                throw HttpError(404, "Not found");
        }
        res.json(result);
};

const getContacts = async (req, res) => {
        const { contactId } = req.params;
        const result = await Contact.findById(contactId);
        if (!result) {
                throw HttpError(404, "Not found");
        }
        res.json(result);
};

const postAddContact = async (req, res) => {
        const contact = await Contact.create(req.body);
        res.status(201).json(contact);
};

const putUpdateContact = async (req, res) => {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body, {
                new: true,
        });
        if (!result) {
                throw HttpError(404, "Not found");
        }
        res.json(result);
};
const deleteContact = async (req, res) => {
        const {contactId} = req.params;
        const result = await Contact.findByIdAndDelete(contactId)
        if (!result) {
                throw HttpError(404, "Not found");
        }
        res.json({message: "Delete success"});
};

const updateStatusContact = async (req, res, next) => {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body, {
                new: true,
        });
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