import { updateDropdown, updateImage, dropdown } from "./display.js";

//Selecting elements within the HTML
let form = document.querySelector(".user-area__form");
let input = document.querySelector(".user-area__form__input");
let img = document.querySelector(".user-area__form__img");
let subBtn = document.querySelector(".user-area__form__btn-sub");
let newBtn = document.querySelector(".user-area__form__btn-new");
let addBtn = document.querySelector(".user-area__form__btn-add");
let error = document.querySelector(".user-area__form__error");

//Creating a variable to hold email and img pairs
let pairs = new Map();

//Fetching a random image from Unsplash
// fetch("https://source.unsplash.com/random/300x200?sig=${Math.random()}")
//   .then((response) => response.blob())
//   .then((blob) => {
//     let reader = new FileReader();
//     reader.readAsDataURL(blob);
//     reader.onloadend = function () {
//       let base64data = reader.result;
//       img.src = base64data;
//     };
//   });

//Pairing emails with images on button click
subBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  //Validaiton
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (input.value === "") {
    error.classList.add("show");
    error.innerHTML = "Please enter an email address";
    setTimeout(() => {
      error.classList.remove("show");
    }, 5000);
    return;
  } else if (!emailRegex.test(input.value)) {
    error.classList.add("show");
    error.innerHTML = "Please enter a valid email address";
    setTimeout(() => {
      error.classList.remove("show");
    }, 5000);
    return;
  }

  let email = input.value;
  let imgSrc = img.src;

  //Disabling use of buttons until function is complete
  subBtn.disabled = true;
  addBtn.disabled = true;
  newBtn.disabled = true;

  //If pairs already has an entry under this email, add to an email array, otherwise, create an array
  if (pairs.has(email)) {
    pairs.get(email).push(imgSrc);
  } else {
    pairs.set(email, [imgSrc]);
  }

  updateDropdown();

  //Fetching the data from the API and saving it as a base64 string, this stops it from being overridden by another random image
  await fetch("https://source.unsplash.com/random/300x200?sig=${Math.random()}")
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
  subBtn.disabled = false;
  addBtn.disabled = false;
  newBtn.disabled = false;
});

//On click, generate a new random image
newBtn.addEventListener("click", function (e) {
  e.preventDefault();
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
});

addBtn.addEventListener("click", async function (e) {
  e.preventDefault();

  subBtn.disabled = true;
  addBtn.disabled = true;
  newBtn.disabled = true;

  let imgSrc = img.src;
  if (dropdown.value == "placeholder") {
    alert("You cannot add an image to the placeholder email");
    subBtn.disabled = false;
    addBtn.disabled = false;
    newBtn.disabled = false;
    return;
  }
  console.log(dropdown.value);
  pairs.get(dropdown.value).push(imgSrc);
  updateDropdown();

  e.preventDefault();

  await fetch("https://source.unsplash.com/random/300x200?sig=${Math.random()}")
    .then((response) => response.blob())
    .then((blob) => {
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        let base64data = reader.result;
        img.src = base64data;
      };
    });

  subBtn.disabled = false;
  addBtn.disabled = false;
  newBtn.disabled = false;
  updateImage();
});

export { pairs };
