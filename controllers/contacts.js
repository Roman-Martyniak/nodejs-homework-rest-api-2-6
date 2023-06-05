const HttpError = require("../helpers/HttpError");
const addSchema = require("../schemas/schema");
const contacts = require("../models/contacts");
const {ctrlWrapper} = require("../helpers");

const getListContacts = async (req, res) => {
        const result = await contacts.listContacts();
        res.json(result);
};

const getContacts = async (req, res) => {
        const {contactId} = req.params;
        const result = await contacts.getContactById(contactId);
        if (!result) {
                throw HttpError(404, "Not found");
        }
        res.json(result);

};

const postAddContact = async (req, res) => {
        const {error} = addSchema.validate(req.body);
        if (error) {
                throw HttpError(400, "missing required name field");
        }
        const result = await contacts.addContact(req.body);
        res.status(201).json(result);
};

const putUpdateContact = async (req, res) => {
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
};

const deleteContact = async (req, res) => {
        const {contactId} = req.params;
        const result = await contacts.removeContactById(contactId);
        if (!result) {
                throw HttpError(404, "Not found");
        }
        res.json({message: "Delete success"});
};

module.exports = {
        putUpdateContact: ctrlWrapper(putUpdateContact),
        deleteContact: ctrlWrapper(deleteContact),
        postAddContact: ctrlWrapper(postAddContact),
        getContacts: ctrlWrapper(getContacts),
        getListContacts: ctrlWrapper(getListContacts)
}