const {HttpError} = require("../helpers/HttpError");
const addSchema = require("../schemas/schema");
const contacts = require("../models/contacts");

const getListContacts = async (req, res, next) => {
    try {
        const result = await contacts.listContacts();

        res.json(result);
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};

const getContacts = async (req, res, next) => {
    try {
        const {contactId} = req.params;
        const result = await contacts.getContactById(contactId);
        if (!result) {
            throw HttpError(404, "Not found");
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
};

const postAddContact = async (req, res, next) => {
    try {
        const {error} = addSchema.validate(req.body);
        if (error) {
            throw HttpError(400, "missing required name field");
        }
        const result = await contacts.addContact(req.body);

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

const putUpdateContact = async (req, res, next) => {
    try {
        const {error} = addSchema.validate(req.body);
        if (error) {
            throw HttpError(400, "missing fields");
        }
        const {contactId} = req.params;
        const result = await contacts.updateContactById(contactId, req.body);
        if (!result) {
            throw HttpError(404, "Not found");
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
};

const deleteContact = async (req, res, next) => {
    try {
        const {contactId} = req.params;
        const result = await contacts.removeContactById(contactId);
        if (!result) {
            throw HttpError(404, "Not found");
        }

        res.json({message: "Delete success"});
    } catch (error) {
        next(error);
    }
};

module.exports = {putUpdateContact, deleteContact, postAddContact, getContacts, getListContacts}