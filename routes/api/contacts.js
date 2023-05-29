const express = require('express')
const Joi = require("joi");

const contacts = require('../../models/contacts.js');
const  HttpError  = require("../../helpers/httpError");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});


const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (result) {
      res.status(200).json(result);
    } else {
      throw HttpError(404, `Not found`);
    }
    res.json(result)
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if(error) {
      throw HttpError(400, `Missing required field: ${error.message}`)
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contacts.removeContact(contactId)
    if(!result) {
      throw HttpError(404, 'Not found');
    } else {
      res.json({
        message: "Delete success",
      });
    }
  } catch(error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, `missing fields: ${error.message}`);
    }
    const {contactId} = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

module.exports = router
