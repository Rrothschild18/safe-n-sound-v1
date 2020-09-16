class submitAlbum extends Submit {
	constructor(id) {
		this.id = id;
		// this.search = new Search();
	}

}
submitAlbum.prototype.init = function (){
    this.form.addEventListener("submit", (e) => {
		e.preventDefault();
		let ALBUM_ID = form.querySelector("#album").value;
		ALBUM_ID = ALBUM_ID.replace(/\W/gi, '')
		
		console.log(ALBUM_ID)
		if(this.verifyData(ALBUM_ID, OLD_ALBUM_ID)) 
            // all_request(ALBUM_ID, OLD_ALBUM_ID)

		OLD_ALBUM_ID = ALBUM_ID;
	});
}

/*Return Music duration_ms to Min:Sec */
submitAlbum.prototype.timing = function (ms) {
	ms = 1000 * Math.round(ms / 1000); // round to nearest second
	var final;
	var d = new Date(ms);

	d.getUTCSeconds() < 10
		? (final = d.getUTCMinutes() + ":0" + d.getUTCSeconds())
		: (final = d.getUTCMinutes() + ":" + d.getUTCSeconds());
	return final;
}
//Recieve a List of songs
submitAlbum.prototype.checkList = function (l){

	if(l.childNodes.length > 3)
		while (l.childNodes.length > 3) 
			l.removeChild(l.lastChild);
	
}
//Fill a list of Songs
submitAlbum.prototype.fillList = function (musicas){
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
//Animation to Songs
submitAlbum.prototype.showHideSongs = function(e){
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












const showError = (msg) => {
	const DIV = document.querySelector(".input")
	let message = document.querySelector("#msg");

	DIV.style.borderColor = 'red';
	message.style.color = 'red';
	message.innerText = ''+ msg + '';

}
const showSucces = () => {
	const DIV = document.querySelector(".input")
	let message = document.querySelector("#msg");
	let msg = 'Success xD'

	DIV.style.borderColor = 'green';
	message.style.color = 'green';
	message.innerText = msg;
}

try {
	const form = document.querySelector('.Form');
	let OLD_ALBUM_ID = "";
	
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		let ALBUM_ID = form.querySelector("#album").value;
		ALBUM_ID = ALBUM_ID.replace(/\W/gi, '')
		
		console.log(ALBUM_ID)
		if(verifyData(ALBUM_ID, OLD_ALBUM_ID)) 
			all_request(ALBUM_ID, OLD_ALBUM_ID)

		OLD_ALBUM_ID = ALBUM_ID;
	});

} catch(e) {
	console.log(e)
}

const verifyData = (ALBUM_ID, OLD_ALBUM_ID)=> {
	
	if(ALBUM_ID.length == 0)
		return false;
	if(ALBUM_ID == OLD_ALBUM_ID)
		return false;
	
	return true;
}