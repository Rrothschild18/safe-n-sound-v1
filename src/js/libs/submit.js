const form = document.querySelector('.Form');
const button_form = document.querySelectorAll('button')
var OLD_ALBUM_ID = "";


form.addEventListener("submit", (e) => {
	e.preventDefault();
	const ALBUM_ID = form.querySelector("#album").value;
	
	if (ALBUM_ID.length == 0) {
		console.log('Tamanho 0')
	}
	if (!(OLD_ALBUM_ID == ALBUM_ID)) {
		console.log(ALBUM_ID);

		all_request(ALBUM_ID)
	}
	
	if (OLD_ALBUM_ID == ALBUM_ID) {
		console.log("Mesmo ID");
	}
});

// form.addEventListener("submit", (e) => {
// 	console.log('hey')
// 	e.preventDefault();
// });

