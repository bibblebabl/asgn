import "./style.css";

document.getElementById("app").innerHTML = `
<h1 class="heading">Drawer</h1>
`;

let canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.addEventListener("click", (event) => {
  console.log(event);
});
