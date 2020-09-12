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
			load_smoothly();
			return e;
		}
	})
	.then((data)=> {
		const albumPhoto    = document.querySelector("#album-img"),
			  artist 	    = document.querySelector("#artist"),
			  albumType     = document.querySelector("#album-type"),
			  albumName     = document.querySelector("#album-name"),
			  albumRelease  = document.querySelector("#album-release"),
			  result        = document.querySelector("#result-request");

		//Display Loading Animation
		load_smoothly()
		//Display Sucess Message
		showSucces()
		

		albumPhoto.src = data.images[1].url;
		artist.textContent = data.artists[0].name;
		albumType.textContent = data.album_type;
		albumName.textContent = data.name;
		albumRelease.textContent = data.release_date;

		
		if(result.classList.contains('hide'))
			result.classList.toggle('hide')
		
		return data.tracks.items;	
	})
	.then((musicas)=> {
		const list = document.querySelector("#musicas");
		const songs = document.querySelector("#songs");	

		songs.addEventListener('click', showHideSongs)

		//Romove Childs if filled
		checkList(list)
		//Fill musicas 
		fillList(musicas)		
	})
	.catch((error) => {
		console.log(error);
		let msg = `Not was possible to find an album with ${ALBUM_ID}`
		showError(msg)
	});
}

/*Return Music duration_ms to Min:Sec */
function timing(ms) {
	ms = 1000 * Math.round(ms / 1000); // round to nearest second
	var final;
	var d = new Date(ms);

	d.getUTCSeconds() < 10
		? (final = d.getUTCMinutes() + ":0" + d.getUTCSeconds())
		: (final = d.getUTCMinutes() + ":" + d.getUTCSeconds());
	return final;
}
//Recieve a List of songs
function checkList(l){

	if(l.childNodes.length > 3)
		while (l.childNodes.length > 3) 
			l.removeChild(l.lastChild);
	
}
//Fill a list of Songs
function fillList(musicas){
	const list = document.querySelector("#musicas");

	let cont = 0;

	musicas.forEach((m) => {
		let list_item = list.firstElementChild.cloneNode(true);
		list_item.querySelector(".pos").textContent = ++cont;
		list_item.querySelector("#title").textContent = m.name;
		list_item.querySelector(".time").textContent = timing(m.duration_ms);

		list.appendChild(list_item);
	});
	
}
function showHideSongs(e){
	const list = document.querySelector("#musicas");
	const btn = e.target;
	console.log(e)

	if(list.classList.contains('hide'))
		btn.style.transform = "rotate(90deg)";
	else {
		btn.style.transform = "rotate(270deg)";
	}
	
	list.classList.toggle("hide");

}