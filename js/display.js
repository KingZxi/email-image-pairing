import { pairs } from "./submit.js";

//Displaying data based on the selected email
let dropdown = document.querySelector(".display-area__select");

//Updates dropdown, used when a new email is added to pairs
function updateDropdown() {
  dropdown.innerHTML = "";
  pairs.forEach((value, key) => {
    let option = document.createElement("option");
    option.value = key;
    option.text = key;
    dropdown.appendChild(option);
  });
}

//This function returns an array of images based on the selected email
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

function updateImage() {
  getImg();
}

dropdown.addEventListener("change", function (e) {
  updateImage();
});

export { updateDropdown, updateImage, getImg };
