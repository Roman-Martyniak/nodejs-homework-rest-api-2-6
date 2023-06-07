const express = require('express')
const ctrl = require("../../controllers/contacts");
const router = express.Router()

const ctrlWrapper = require('../../helpers/ctrlWrapper')
const validateEmptyBody = require('../../middlewares/validateEmptyBody')
const validateBody = require('../../middlewares/validateBody');
const schema = require('../../schemas/schema')

router.get("/", ctrl.getListContacts);

router.get("/:contactId", ctrl.getContacts);

router.post("/",validateEmptyBody, validateBody(schema), ctrlWrapper(ctrl.postAddContact));

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId",validateEmptyBody, validateBody(schema), ctrlWrapper(ctrl.putUpdateContact));

module.exports = router;
