const express = require("express");
const router = express.Router();
const album = require('../../controllers/api/albumController')
const artist = require('../../controllers/api/artistController')

router.get("/", function (req, res, next) {
    const data = {
        msg: 'Restricted Area'
    }
	res.json(data);
});

//Album routes
router.get("/album", album.showData);
router.get("/album/:id", album.getAlbum);

//Artist routes
router.get("/artist", artist.showData);
router.get("/artist/:id", artist.getArtist);
router.get("/artist/:id/toptracks", artist.getArtistTop);
router.get("/artist/:id/artistalbum", artist.getArtistAlbum);
router.get("/artist/:id/artist-related", artist.getArtistRelated);
module.exports = router;