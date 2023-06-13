const {Schema, model} = require('mongoose')
const handleMongooseError  = require("../helpers/handleMongooseError");
const Joi = require("joi");

const contactsSchema = new Schema({
  name: {
    type: String,
        required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
  default: false,
  },
},
    { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoritesSchema = Joi.object({ favorite: Joi.boolean().required() });

const schemas = {addSchema, updateFavoritesSchema}


contactsSchema.post("save", handleMongooseError);

const Contact = model('contacts', contactsSchema);

module.exports = {Contact, schemas}
