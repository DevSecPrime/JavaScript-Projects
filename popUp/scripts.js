const subBtn = document.querySelector(".btn");
const okCloseBtn = document.querySelector(".okBtn");
const popUp = document.querySelector(".popUp");
const cover = document.querySelector("#cover");
const body = document.querySelector("body");


// Open popUp
subBtn.addEventListener("click", () => {
    console.log("popUp is invoked.....");
    popUp.classList.add("active");
});

// Close popUp when OK button is clicked
okCloseBtn.addEventListener("click", () => {
    console.log("popUp is closed.....");
    popUp.classList.remove("active");
});

// Close popUp when clicking anywhere in the background
cover.addEventListener("click", (event) => {
    if (!cover.contains(event.target) && popUp.classList.contains("active")) {
        popUp.classList.remove("active");

        console.log("clicked on bg..");
        console.log("popUp is closed.....");
    }
});
