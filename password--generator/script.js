// Here we are selectiing custom attribute to ftch the element its denoted in [...custom-element......] or we can select class and id also using getElementById or getElementsByClassName or getElementByTagName

const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const indicatorText = document.querySelector("[data-text]")
const uppercaseCheck = document.querySelector("#upperCase");
const lowercaseCheck = document.querySelector("#lowerCase");
const numbersCheck = document.querySelector("#number");
const specialCharacterCheck = document.querySelector("#special-character");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const specialCharacters = '~!@#$%^&*()_+-{}|:"<>?[];\',./';


// Initial thing which are mentioned hree--

let password = "";
let passwordLength = 10;
let checkCount = 0;


//set strength-circlr color to grey.........initially
setIndicator("#ccc");





//creating the function for handling the password length........from 10 to 20
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    //or kuch bhi karna chahiye ? - HW
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength - min) * 100 / (max - min)) + "% 100%"
}
// calling the function
handleSlider();

// setting strength inicator-----

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    //shadow baki
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;//for adding shadow

}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;

    //    1) here, Math.random will give the value form 0 to 1 then,
    //    2) Math.random()*(max-min) will give the value from 0 to max-min      then,
    //     may be we get the value in floating-point (1.1,3.5,6.8) so we need to round it ,so we will be using Math.floor(Math.random()*(max-min))so we will get the value  in integer after floor...

    //    3)  But, we want value from min to max so we would add min ( + min ) in 
    //    =>    Math.floor(Math.random()*(max-min)) + min

}

// for generate random integer----
function generateRndNumber() {
    return getRndInteger(0, 9);
}


// for generate random lower case letter---
function generateLowerCase() {
    // asci value of a = 97 and z=123
    //we get the range in term of integer we are needed to conver the integer number to string using String.fromCharCode method

    return String.fromCharCode(getRndInteger(97, 123));

}


// for generate upper case letter----
function generateUpperCase() {
    // asci value of A = 65 and Z = 90
    return String.fromCharCode(getRndInteger(65, 90));
}


// for generate special character
function generateSpecialCharacter() {

    //random special-character from 0 to specialCharacters.length
    //randomSpecialCharacter => rndSC
    const rndSC = getRndInteger(0, specialCharacters.length);
    return specialCharacters.charAt(rndSC);

}

// calculating the password strength based on strong weak & Normal--
// function for generate password

function calcPwdStrength() {
    //in start we set all the checkbox to false --its believed
    //starting ma bdha ni value false mani lidh.....sadi bhasama
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSpecialChar = false;

    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNumber = true;
    if (specialCharacterCheck.checked) hasSpecialChar = true;

    //calculate the number of charachter that user want in his/her password
    if (hasUpper && hasLower && (hasNumber || hasSpecialChar) && passwordLength >= 8) {
        setIndicator("#0f0"); //green
        indicatorText.innerText = "strong"
        indicatorText.style.color = "#0f0"
        console.log('strong');
    } else if (
        (hasLower || hasUpper) &&
        (hasNumber || hasSpecialChar) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0"); //yelow
        indicatorText.innerText = "normal" 
        indicatorText.style.color = "#ff0"

        console.log('normal');

    }
    else {
        setIndicator("#f00");//red
        console.log('weak');
        indicatorText.innerText = "weak"
        indicatorText.style.color = "#f00"

    }

}


//if i want to copy anyting to clipbord i will use writeText method of navigator.clipboard---it is a API to copy the content to clipboard
//writeText method content cpy kare .....sena pr ....to k ...clipbord pr

//writeTetx method kaik pachhu aape chhe etle k kai k return kre chhe... to su return kre chhe.....to writeText method ek promis return lkre chhe jev k ....jevu copy kru...jevu copy kre etle upr copy----text dekhy exp :- copied thext

//etle promis resolve thse pachhi j copy text dekhse -----so aapne resolve thy pachhiii text dekhy -----ena mate await key-word use kris .....k promis resolve thy pachhi j text dekhaye....
//function writeText() 

// for copy the contebt---

async function copyContent() {

    //navigator.clipboard.writeText----aa method ne use kri ne hu text ne clip-bord pr copy kri saku chhu......j ek promis return kre chhe
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
        console.log("password copied successfully..")
    } catch (e) {
        console.log(e)
        copyMsg.innerText = "Failed";
    }

    //to make text---copy visible in span

    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000)

}


// for shuffling the password---
function shufflePassword(array) {
    //for shufflingpasword we will be using the ----Fisher Yates Method to shuffle the password on array

    for (let i = array.length - 1; i > 0; i--) {
        //finding random j using Math.random
        const j = Math.floor(Math.random() * (i + 1));

        //swapping the element
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;

}

// we have to chnge the check box so we are needed to chnge the event listener of check boxes to chneg the checkboxes 

// for chnge the check boxes

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked) {
            checkCount++;
        }

    })
    // special condition------
    if (passwordLength < checkCount) {
        passwordLength = checkCount
        handleSlider();
    }

}

// jo pwd-length e checkCount etle k checkbox [ here 4 checkcount] ni lenth krta ochhi thy jy eetle k length 4 krta ochhi thy jay...passwordLength<checkCount to pwd-length e checkCount na eql thy jy etle k 
// passwordLength = checkcount , sadi bhasama matlab thy k jo password ni length 1 hoi j chkcount thi ochhi chhe to password ni length e 1 thi vdhi ne 4 etle k passwordLength = checkCount thy jse ---- checkCount na barbr thhy jse...and ena base pr---ena hisab pr --- e mujab j slider chhhe e automatically eni jate 4 pr set thy jse.......




allCheckBox.forEach((checkbox) => {

    checkbox.addEventListener('change', handleCheckBoxChange)
    // for those checkbox which are ticked or unticked if its chnged the handleCheckBoxChange function restart the count 

});

//for generating password............

inputSlider.addEventListener("input", (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

//inputslider pr ek eventlistener lagavyu chhhe j slider right - left kare to handleSlider function call krine --- j chnge thyeli vaslye ale chhe e apna passwor dni length chhe j handleSlider() function dhvara pawdlength ma stor the thy che jene user ne Ui pr joy sake chhe...... 

// for copy the password.....

// copyBtn.addEventListener("click", () => {
//     if (passwordDisplay.value > 0)
//         copyContent();
// //here this will copy only the numbers ...
// })

copyBtn.addEventListener("click", () => {
        if (passwordDisplay.value !== "" )
            copyContent();
    
    })



//password -display etle k password no input tag jo NON-EMPTY hoi etle khli naa hoi......koi txt k password ander hoi to e content ne tu copy kari de...and UI pr batavi de........


// for generating password from password generatebtn-------

generateBtn.addEventListener("click", () => {
    // none the check box is selcted---to pwd genefrate thse nai--
    if (passwordLength <= 0)
        return;


    // if (checkCount == 0)
    //     return;


    // special case---

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    //for generating new pssword-----


    //removing old password

    let password = "";

    //lets put the stuff mentioned by check boxes----
    // if(uppercaseCheck.checked)
    // {
    //     password += generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked)
    // {
    //     password += generateRndNumber();
    // }

    // if(specialCharCheck.checked)
    // {
    //     password += generateSpecialCharacter();
    // }

    // default selection of pwd is 10 we created condition for 4 chars but we are needed more 6 ---- for these 6 chars,.. we can genearte 6 chars randomly but we will use other method called array in which will all the nmber or chars randomly generated

    //lets put the stuff mentioned by check boxes----
    let funArr = [];

    if (uppercaseCheck.checked)
        funArr.push(generateUpperCase);

    if (lowercaseCheck.checked)
        funArr.push(generateLowerCase);

    if (numbersCheck.checked)
        funArr.push(generateRndNumber);

    if (specialCharacterCheck.checked)
        funArr.push(generateSpecialCharacter);

    // compulsary addition--for ticked boxes
    for (let i = 0; i < funArr.length; i++) {
        password += funArr[i]();
    }
    console.log("COmpulsory adddition done");


    //remaining addition--for unticked check boxes
    for (let i = 0; i < passwordLength - funArr.length; i++) {
        let randomIndex = getRndInteger(0, funArr.length);
        console.log("randIndex" + randomIndex);
        password += funArr[randomIndex]();
    }
    console.log("Remaining adddition done");


    //suffle the password------
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");


    //how password in UI--
    passwordDisplay.value = password;
    console.log("UI adddition done");

    // calculate password strngth---- weak ,strong & normal...
    calcPwdStrength()
});