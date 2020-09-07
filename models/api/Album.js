const querystring = require("querystring");
const axios = require("axios").default;
const mw = require('../token.js');
const { throws } = require("assert");

const Album = function() {
    this.data;
    this.error;
}

Album.prototype.validUserInput = function(param) {
    if(param.length == 0) {
        error.msg = "Campo vazio";
        return false;
    }else {
		return true;
	}
}

Album.prototype.showData = function() {
    const data = {
        name: 'Raul',
        age: 22,
        hobby: 'Programming'
    }
	return data;
}

Album.prototype.getAlbum = async function(TOKEN, ID) {
	const ALBUM_ID = ID;
    const ACCESS_TOKEN = TOKEN;
    
	const config = {
		method: "get",
		url: "https://api.spotify.com/v1/albums/" + ALBUM_ID,
		headers: {
			Authorization: "Bearer " + ACCESS_TOKEN,
		},
	};

	try {
		var response = await axios.request(config);
		data = response.data;
		// var item = response.data.tracks.items;

		// item.forEach((el) => {
		// 	el.duration_ms = timing(el.duration_ms);
		// });

        return data;
	} catch (e) {
		delete e.config
		delete e.stack;
        return e;
	}
}

Album.prototype.tokenRequest = async function(param) {

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
        // req.token = response.data;
		// this.getAlbum(response.data.access_token, param)
		return response.data.access_token;
	} catch (err) {
        console.log(err);
        // error = err;
        return err;
	}
}

module.exports = Album;