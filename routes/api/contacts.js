const express = require('express')
const ctrl = require("../../controllers/contacts");
const router = express.Router()

router.get("/", ctrl.getListContacts);

router.get("/:contactId", ctrl.getContacts);

router.post("/", ctrl.postAddContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", ctrl.putUpdateContact);

module.exports = router;
