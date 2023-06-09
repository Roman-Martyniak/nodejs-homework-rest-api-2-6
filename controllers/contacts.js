const HttpError = require("../helpers/HttpError");
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
        const { name, email, phone } = req.body;
        const contact = await contacts.addContact({ name, email, phone });
        res.status(201).json(contact);
};

const putUpdateContact = async (req, res) => {
        const { name, email, phone } = req.body;
        const { contactId } = req.params;
        const result = await contacts.updateContactById(contactId, { name, email, phone });
        if (!result) {
                throw new HttpError(404, "Not found");
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
        getListContacts: ctrlWrapper(getListContacts),
};