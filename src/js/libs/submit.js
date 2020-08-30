const form = document.querySelector("#submit");
var OLD_ALBUM_ID = "";

const submitAlbum = function () {
	form.addEventListener("submit", (e) => {
		var ALBUM_ID = form.querySelector("#album").value;
		console.log(ALBUM_ID);

		if (ALBUM_ID.length == 0)
			if (!(OLD_ALBUM_ID == ALBUM_ID)) {
				e.preventDefault();
				console.log(ALBUM_ID);
			}

		if (OLD_ALBUM_ID == ALBUM_ID) {
			e.preventDefault();
			console.log("Mesmo ID");
		}
	});
};

module.exports = submitAlbum;
