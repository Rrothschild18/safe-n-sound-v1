
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

