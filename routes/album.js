const express = require("express");
const router = express.Router();
var sToken = require("../models/spotify.js");
const Album = require('../controllers/albumController')


// TWING
const { TwingEnvironment, TwingLoaderFilesystem } = require("twing");
let loader = new TwingLoaderFilesystem("./views");
let twing = new TwingEnvironment(loader);

/* GET users listing. */
router.get("/", Album.renderView);

router.post("/", [sToken.verifyAlbum, sToken.tokenRequest, sToken.getAlbum]);

module.exports = router;

