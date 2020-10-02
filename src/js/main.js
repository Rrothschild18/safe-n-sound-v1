import showHide from "./animations/toggle.js";
import Swap from "./animations/swap.js";
import Submit from "./functions/Submit.js";
import submit_Album from "./functions/searchAlbum.js";
import submit_Artist from "./functions/searchArtist.js";

try {
  const SwapCards = new Swap(".Suported .Card");
  SwapCards.init();
} catch (e) {
  console.log(e);
}

try {
  const myForm = document.querySelector("#album");
  const submitAlbum = new Submit(myForm, {
    fields: {
      album: {
        notEmpty: {
          message: "The album ID is required",
        },
        stringLength: {
          min: 15,
          max: 30,
          message:
            "The username must be more than 15 and less than 30 characters long",
        },
        regexp: {
          regexp: /^[a-zA-Z0-9]+$/,
          message: "The album ID can only consist of alphabetical and number",
        },
      },
    },
  });

  let albumValidData = {};

  myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    albumValidData = submitAlbum.getData();

    submit_Album(albumValidData.album, "");
  });
} catch (e) {
  console.log(e);
}

try {
  const btn = document.querySelector("#showR");
  btn.addEventListener("click", showHide);

  const myFormArtist = document.querySelector("#artist");
  const submitArtist = new Submit(myFormArtist, {
    fields: {
      artist: {
        notEmpty: {
          message: "The album ID is required",
        },
        stringLength: {
          min: 15,
          max: 30,
          message:
            "The username must be more than 15 and less than 30 characters long",
        },
        regexp: {
          regexp: /^[a-zA-Z0-9]+$/,
          message: "The album ID can only consist of alphabetical and number",
        },
      },
    },
  });

  let artistValidData = {};

  myFormArtist.addEventListener("submit", (e) => {
    e.preventDefault();
    artistValidData = submitArtist.getData();

    submit_Artist(artistValidData.artist, "")
      .then((response) => {
        response = Array.from(response).every(
          (res) => res.value instanceof Response
        );
        console.log(response);

        if (response) return Promise.reject(response);

        showSucces();
        load_smoothly();
      })
      .catch((e) => {
        let msg = `Was not possible to find yout album by ID: `;
        showError(msg);
        load_smoothly();
        console.log(e);
      });
  });
} catch (e) {
  console.log(e);
}

function load_smoothly() {
  const e = document.querySelector(".Loading");
  e.classList.toggle("hide");
}

function showResult() {
  let result = document.querySelector(".result");

  if (result.classList.contains("hide")) result.classList.toggle("hide");
}

const showError = (msg) => {
  const DIV = document.querySelector(".input");
  let message = document.querySelector("small");

  DIV.style.borderColor = "red";
  message.style.color = "red";
  message.innerText = "" + msg + "";
};

const showSucces = () => {
  const DIV = document.querySelector(".input");
  let message = document.querySelector("small");
  let msg = "Success xD";

  showResult();

  DIV.style.borderColor = "green";
  message.style.color = "green";
  message.innerText = msg;
};
