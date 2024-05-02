const TIME_PER_QUESTION = 20; // Time per question in seconds

const quizQuestions = [
    {
        question: "Which keyword is used to define a function in Python?",
        options: ["def", "function", "define", "func"],
        answer: "def"
    },
    {
        question: "Which of the following data types is mutable in Python?",
        options: ["int", "float", "tuple", "list"],
        answer: "list"
    },
    {
        question: "What will be the output of the following code?\n\nmy_list = [1, 2, 3, 4, 5]\nprint(my_list[1:3])",
        options: ["[1, 2, 3]", "[2, 3, 4]", "[1, 2]", "[2, 3]"],
        answer: "[2, 3]"
    },
    {
        question: "Which keyword is used to define a function in Python?",
        options: ["def", "function", "define", "func"],
        answer: "def"
    },
    {
        question: "What is the output of the following code?\n\nx = 10\nif x > 5:\n    print('x is greater than 5')\nelse:\n    print('x is less than or equal to 5')",
        options: ["x is greater than 5", "x is less than or equal to 5", "x is equal to 5", "None of the above"],
        answer: "x is greater than 5"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");

function displayQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.textContent = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
    optionsElement.innerHTML = "";
    currentQuestion.options.forEach((option) => {
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "option";
        input.value = option;
        optionsElement.appendChild(input);
        const label = document.createElement("label");
        label.textContent = option;
        label.classList.add("options-label");
        optionsElement.appendChild(label);
        optionsElement.appendChild(document.createElement("br"));
    });
    startTimer();
    document.getElementById("start-btn").style.display = "none";
    document.getElementById("submit-btn").style.display = "block";
}

function startTimer() {
    let timeLeft = TIME_PER_QUESTION;
    const timerElement = document.createElement("div");
    timerElement.classList.add("timer");
    timerElement.textContent = `Time Left: ${timeLeft} seconds`;
    document.querySelector(".container").appendChild(timerElement);

    const timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft} seconds`;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            checkAnswer(); // Automatically check answer when time runs out
        }
    }, 1000);
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        resultElement.textContent = "Please select an option!";
        return;
    }
    const selectedAnswer = selectedOption.value;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        document.querySelector(".timer").remove(); // Remove the timer element
        displayQuestion();
    } else {
        displayScore();
    }
}

function displayScore() {
    questionElement.textContent = "";
    optionsElement.innerHTML = "";
    document.querySelector(".timer").remove(); // Remove the timer element
    document.getElementById("submit-btn").style.display = "none";
    resultElement.textContent = "";
    scoreElement.textContent = `Your Score: ${score}/${quizQuestions.length}`;
}

document.getElementById("start-btn").addEventListener("click", () => {
    displayQuestion();
});

document.getElementById("submit-btn").addEventListener("click", () => {
    checkAnswer();
});






