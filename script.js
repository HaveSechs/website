console.log = function (s) {
    document.getElementById("console").innerHTML += s + "<br>";
}

var form = document.getElementById("form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    var exploit = document.getElementById("code").value;
    
    eval(exploit);
    document.getElementById("code").value = exploit;
})
