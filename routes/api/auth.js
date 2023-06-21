const express = require("express");
const ctrl = require("../../controllers/auth");
const {
    validateBody,
    authenticate,
    isValidUserId,
} = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current",isValidUserId, authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
    "/:userId/subscription",
    authenticate,
    isValidUserId,
    validateBody(schemas.updateSubscriptionSchema),
    ctrl.updateSubscriptionUser
);

module.exports = router;