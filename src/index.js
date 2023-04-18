const wrapper = document.createElement("div");
wrapper.classList.add("wrapper");

const texrArea = document.createElement("textarea");
texrArea.classList.add("keyboard__text");

const keyboard = document.createElement("div");
keyboard.classList.add("keyboard");

wrapper.append(texrArea, keyboard);
document.body.append(wrapper);

const y = require("./keyboard.json");
const data = JSON.parse(JSON.stringify(y));

for (let element of data) {
  const button = document.createElement("button");
  button.classList.add("keyboard--key", element.code.toLowerCase());
  button.type = "button";
  button.textContent = element.key;
  keyboard.append(button);

  if (
    element.code === "Backspace" ||
    element.code === "Delete" ||
    element.code === "Enter" ||
    element.code === "ShiftRight"
  ) {
    const clearFix = document.createElement("div");
    clearFix.classList.add("clearfix");
    keyboard.append(clearFix);
  }
}

let arr = [];
document.onkeydown = function (event) {
  arr.push(event.code);
  console.log(arr);
};
