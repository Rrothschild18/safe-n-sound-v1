const querystring = require("querystring");
const axios = require("axios").default;
var mw = require("../middlewares/token.js");

// TWING
const { TwingEnvironment, TwingLoaderFilesystem } = require("twing");
let loader = new TwingLoaderFilesystem("./views");
let twing = new TwingEnvironment(loader);

async function tokenRequest(req, res, next) {
	var x = mw();
	const config = {
		method: "post",
		url: "https://accounts.spotify.com/api/token",
		headers: {
			Authorization:
				"Basic " + new Buffer.from(x.client_id + ":" + x.client_secret).toString("base64"),
		},
		data: querystring.stringify({ grant_type: "client_credentials" }),
	};

	try {
		var response = await axios.request(config);
		req.token = response.data;
	} catch (err) {
		console.log(err);
	}

	next();
}

function verifyAlbum(req, res, next) {
	var data = {};
	const album = req.body.album;
	console.log(req.body.album);

	if (!(album.length == 0)) next();

	if (album.length == 0) {
		data.msg = "Campo vazio";
		console.log(data);
		twing.render("album.twig", { data }).then((output) => {
			res.end(output);
		});
	}
}

async function getAlbum(req, res, next) {
	console.log(req.body.album, req.token.access_token);
	var data;

	const ALBUM_ID = req.body.album;
	const ACCESS_TOKEN = req.token.access_token;

	const config = {
		method: "get",
		url: "https://api.spotify.com/v1/albums/" + ALBUM_ID,
		headers: {
			Authorization: "Bearer " + ACCESS_TOKEN,
		},
	};

	try {
		var response = await axios.request(config);
		var data = response.data;
		var item = response.data.tracks.items;

		item.forEach((el) => {
			el.duration_ms = timing(el.duration_ms);
		});

		twing.render("album.twig", { data, item }).then((output) => {
			res.end(output);
		});
	} catch (e) {
		var data = {};
		data.msg = "Album nao encontrado";
		twing.render("album.twig", { data }).then((output) => {
			res.end(output);
		});
	}
}

function timing(ms) {
	ms = 1000 * Math.round(ms / 1000); // round to nearest second
	var final;
	var d = new Date(ms);

	d.getUTCSeconds() < 10
		? (final = d.getUTCMinutes() + ":0" + d.getUTCSeconds())
		: (final = d.getUTCMinutes() + ":" + d.getUTCSeconds());
	return final;
}

exports.tokenRequest = tokenRequest;
exports.verifyAlbum = verifyAlbum;
exports.getAlbum = getAlbum;
