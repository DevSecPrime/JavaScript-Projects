console.log("aryan rana....");

const inputBox = document.querySelector("#input-box");
const listContainer = document.querySelector(".list-container");
const addTask = document.querySelector(".btn");


addTask.addEventListener("click", () => {
    if (inputBox.value === "") {
        alert("You must write something");
    } else {

        // add list--
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        // remove list--
        let removeList = document.createElement("span");
        removeList.innerHTML = "\u00d7";
        li.appendChild(removeList);

    }

    inputBox.value = ""//to removw the value after add
    saveData();///to save data in local storage..

});

//add check and delete list function

listContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        console.log("checked..");
        e.target.classList.toggle("checked");
        saveData();//save data after addind data
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();//save after deleting the data
    }
}, false);

///add data in local storage---->data

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

//show all the data after refresh the browser---->
//get data from localstorage


function showData() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showData();//call ing the function...