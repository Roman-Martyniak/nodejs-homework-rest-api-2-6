const express = require('express')
const ctrl = require("../../controllers/contacts");
const router = express.Router()

const validateBody = require('../../middlewares/validateBody');
const addSchema = require('../../schemas/schema')

router.get("/", ctrl.getListContacts);

router.get("/:contactId", ctrl.getContacts);

router.post("/", validateBody(addSchema), ctrl.postAddContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", validateBody(addSchema), ctrl.putUpdateContact);

module.exports = router;
