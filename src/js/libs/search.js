var querystring = require("querystring");


const credrentils = require("./credentials.js");
const axios = require("axios").default;
function load_smoothly(e) {
	if (e.classList.contains("hide")) {
		e.classList.remove("hide");
	} else {
		e.classList.add("hide");
	}
}
async function all_request(ALBUM_ID) {

	console.log('teste')
	try {
		const data = await fetch(`http://localhost/api/album/${ALBUM_ID}`)

		data.then(console.log('hello'))
	}catch(e) {
		console.log(e)
	}
	// axios.get(`http://localhost/api/album/${ALBUM_ID}`).then(console.log(1))

	// 	axios
	// 		.request(config_request)
	// 		.then((resolve) => {
	// 			//var button = document.querySelector('#btn');
	// 			var albumPhoto = document.querySelector("#album-img");
	// 			var artist = document.querySelector("#artist");
	// 			var albumType = document.querySelector("#album-type");
	// 			var albumName = document.querySelector("#album-name");
	// 			var albumRelease = document.querySelector("#album-release");

	// 			const data = resolve.data;

	// 			albumPhoto.src = data.images[1].url;
	// 			artist.textContent = data.artists[0].name;
	// 			albumType.textContent = data.album_type;
	// 			albumName.textContent = data.name;
	// 			albumRelease.textContent = data.release_date;

	// 			var e = document.querySelector(".Loading");
	// 			load_smoothly(e);

	// 			var e = document.querySelector(".result");

	// 			if (e.classList.contains("hide")) {
	// 				load_smoothly(e);
	// 			} else {
	// 			}

	// 			return data.tracks.items;
	// 		})
	// 		.then((musicas) => {
	// 			var list = document.querySelector("#musicas");
	// 			console.log(musicas);
	// 			var e = document.querySelector("#result-request");

	// 			if (list.classList.contains("hide") == true) {
	// 			} else {
	// 				if ((ALBUM_ID = !""))
	// 					if (list.getElementsByTagName("li").length > 3)
	// 						while (list.childNodes.length > 3) list.removeChild(list.lastChild);
	// 			}

	// 			cont = 0;

	// 			musicas.forEach((e) => {
	// 				var list_item = list.firstElementChild.cloneNode(true);

	// 				list_item.querySelector(".pos").textContent = ++cont;
	// 				list_item.querySelector("#title").textContent = e.name;
	// 				list_item.querySelector(".time").textContent = timing(e.duration_ms);

	// 				list.appendChild(list_item);
	// 			});
	// 		})
	// 		.catch((error) => {
	// 			var e = document.querySelector(".Loading");
	// 			load_smoothly(e);

	// 			setTimeout(() => {
	// 				var ALBUM_ID = document.querySelector("#album").value;
	// 				var msgg = `Não foi possivel buscar o album pelo id : `;
	// 				var msg = document.createTextNode(msgg);
	// 				var span = document.createElement("span");
	// 				var x = document.querySelector("#msg");

	// 				if (x.textContent || x.innerHTML) {
	// 					x.textContent = msgg;
	// 					span.append(ALBUM_ID);
	// 					x.append(span);
	// 				} else {
	// 					x.appendChild(msg);
	// 					span.append(ALBUM_ID);
	// 					x.append(span);
	// 				}
	// 			}, 500);
	// 			console.log(error);
	// 		});
	// });
}

/*Return Music duration_ms to Min:Sec */
function timing(ms) {
	ms = 1000 * Math.round(ms / 1000); // round to nearest second

	var d = new Date(ms);
	var final = d.getUTCMinutes() + ":" + d.getUTCSeconds();

	//console.log(final);

	return final;
}

/*
APPLICATION -> Request Access Token
    client_id: string;
    client_secret: string;
    
    REQUEST BODY PARAMETER	VALUE
        grant_type       client_credential
    
    encoded in application/x-www-form-urlencoded
  
  
SPOTIFY ACCOUNTS SERVICES -> 
    Return access_token

FINAL USER -> 
    Requests to endpoits with token
*/
async function tokenRequest() {
	var x = credrentils();

	const config = {
		method: "post",
		url: "https://accounts.spotify.com/api/token",
		headers: {
			Authorization:
				"Basic " + new Buffer(x.client_id + ":" + x.client_secret).toString("base64"),
		},
		data: querystring.stringify({ grant_type: "client_credentials" }),
	};

	try {
		var res = await axios.request(config);
	} catch (err) {
		console.log(err);
	}

	return res;
}
