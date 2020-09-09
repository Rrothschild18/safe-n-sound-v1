const express = require("express");
const router = express.Router();
const Artist = require('../controllers/artistController')

router.get("/", Artist.renderView);

module.exports = router;