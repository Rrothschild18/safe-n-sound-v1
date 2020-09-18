import Label from "./animations/label.js";
import Swap from "./animations/swap.js";
import Submit from "./functions/Submit.js";

try {
  const SwapCards = new Swap(".Suported .Card");
  SwapCards.init();
} catch (e) {
  console.log(e);
}

try {
  const myForm = document.querySelector("#test");
  const label = new Label(myForm).init();
  const submitAlbum = new Submit(myForm, {
    fields: {
      userName: {
        notEmpty: {
          message: "The username is required",
        },
        stringLength: {
          min: 6,
          max: 30,
          message:
            "The username must be more than 6 and less than 30 characters long",
        },
        regexp: {
          regexp: /^[a-zA-Z0-9_]+$/,
          message:
            "The username can only consist of alphabetical, number and underscore",
        },
      },
      userEmail: {
        notEmpty: {
          message: "The E-mail is required",
        },
        regexp: {
          regexp: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          message: "Please enter a valid E-mail",
        },
      },
      userAge: {
        notEmpty: {
          message: "The Age is required",
        },
        inputBetween: {
          message: "Age must be between 10 - 20",
          min: 10,
          max: 20,
        },
      },
      userSpec: {
        notEmpty: {
          message: "The Specility is required",
        },
      },
      albumID: {
        notEmpty: {
          message: "The AlbumID is required",
        },
        stringLength: {
          min: 6,
          max: 30,
          message:
            "The username must be more than 6 and less than 30 characters long",
        },
        regexp: {
          regexp: /^[a-zA-Z0-9_]+$/,
          message:
            "The username can only consist of alphabetical, number and underscore",
        },
      },
    },
  });

  let albumValidData = {};

  myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (submitAlbum.validForm()) {
      albumValidData = submitAlbum.getData();
      console.log(albumValidData);
    }
    if (!submitAlbum.validForm()) {
      e.preventDefault();
    }
  });
} catch (e) {
  console.log(e);
}
