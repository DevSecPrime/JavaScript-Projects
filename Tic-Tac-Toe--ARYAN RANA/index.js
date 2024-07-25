const boxes = document.querySelectorAll(".box");//collecting all the boxes....

const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const playerInput = document.querySelector(".form-container");
const startNewGame = document.querySelector(".start-btn");
const player1 = document.querySelector(".player-1");
const player2 = document.querySelector(".player-2");
const gameWindow = document.querySelector(".main-container");
const winnerBox = document.querySelector(".winner-container");
const winnerName = document.querySelector(".winnerName");
const winnerHarcore = document.querySelector(".winner-harcore");

//varibles that are needed........

let currPlayer;  //to show which player is currently playing X or O
//starting value of current player is X
//currPlayer = "X";


let gameGrid; // 3x3 ---  to show in which box the current player is playing -----and stores the value of X or O
//grid would be EMPTY in start........
//gameGrid = ["", "", "", "", "", "", "", "", ""];

let currPlayerName;   //this will hold name of the current player who is playing

// calling sound effects... 
let clickSound = document.querySelector("#clickSound");
let drawSound = document.querySelector("#drawSound");
let winSound = document.querySelector("#winSound");
let clapping = document.querySelector("#clapping");

//let`s get the ifo of player1 and player2
playerInput.classList.add("active");

playerInput.addEventListener("submit", (e) => {

    e.preventDefault();

    if (player1.value === "" || player2.value === "") {
        alertFunction();
        return;
    }

    playerInput.classList.remove("active");
    gameWindow.classList.add("active");
    //now call for game start
    initGame();
});

function alertFunction() {
    confirm("Please Enter Both Player Name");
}


//there are total 8 winnig posibilities to win this game....
//total 8 winning posibilities to win this game....  
// 0 | 1 | 2
// 3 | 4 | 5
// 6 | 7 | 8

// 0 | 3 | 6
// 1 | 4 | 7
// 2 | 5 | 8

// 0 | 4 | 8
// 2 | 4 | 6

const winningPossiblities = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], //This winning in #HORIZONTAL----3 

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], //This winning in #VRTICAL----3

    [0, 4, 8],
    [2, 4, 6] //This winnig in gterms of #CROSS-----2
];

//Let`s create the function to initialize the game........

function initGame() {

    winnerBox.classList.remove("active");
    gameWindow.classList.add("active");
    // console.log("inside the init game function")

    currPlayer = "X"; //starting ma current player X hoi...
    currPlayerName = player1.value.split(" ")[0];//get the name of player1

    // console.log(`name is  ${currPlayerName} and type of name is ${typeof(currPlayerName)}`);
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    //To show the game in initial state....ON UI
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        //something is missing here....
        //Initialize box with CSS properties...
        box.classList = `box box${index + 1}`; //initialize the boxes...
    });
    //staring ma bdhi grid khali hse..........
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current player is - ${currPlayer}`; //using Template literals....
}

//calling function

//change the player.....swapTurn()

function swapTurn() {
    if (currPlayer == "X") {
        currPlayer = "O";
        currPlayerName = player2.value.split(" ")[0];
    }
    else {
        currPlayer = "X";
        currPlayerName = player1.value.split(" ")[0];

    }

    //Update the UI..
    gameInfo.innerText = `Current player is - ${currPlayer}`;//we are using Template literals...
}


function checkGameOver() {
    let answer = ""; //in start we don`t know who is the winner....so we are setting the answer to be empty

    //here, we are checking each position....
    //this is the answer-->"X" or "O"---IF 3 box-indexes have same value..

    winningPossiblities.forEach((position) => {
        //all three boxex should be NON-EMPTY and must have exactly same value...
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            //check if winner is "X"

            if (gameGrid[position[0]] === "X") {
                console.log("aryan...");
                answer = player1.value.split(" ")[0];
            } else {
                answer = player2.value.split(" ")[0];
            }
            //disble pointer events..
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
            //now we know the X / O -->one of them is the winner
            //show the winner on UI via grren color --> winner boxex are marked with green color

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            winSound.play();
            clapping.play();

        }

    });

    //it means we have the winner..
    if (answer !== "") {
        gameInfo.innerText = `Winner is - ${answer}`;
        gameWindow.classList.remove("active");
        winnerBox.classList.add("active");
        winnerHarcore.innerText = "Winner is -";
        winnerName.innerText = answer;

        newGameBtn.classList.add("active");
        return;
    }

    //when there is no winner ----> T I E == TIE
    let inputFillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "")
            inputFillCount++;
    });

    //if board is full and there is no winner--->Tie

    if (inputFillCount === 9) {
        drawSound.play();
        gameWindow.classList.remove("active");//main-container removed
        winnerBox.classList.add("active");//winner-container added
        winnerHarcore.innerText = "";
        winnerName.innerText = "It's a tie";
        // gameInfo.innerText = "Game is Tied";
        newGameBtn.classList.add("active");
    }
}

//newGameBtn -- After click on new game button-- we will initialize the game again....RESTART THE GAME

newGameBtn.addEventListener("click", () => {
    initGame(); //calling function to restart -- initialize the game again
});



//Let`s create the function to handle the click event of the game grid....

function handleClick(index) {
    if (gameGrid[index] === "") //if the box is empty 
    {
        console.log("clicked on " + index)
        boxes[index].innerText = currPlayer; //show the current player in UI
        gameGrid[index] = currPlayer;
        clickSound.play();

        boxes[index].style.pointerEvents = "none";
        //change the player--X to O OR O to X ---> swapTurn---another player turn
        swapTurn();

        //check , if the player is won or not
        checkGameOver()

    }

}

//for click --- the box to win the game --we are using index to know which box is clicked......and we had applied the handleBox() to handle the cliked box.....



///Here, we are using forEach() loop to click each and Every box....

boxes.forEach((box, index) => {
    //first ondex is used to find the index of clicked
    box.addEventListener("click", () => {
        handleClick(index); //handlClick(index) is used to know which box is clicked----andafter clicking the box,we will pass the value from X or O as user input------also detemine that Hadn`t the user won{ user jiti to nthi gyo ne.....} 
    })
})

//what will handleClick()--function do ?

// 1. first check the box is empty OR not.
// 2. if it is not empty then return from the function
// 3. if it is empty then change the value of the box-- - X & O
// 4. change the currPlayer--->swap - player & disable the click of box
// 5. check the player is WON or not
// 6. check the game is over or not
// 7. if it is not over then change the player
// 8. if winner is found then display the winner - box in green
// 9. if the game is over OR all boxes are filled then start new game---> if it is not empty then return from the function


