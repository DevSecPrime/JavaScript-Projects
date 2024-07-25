let userName = document.querySelector("#username");
let password = document.querySelector("#password");

let eyeBallLeft = document.querySelector(".eyeball-left");
let eyeBallRight = document.querySelector(".eyeball-right");

let handLeft = document.querySelector(".hand-l");
let handRight = document.querySelector(".hand-r");

let normalEyeStyle = () => {

    eyeBallLeft.style.cssText = `
    left: 0.6em;
    top: 0.6em;
    `;
    eyeBallRight.style.cssText = `
    right: 0.6em;
    top: 0.6em;
    `;
};

let normalHandStyle = () => {
    handLeft.style.cssText = `
        height:2.81em;
        top:8.4em;
        left:7.5em;
        transform: rotate(-0deg);
    `;

    handRight.style.cssText = `
        height:2.81em;
        top:8.4em;
        right:7.5em;
        transform: rotate(0deg);
    `;
}

//when clicked on UserName input field
userName.addEventListener("focus", () => {
    eyeBallLeft.style.cssText = `
        left: 0.75em;
        top: 1.12em;
    `;

    eyeBallRight.style.cssText = `
        right:0.75em;
        top:1.12em;
    `;
    normalHandStyle();
});

//When clicked on Password input field
password.addEventListener("focus", () => {
    handLeft.style.cssText = `
        height:6.56em;
        top:3.87em;
        left:11.57em;
        transform: rotate(-155deg);
    `;

    handRight.style.cssText = `
        height:6.56em;
        top:3.87em;
        right:11.57em;
        transform: rotate(155deg);
    `;
normalEyeStyle();
})

//when clicked on outside the username & password field
document.addEventListener("click",(e)=>{
   let clickedElement = e.target;
   if(clickedElement !== userName && clickedElement !== password){
    normalEyeStyle();
    normalHandStyle();
   }
})