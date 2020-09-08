var musicsList = document.querySelector("#musicas");

function btn_Songs() {
	const button_songs = document.querySelector("#songs");

	button_songs.addEventListener("click", () => {
		var b = event.target;
		b.style.transform = "rotate(90deg)";

		musicsList.toggle("hide");
		b.style.transform = "rotate(270deg)";
	});
}
