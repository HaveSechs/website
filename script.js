console.log = function (s) {
    document.getElementById("console").innerHTML += s + "<br>";
}

var form = document.getElementById("form");
document.getElementById("code").value = window.localStorage.getItem("code") ?? "";

form.addEventListener("submit", function (e) {
    e.preventDefault();

    var exploit = document.getElementById("code").value;

    try {
        eval(exploit)
    } catch (error) {
        document.getElementById("console").innerHTML += `<div class="error">${error}</div>`
    }
    document.getElementById("code").value = exploit;
    window.localStorage.code = exploit;
})
