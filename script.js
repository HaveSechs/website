console.log = function (s) {
    document.getElementById("console").innerHTML += s + "<br>";
}

function clear_() {
    document.getElementById("console").innerHTML = `<h3 style="color: gold; line-height: 0.25em; font-family: 'Bungee Spice', cursive;">Sachs is my daddy</h3>`;
}

var form = document.getElementById("form");
var code = document.getElementById("code");

var fonts = [
    "Kablammo, cursive",
    "Bungee Spice, cursive",
    "Moirai One, cursive"
]

code.value = window.localStorage.getItem("code") ?? "";

form.addEventListener("submit", function (e) {
    e.preventDefault();

    var exploit = code.value;

    try {
        eval(exploit);
    } catch (error) {
        document.getElementById("console").innerHTML += `<div class="error">${error}</div>`
    }
    code.value = exploit;
    window.localStorage.code = exploit;
})

code.addEventListener("input", function (e) {
    var font = fonts[Math.floor(Math.random() * fonts.length)];
    code.style.color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
    code.style.fontFamily = font;
})