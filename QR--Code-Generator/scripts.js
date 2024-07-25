let imgBox = document.querySelector(".imgBox");
let qrImage = document.querySelector("#qrImg");
let qrText = document.querySelector("#qrText");


function generateQR() {


    if (qrText.value.length > 0) {
        qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrText.value; //input fleid ma nkva

        imgBox.classList.add("active");//for show img
    }

    else {
        qrText.classList.add("error");
        qrText.style.border = "1px solid red";
        console.log("QR generated.....");

        setTimeout(() => {
            qrText.classList.remove("error");
            qrText.style.border = "";

        }, 1000)

    }
}