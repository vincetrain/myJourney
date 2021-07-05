// Variables

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

// Event handlers

window.onscroll = function() {makeSticky()}

// Functions

function makeSticky() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
    } 
    else {
        navbar.classList.remove("sticky");
    }
}

// Main