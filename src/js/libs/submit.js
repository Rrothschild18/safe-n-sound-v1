try {
	var OLD_ALBUM_ID = "";
	const form = document.querySelector('.Form');
	
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const ALBUM_ID = form.querySelector("#album").value;
		
		if (ALBUM_ID.length == 0) {
			console.log('Tamanho 0')
		}
		if (!(OLD_ALBUM_ID == ALBUM_ID)) {
			console.log(ALBUM_ID);
	
			all_request(ALBUM_ID, OLD_ALBUM_ID)
		}
		
		if (OLD_ALBUM_ID == ALBUM_ID) {
			console.log("Mesmo ID");
		}
		OLD_ALBUM_ID = ALBUM_ID;
	});

} catch(e) {
}