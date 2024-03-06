import { updateDropdown, updateImage } from "./display.js";

//Selecting elements within the HTML
let form = document.querySelector(".user-area__form");
let input = document.querySelector(".user-area__form__input");
let img = document.querySelector(".user-area__form__img");
let submit = document.querySelector(".user-area__form__btn-sub");

//Creating a variable to hold email and img pairs
let pairs = new Map();

//Fetching a random image from Unsplash
fetch("https://source.unsplash.com/random/300x200?sig=${Math.random()}")
  .then((response) => response.blob())
  .then((blob) => {
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      let base64data = reader.result;
      img.src = base64data;
    };
  });

//Pairing emails with images on button click
submit.addEventListener("click", function (e) {
  e.preventDefault();
  let email = input.value;
  let imgSrc = img.src;

  //Add some validation here or before declarations?
  pairs.set(email, imgSrc);
  updateDropdown();

  fetch("https://source.unsplash.com/random/300x200?sig=${Math.random()}")
    .then((response) => response.blob())
    .then((blob) => {
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        let base64data = reader.result;
        img.src = base64data;
      };
    });

  updateImage();
});

export { pairs };
