/* GET ARTISTS OVERALL**/
export const getArtist = function (ARTIST_ID) {
  return fetch(`http://localhost:3000/api/artist/${ARTIST_ID}`)
    .then((response) => {
      try {
        return response.json();
      } catch (e) {
        //   load_smoothly();
        return e;
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((e) => {
      console.log(e);
    });
};

/* GET ARTISTS RELATED **/
export const getArtistRelated = function (ARTIST_ID) {
  return fetch(`http://localhost:3000/api/artist/${ARTIST_ID}/artist-related`)
    .then((response) => {
      try {
        return response.json();
      } catch (e) {
        return e;
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((e) => {
      reject();
    });
};

/* GET ARTISTS ALBUMS **/
export const getArtistAlbums = function (ARTIST_ID) {
  return fetch(`http://localhost:3000/api/artist/${ARTIST_ID}/artistalbum`)
    .then((response) => {
      try {
        return response.json();
      } catch (e) {
        return e;
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((e) => {});
};

/* GET ARTISTS TOPTRACKS **/
export const getArtistToptracks = function (ARTIST_ID) {
  return fetch(`http://localhost:3000/api/artist/${ARTIST_ID}/toptracks`)
    .then((response) => {
      try {
        return response.json();
      } catch (e) {
        console.log(e);
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.default = getArtist;
exports.getArtistRelated = getArtistRelated;
exports.getArtistAlbums = getArtistAlbums;
exports.getArtistToptracks = getArtistToptracks;
