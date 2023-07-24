var form = document.getElementById("form");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    eval(document.getElementById("code").value);
})
