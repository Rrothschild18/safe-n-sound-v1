var express = require("express");
var router = express.Router();
// TWING
const { TwingEnvironment, TwingLoaderFilesystem } = require("twing");
let loader = new TwingLoaderFilesystem("./views");
let twing = new TwingEnvironment(loader);

/* GET home page. */
router.get("/", function (req, res, next) {
	twing.render("index.twig", { }).then((output) => {
		res.end(output);
	});
});

module.exports = router;
