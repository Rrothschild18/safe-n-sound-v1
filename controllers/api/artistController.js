const Artists = require("../../models/api/Artist");
const artist = new Artists();

exports.showData = (req, res) => {
  res.json(artist.showData());
};

exports.showValue = (req, res) => {
  res.json(artist.showValue(req.params));
};

exports.getArtist = async (req, res) => {
  const ID = req.params.id;
  const TOKEN = await artist.tokenRequest();

  artist
    .getArtist(TOKEN, ID)
    .then((response) => res.json(response.data))
    .catch((e) => res.status(400).json(e));
};

exports.getArtistTop = async (req, res) => {
  const ID = req.params.id;
  const TOKEN = await artist.tokenRequest();

  artist
    .getArtistTop(TOKEN, ID)
    .then((response) => res.json(response.data))
    .catch((e) => res.status(400).json(e));
};

exports.getArtistAlbum = async (req, res) => {
  const ID = req.params.id;
  const TOKEN = await artist.tokenRequest();

  artist
    .getArtistAlbum(TOKEN, ID)
    .then((response) => res.json(response.data))
    .catch((e) => res.status(400).json(e));
};

exports.getArtistRelated = async (req, res) => {
  const ID = req.params.id;
  const TOKEN = await artist.tokenRequest();

  artist
    .getArtistRelated(TOKEN, ID)
    .then((response) => res.json(response.data))
    .catch((e) => res.status(400).json(e));
};
