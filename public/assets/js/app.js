var button_songs = document.querySelector("#songs").addEventListener("click", () => {
	var e = document.querySelector("#musicas");
	var b = event.target;
	b.style.transform = "rotate(90deg)";

	if (e.classList.contains("hide")) {
		e.classList.remove("hide");
	} else {
		e.classList.add("hide");
		b.style.transform = "rotate(270deg)";
	}
});
