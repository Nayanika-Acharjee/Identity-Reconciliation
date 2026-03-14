const express = require("express");
const { identifyContact } = require("../controllers/identifyControllers");

const router = express.Router();

router.post("/", identifyContact);

module.exports = router;