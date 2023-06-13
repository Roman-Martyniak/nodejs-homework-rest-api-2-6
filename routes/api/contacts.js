const express = require('express')
const ctrl = require("../../controllers/contacts");
const router = express.Router()

const { validateEmptyBody, validateBody, isValidId } = require("../../middlewares");
const {schemas} = require('../../models/contacts')


router.get("/", ctrl.getListContacts);

router.get("/:contactId",isValidId, ctrl.getContacts);

router.post("/",validateEmptyBody, validateBody(schemas.addSchema), ctrl.postAddContact);

router.delete("/:contactId",isValidId, ctrl.deleteContact);

router.put("/:contactId", isValidId, validateEmptyBody, validateBody(schemas.addSchema), ctrl.putUpdateContact);

router.patch("/:contactId/favorite", isValidId, validateBody(schemas.updateFavoritesSchema), ctrl.updateStatusContact);

module.exports = router;