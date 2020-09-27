import {
  default as getArtist,
  getArtistRelated,
  getArtistAlbums,
  getArtistToptracks,
} from "./artists";

export default async function artist_request(ARTIST_ID, OLD) {
  const artist = getArtist(ARTIST_ID);
  const artistRelated = getArtistRelated(ARTIST_ID);
  const artistAlbums = getArtistAlbums(ARTIST_ID);
  const artistToptracks = getArtistToptracks(ARTIST_ID);

  load_smoothly();

  return Promise.allSettled([
    artist,
    artistRelated,
    artistAlbums,
    artistToptracks,
  ]);
}

export function load_smoothly() {
  const e = document.querySelector(".Loading");
  e.classList.toggle("hide");
}
//Animation to Songs
export function showHideSongs(e) {
  const list = document.querySelector("#musicas");
  const btn = e.target;
  console.log(e);

  if (list.classList.contains("hide")) btn.style.transform = "rotate(90deg)";
  else {
    btn.style.transform = "rotate(270deg)";
  }

  list.classList.toggle("hide");
}

export const showError = (msg) => {
  const DIV = document.querySelector(".input");
  let message = document.querySelector("small");

  DIV.style.borderColor = "red";
  message.style.color = "red";
  message.innerText = "" + msg + "";
};
export const showSucces = () => {
  const DIV = document.querySelector(".input");
  let message = document.querySelector("small");
  let msg = "Success xD";

  DIV.style.borderColor = "green";
  message.style.color = "green";
  message.innerText = msg;
};
