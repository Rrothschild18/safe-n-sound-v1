const express = require("express");
const router = express.Router();
const Album = require('../controllers/albumController')

/* GET users listing. */
router.get("/", Album.renderView);

// router.post("/", [sToken.verifyAlbum, sToken.tokenRequest, sToken.getAlbum]);

module.exports = router;

