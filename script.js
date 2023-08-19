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
    "Moirai One, cursive",
    "Rubik Maze, cursive"
]

code.value = window.localStorage.getItem("code") ?? "";

form.addEventListener("submit", function (e) {
    e.preventDefault();

    var exploit = code.textContent;

    try {
        eval(exploit);
    } catch (error) {
        document.getElementById("console").innerHTML += `<div class="error">${error}</div>`
    }
    code.value = exploit;
    window.localStorage.code = exploit;
})

document.addEventListener("keydown", function(event) {
    if (/^[A-Za-z]$/.test(event.key)) {
        code.innerHTML += event.key;
    } else if (event.key == ".") {
        code.innerHTML += ".";
    } else if (event.key == "(") {
        code.innerHTML += "(";
    } else if (event.key == ")") {
        code.innerHTML += ")";
    } else if (event.key == "\"") {
        code.innerHTML += "\"";
    } else if (event.key == " ") {
        event.preventDefault();
        code.innerHTML += event.key;
    } else if (event.key == "Enter") {
        code.innerHTML += "<br>";
    } else if (event.key == "Backspace") {
        code.innerHTML = "";
    }
})