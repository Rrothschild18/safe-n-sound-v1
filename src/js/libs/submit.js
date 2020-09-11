
const showError = (msg) => {
	const ALBUM_ID = document.querySelector("#album")
	let message = document.querySelector("#msg");

	ALBUM_ID.style.borderColor = 'red';
	message.style.color = 'red';
	message.innerText = ''+ msg + '';

}
const showSucces = () => {
	const ALBUM_ID = document.querySelector("#album")
	let message = document.querySelector("#msg");
	let msg = 'Success xD'

	ALBUM_ID.style.borderColor = 'green';
	message.style.color = 'green';
	message.innerText = msg;
}

try {
	const form = document.querySelector('.Form');
	let OLD_ALBUM_ID = "";
	
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const ALBUM_ID = form.querySelector("#album").value;
		
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

