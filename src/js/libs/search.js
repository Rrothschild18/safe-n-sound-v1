// var querystring = require("querystring");


// const credrentils = require("./credentials.js");
// const axios = require("axios").default;
function load_smoothly(){ 
	const e = document.querySelector(".Loading");
	e.classList.toggle('hide')
}
async function all_request(ALBUM_ID, OLD) {
	load_smoothly();
	await fetch(`http://localhost:3000/api/album/${ALBUM_ID}`)
	.then((res) => {
		try {
			return res.json()
		}catch (e) {
			return e;
		}
	})
	.then((data)=> {
		const albumPhoto = document.querySelector("#album-img"),
				artist = document.querySelector("#artist"),
				albumType = document.querySelector("#album-type"),
				albumName = document.querySelector("#album-name"),
				albumRelease = document.querySelector("#album-release"),
				result = document.querySelector("#result-request");

		load_smoothly()
		
		albumPhoto.src = data.images[1].url;
		artist.textContent = data.artists[0].name;
		albumType.textContent = data.album_type;
		albumName.textContent = data.name;
		albumRelease.textContent = data.release_date;
		
		result.classList.toggle('hide')

		if(result.classList.contains('hide'))
			result.classList.toggle('hide')
		
		return data.tracks.items;	
	})
	.then((musicas)=> {
		const list = document.querySelector("#musicas");
		const songs = document.querySelector("#songs");	 
		const e = document.querySelector("#result-request");

		songs.addEventListener('click', (e) => {
			const btn = e.target;

			if(list.classList.contains('hide'))
				btn.style.transform = "rotate(90deg)";
			if(!list.classList.contains('hide'))
				btn.style.transform = "rotate(270deg)";
			
			list.classList.toggle("hide");
		})

		if (!list.classList.contains("hide")) {
			if ((ALBUM_ID = !""))
				if (list.getElementsByTagName("li").length > 3)
					while (list.childNodes.length > 3) list.removeChild(list.lastChild);
		}

		let cont = 0;

		musicas.forEach((e) => {
			let list_item = list.firstElementChild.cloneNode(true);
			list_item.querySelector(".pos").textContent = ++cont;
			list_item.querySelector("#title").textContent = e.name;
			list_item.querySelector(".time").textContent = timing(e.duration_ms);

			list.appendChild(list_item);
		});
		
	})
	.catch((error) => {
		setTimeout(() => {
			var ALBUM_ID = document.querySelector("#album").value;
			var msgg = `Não foi possivel buscar o album pelo id : `;
			var msg = document.createTextNode(msgg);
			var span = document.createElement("span");
			var x = document.querySelector("#msg");

			if (x.textContent || x.innerHTML) {
				x.textContent = msgg;
				span.append(ALBUM_ID);
				x.append(span);
			} else {
				x.appendChild(msg);
				span.append(ALBUM_ID);
				x.append(span);
			}

		}, 500);
		console.log(error);
	});
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
