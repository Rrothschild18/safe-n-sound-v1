import submit_Artist from "./searchArtist.js";

/* GET ARTISTS OVERALL**/
export const getArtist = function (ARTIST_ID) {
  return fetch(`http://localhost:3000/api/artist/${ARTIST_ID}`)
    .then((response) => {
      try {
        if (!response.ok) return Promise.reject(response);
        return response.json();
      } catch (e) {
        load_smoothly();
        return e;
      }
    })
    .then((data) => {
      const section = document.querySelector("[data-target='overallResponse']");

      const type = section.querySelector("#artistType"),
        photo = section.querySelector("#artistPhoto"),
        name = section.querySelector("#artistName"),
        followers = section.querySelector("#artistFollowers"),
        pop = section.querySelector("#artistPop"),
        genres = section.querySelectorAll("#artistGenres li"),
        progress = section.querySelectorAll("#progress div");

      // Fill data
      photo.src = data.images[1].url;
      type.textContent =
        data.type.charAt(0).toUpperCase() + data.type.substring(1);
      name.textContent = data.name;
      followers.textContent = `${data.followers.total} Followers`;
      pop.textContent = `Popularity: ${data.popularity}`;

      //Fill poptularity Progress Bar
      (function () {
        let popularityLength = Math.floor(Number(data.popularity));
        progress.forEach((el) => el.classList.remove("fill"));

        for (let i = 1; i <= popularityLength / 10; i++) {
          progress[i - 1].classList.add("fill");
        }
      })();

      updateList(genres, data.genres);

      return data;
    })
    .catch((e) => e);
};

/* GET ARTISTS RELATED **/
export const getArtistRelated = function (ARTIST_ID) {
  return fetch(`http://localhost:3000/api/artist/${ARTIST_ID}/artist-related`)
    .then((response) => {
      try {
        if (!response.ok) return Promise.reject(response);
        return response.json();
      } catch (e) {
        return e;
      }
    })
    .then((data) => {
      updateRelatedList(data.artists);
      return data;
    })
    .catch((e) => e);
};

/* GET ARTISTS ALBUMS **/
export const getArtistAlbums = function (ARTIST_ID) {
  return fetch(`http://localhost:3000/api/artist/${ARTIST_ID}/artistalbum`)
    .then((response) => {
      if (!response.ok) return Promise.reject(response);
      return response.json();
    })
    .then((data) => {
      updateAlbumdList(data.items);
      return data;
    })
    .catch((e) => {
      return e;
    });
};

/* GET ARTISTS TOPTRACKS **/
export const getArtistToptracks = function (ARTIST_ID) {
  return fetch(`http://localhost:3000/api/artist/${ARTIST_ID}/toptracks`)
    .then((response) => {
      if (!response.ok) {
        console.log("hello");
        return Promise.reject(response);
      }
      return response.json();
    })
    .then((data) => {
      updateTrackList(data.tracks);
      return data;
    })
    .catch((e) => e);
};

/* POPULATE FUNCTIONS TO APPEND DATA **/

const updateList = function (item, data) {
  const clonedItem = item[0].cloneNode(true);
  const itemList = Array.from(item);
  const parent = item[0].parentNode;

  itemList.forEach((item) => {
    parent.removeChild(item);
  });

  data.forEach((dt) => {
    let li = clonedItem.cloneNode(true);
    li.textContent = dt;
    parent.appendChild(li);
  });
};

const updateTrackList = function (data) {
  //4o0pNHbyj36LPvukNqEug0
  const section = document.querySelector("[data-target='toptracksResponse']");
  const tracks = section.querySelectorAll("#track");

  const cloneTrack = tracks[0].cloneNode(true);
  const parent = tracks[0].parentNode;

  tracks.forEach((item) => {
    parent.removeChild(item);
  });

  data.forEach((track) => {
    let newTrack = cloneTrack.cloneNode(true),
      photo = newTrack.querySelector("#trackPhoto"),
      name = newTrack.querySelector("#trackName"),
      description = newTrack.querySelector("#trackDescription"),
      time = newTrack.querySelector("#duration");

    photo.src = track.album.images[1].url;
    name.textContent = track.name;
    description.textContent = track.album.name;
    time.textContent = timing(track.duration_ms);

    parent.appendChild(newTrack);
  });
};

const updateRelatedList = function (data) {
  //4o0pNHbyj36LPvukNqEug0
  const section = document.querySelector("[data-target='toptracksResponse']");
  const related = section.querySelectorAll("#related");

  const cloneRelated = related[0].cloneNode(true);
  const parent = related[0].parentNode;

  related.forEach((item) => {
    parent.removeChild(item);
  });

  data.forEach((relatedArtist) => {
    let newRelated = cloneRelated.cloneNode(true),
      photo = newRelated.querySelector("#relatedPhoto"),
      name = newRelated.querySelector("#relatedName");

    photo.src = relatedArtist.images[1].url;
    name.textContent = relatedArtist.name;
    newRelated.setAttribute("data-fetchid", relatedArtist.id);

    newRelated.addEventListener("click", (e) => {
      let id = e.target.closest("#related").getAttributeNode("data-fetchid")
        .value;
      submit_Artist(id);
    });

    parent.appendChild(newRelated);
  });
};

const updateAlbumdList = function (data) {
  //4o0pNHbyj36LPvukNqEug0
  const section = document.querySelector("[data-target='albunsResponse']");
  const album = section.querySelectorAll("#album");

  const cloneAlbum = album[0].cloneNode(true);
  const parent = album[0].parentNode;

  album.forEach((item) => {
    parent.removeChild(item);
  });

  data.forEach((album) => {
    let newAlbum = cloneAlbum.cloneNode(true),
      photo = newAlbum.querySelector("#albumPhoto"),
      name = newAlbum.querySelector("#albumName"),
      qnty = newAlbum.querySelector("#albumQnty"),
      year = newAlbum.querySelector("#albumYear");

    photo.src = album.images[0].url;
    name.textContent = album.name;
    qnty.textContent = `${album.total_tracks} Songs`;
    year.textContent = album.release_date.substring(0, 4);

    parent.appendChild(newAlbum);
  });
};

/*Return Music duration_ms to Min:Sec export */
const timing = function (ms) {
  ms = 1000 * Math.round(ms / 1000); // round to nearest second
  var final;
  var d = new Date(ms);

  d.getUTCSeconds() < 10
    ? (final = d.getUTCMinutes() + ":0" + d.getUTCSeconds())
    : (final = d.getUTCMinutes() + ":" + d.getUTCSeconds());
  return final;
};

exports.default = getArtist;
exports.getArtistRelated = getArtistRelated;
exports.getArtistAlbums = getArtistAlbums;
exports.getArtistToptracks = getArtistToptracks;
