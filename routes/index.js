const express = require("express");

const user = require("./user");
const circus = require("./circus");
const event = require("./event");
const history = require("./history");

const router = express.Router();

router.use("/user", user);
router.use("/circus", circus);
router.use("/event", event);
router.use("/history", history);

module.exports = router;
