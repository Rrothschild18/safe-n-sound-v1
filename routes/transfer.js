const express = require("express");
const router = express.Router();
const Transfer = require('../controllers/transferController')
// TWING
const { TwingEnvironment, TwingLoaderFilesystem } = require("twing");
let loader = new TwingLoaderFilesystem("./views");
let twing = new TwingEnvironment(loader);

/* GET home page. */
router.get("/", Transfer.renderView);

module.exports = router;