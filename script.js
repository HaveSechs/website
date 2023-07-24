var form = document.getElementById("form");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    eval(document.getElementById("code").value);
})

// bro i need some way to force a rebuild
