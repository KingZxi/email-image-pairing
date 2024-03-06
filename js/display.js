import { pairs } from "./submit.js";

//Displaying data based on the selected email
let dropdown = document.querySelector(".display-area__section__select");
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
  img = pairs.get(`${dropdown.value}`);
  let imgDisplay = document.querySelector(".display-area__section__img");
  imgDisplay.src = img;
}

dropdown.addEventListener("change", function (e) {
  updateImage();
});

export { updateDropdown, updateImage };
