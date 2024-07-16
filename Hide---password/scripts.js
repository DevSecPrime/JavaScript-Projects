const inputPassword = document.querySelector(".myPassword");
const myOpenEye = document.querySelector(".openEye");


myOpenEye.addEventListener("click", () => {
    //jo input ni type---- password oi to ene text ma convert krido..

    if (inputPassword.type == "password" && inputPassword.value !== "") {
        inputPassword.type = "text";
        myOpenEye.src = "assets/openEye.png";

    }
    else {
        inputPassword.type = "password";
        myOpenEye.src = "assets/closeEye.png";

    }

});



