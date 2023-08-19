console.log = function (s) {
    document.getElementById("console").innerHTML += s + "<br>";
}

function clear_() {
    document.getElementById("console").innerHTML = `<h3 style="color: gold; line-height: 0.25em; font-family: 'Bungee Spice', cursive;">Sachs is my daddy</h3>`;
}

function cursor_forward (words, cursor) {
    words.splice(cursor, 1);
    cursor += 1;
    words.splice(cursor, 0, "<span id=\"cursor\">|</span>");

    return cursor;
}


var form = document.getElementById("form");
var code = document.getElementById("code");

var fonts = [
    "Kablammo, cursive",
    "Bungee Spice, cursive",
    "Moirai One, cursive",
    "Rubik Maze, cursive"
]
var cursor = 0;
var words = JSON.parse(localStorage.code);

words.unshift("<span id=\"cursor\">|</span>");
code.innerHTML = words.join("");


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
        words.push(event.key);

        cursor = cursor_forward(words, cursor);
    } else if (event.key == ".") {
        words.push(event.key);
        
        cursor = cursor_forward(words, cursor);
    } else if (event.key == "(") {
        words.push(event.key);

        cursor = cursor_forward(words, cursor);
    } else if (event.key == ")") {
        words.push(event.key);

        cursor = cursor_forward(words, cursor);
    } else if (event.key == "\"") {
        words.push(event.key);

        
    } else if (event.key == " ") {
        event.preventDefault();
        words.push(event.key);

        cursor = cursor_forward(words, cursor);
    } else if (event.key == "Enter") {
        code.innerHTML += "<br>";
    } else if (event.key == "Backspace") {
        words.splice(cursor - 1, 1);
        cursor = Math.max(cursor - 1, 0);
    } else if (event.key == "ArrowRight") {
        if (cursor < words.length) {
            event.preventDefault();
            
            cursor = cursor_forward(words, cursor);
        }
    } else if (event.key == "ArrowLeft") {
        if (cursor < words.length) {
            event.preventDefault();
            words.splice(cursor, 1);
            cursor -= 1;
            words.splice(cursor, 0, "<span id=\"cursor\">|</span>");
        }
    }

    code.innerHTML = words.join("");
})