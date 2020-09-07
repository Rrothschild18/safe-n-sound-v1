const express = require("express");
const router = express.Router();
const album = require('../../controllers/api/albumController')

router.get("/", function (req, res, next) {
    const data = {
        msg: 'Restricted Area'
    }
	res.json(data);
});

router.get("/album", album.showData);
router.get("/album/:id", album.getAlbum);
module.exports = router;