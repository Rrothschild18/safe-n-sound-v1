var express = require("express");
var router = express.Router();
// TWING
const { TwingEnvironment, TwingLoaderFilesystem } = require("twing");
let loader = new TwingLoaderFilesystem("./views");
let twing = new TwingEnvironment(loader);

/* GET home page. */
router.get("/", function (req, res, next) {
<<<<<<< HEAD
	twing.render("index.twig", { }).then((output) => {
=======
	twing.render("index.twig", {}).then((output) => {
>>>>>>> 861e47d23c11cd6c0c31d07f797859cb7ad33ea7
		res.end(output);
	});
});

module.exports = router;
