import { pairs } from "./submit.js";

//Displaying data based on the selected email
let dropdown = document.querySelector(".display-area__select");
let img = "";

function updateDropdown() {
  dropdown.innerHTML = "";
  pairs.forEach((value, key) => {
    let option = document.createElement("option");
    option.value = key;
    option.text = key;
    dropdown.appendChild(option);
  });
}

function updateImage() {
  getImg();
}

function getImg() {
  let imgArr = pairs.get(`${dropdown.value}`);
  let imgDisplay = document.querySelector(".display-area__images");
  imgDisplay.innerHTML = "";
  for (let i = 0; i < imgArr.length; i++) {
    let img = document.createElement("img");
    img.src = imgArr[i];
    imgDisplay.appendChild(img);
  }
}

dropdown.addEventListener("change", function (e) {
  updateImage();
});

export { updateDropdown, updateImage, getImg };
