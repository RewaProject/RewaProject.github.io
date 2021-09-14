$(document).ready(function () {
    var hamburger = document.querySelector(".hamburger");
    var menu = document.querySelector(".menu");
    var activemenu = document.querySelector(".is-active");
    // On click
    hamburger.addEventListener("click", function() {

  // Toggle class "is-active"
    hamburger.classList.toggle("is-active");
    menu.classList.toggle("active-menu");
    });
});