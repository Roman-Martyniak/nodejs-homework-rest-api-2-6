const express = require('express')
const ctrl = require("../../controllers/contacts");
const router = express.Router()

const ctrlWrapper = require('../../helpers/ctrlWrapper')
const validateEmptyBody = require('../../middlewares/validateEmptyBody')
const validateBody = require('../../middlewares/validateBody');
const authenticate = require('../../middlewares/authenticate')
const isValidId = require('../../middlewares/isValidId')
const schemas = require('../../schemas/contacts')

const validateMiddleware = validateBody(schemas.addSchema);

router.use(authenticate);

router.get("/", ctrl.getListContacts);

router.get("/:id", ctrl.getContacts);

router.post("/", validateMiddleware, ctrlWrapper(ctrl.postAddContact));

router.delete("/:id", isValidId, ctrl.deleteContact);

router.put("/:id", isValidId, validateEmptyBody, validateMiddleware, ctrlWrapper(ctrl.putUpdateContact));

module.exports = router;
