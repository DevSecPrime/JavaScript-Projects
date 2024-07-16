const counterValue = document.querySelector("#counter");

// for decrement------
const decrement = () => {
    // get value from UI--
    let value = parseInt(counterValue.textContent);

    // update the value
    value = value - 1;

    // set value on to UI--
    counterValue.textContent = value;
}

// note :- we can use textContent also as well as .innerText but innerText is used when there are html elements inside a div or span etc.. and textContent


// for inceremnet------

const increment = () => {
    // get value from UI--
    let value = parseInt(counterValue.innerText)

    // update the value........
    value = value + 1;

    // set value on to UI---
    counterValue.innerText = value;
}