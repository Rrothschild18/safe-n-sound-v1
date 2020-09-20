import {
  default as getArtist,
  getArtistRelated,
  getArtistAlbums,
  getArtistToptracks,
} from "./artists";

export default async function artist_request(ARTIST_ID, OLD) {
  return new Promise((response, reject) => {
    try {
      const Artist = getArtist(ARTIST_ID);
      const ArtistRelated = getArtistRelated(ARTIST_ID);
      const ArtistAlbums = getArtistAlbums(ARTIST_ID);
      const ArtistToptracks = getArtistToptracks(ARTIST_ID);

      Promise.all([
        Artist,
        ArtistRelated,
        ArtistAlbums,
        ArtistToptracks,
      ]).then(() => response());
    } catch (error) {
      reject(error);
    }
  });
}

export function load_smoothly() {
  const e = document.querySelector(".Loading");
  e.classList.toggle("hide");
}
/*Return Music duration_ms to Min:Sec export */
export function timing(ms) {
  ms = 1000 * Math.round(ms / 1000); // round to nearest second
  var final;
  var d = new Date(ms);

  d.getUTCSeconds() < 10
    ? (final = d.getUTCMinutes() + ":0" + d.getUTCSeconds())
    : (final = d.getUTCMinutes() + ":" + d.getUTCSeconds());
  return final;
}
//Recieve a List of songs
export function checkList(l) {
  if (l.childNodes.length > 3)
    while (l.childNodes.length > 3) l.removeChild(l.lastChild);
}
//Fill a list of Songs
export function fillList(musicas) {
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
