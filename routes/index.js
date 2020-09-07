const express = require("express");
const router = express.Router();
const Index = require('../controllers/indexController')
// TWING
const { TwingEnvironment, TwingLoaderFilesystem } = require("twing");
let loader = new TwingLoaderFilesystem("./views");
let twing = new TwingEnvironment(loader);

/* GET home page. */
router.get("/", Index.renderView);

module.exports = router;
