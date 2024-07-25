const questions = [
    {
        question: "which is largest animal in the world?",
        answer: [
            { text: "Shark", correct: "false" },
            { text: "Elephant", correct: "false" },
            { text: "Dinosour", correct: "false" },
            { text: "Blue whale", correct: "true" },
        ]
    },

    {


        question: "which is the king of the jungle",
        answer: [
            { text: "Shark", correct: "false" },
            { text: "Lion", correct: "true" },
            { text: "Dinosour", correct: "false" },
            { text: "Blue whale", correct: "false" },
        ]
    },

    {

        question: "which is the smallest country in this world?",
        answer: [
            { text: "America", correct: "false" },
            { text: "India", correct: "false" },
            { text: "London", correct: "false" },
            { text: "Vatican City", correct: "true" },
        ]
    },

    {

        question: "which phone do you like the most?",
        answer: [
            { text: "Apple", correct: "true" },
            { text: "MI", correct: "false" },
            { text: "Samsung", correct: "false" },
            { text: "Itel", correct: "false" },
        ]
    },

    {
        question: "which water we should drink?",
        answer: [
            { text: "Bislery", correct: "false" },
            { text: "Kinley", correct: "false" },
            { text: "SMC", correct: "true" },
            { text: "BMC", correct: "false" },
        ]
    },

]


const questionElement = document.querySelector("#question");
const answerBtn = document.querySelector(".answer-button");
const nextBtn = document.querySelector("#next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {

    //in starting case...........
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {

    resetState();
    let currentQuestion = questions[currentQuestionIndex];//show our current question no
    let questionNo = currentQuestionIndex + 1;//to show question number on UI
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;// to show the question index......



    //to show the answers.......
    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);

        // select answers from dataset--fetch answer from the dataset............
        if (answer.correct) {
            button.dataset.correct = answer.correct;
            console.log("aryan correct........");

        }
        button.addEventListener("click", selectAnswer);
    })

}

//when we refresh the UI the next btn would be removed and clicked btn also get removed.....

function resetState() {
    nextBtn.style.display = "none";
    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        console.log("correct........");
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        console.log("nathi ....correct........");

        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerBtn.children).forEach(button => {

        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        // console.log(score);
        // console.log(handleBtn());

        handleBtn();
    } else {
        startQuiz();
    }

});

//next question..........
function handleBtn() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        console.log(score)
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerText = "Play Again";
    nextBtn.style.display = "block";
}

function resetState() {
    nextBtn.style.display = "none";
    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

startQuiz();