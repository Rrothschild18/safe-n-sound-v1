const express = require("express");
const router = express.Router();
var sToken = require("../middlewares/spotify.js");

// TWING
const { TwingEnvironment, TwingLoaderFilesystem } = require("twing");
let loader = new TwingLoaderFilesystem("./views");
let twing = new TwingEnvironment(loader);

/* GET users listing. */
router.get("/", function (req, res, next) {
	twing.render("album.twig", req.params).then((output) => {
		res.end(output);
	});
});

router.post("/", [sToken.verifyAlbum, sToken.tokenRequest, sToken.getAlbum]);

module.exports = router;
