const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: 2, // Index of the correct answer
  },
  {
    question: "Which language is used for web development?",
    options: ["Python", "Java", "JavaScript", "C++"],
    answer: 2,
  },
  {
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    answer: 2,
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Shakespeare", "Tolkien", "Dickens", "Hemingway"],
    answer: 0,
  },
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.querySelectorAll(".option-btn");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const totalQuestionsEl = document.getElementById("total-questions");
const restartBtn = document.getElementById("restart-btn");
const quizContainer = document.getElementById("quiz");

// Load a question
function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;

  optionsEl.forEach((button, index) => {
    button.textContent = currentQuestion.options[index];
    button.className = "option-btn"; // Reset button styles
    button.disabled = false; // Re-enable buttons
  });

  nextBtn.classList.add("hidden");
}

// Handle answer selection
function selectAnswer(selectedIndex) {
  const currentQuestion = quizData[currentQuestionIndex];

  // Lock all buttons
  optionsEl.forEach((button, index) => {
    button.disabled = true;
    if (index === currentQuestion.answer) {
      button.classList.add("correct");
    } else if (index === selectedIndex) {
      button.classList.add("incorrect");
    }
  });

  // Update score if the answer is correct
  if (selectedIndex === currentQuestion.answer) {
    score++;
  }

  nextBtn.classList.remove("hidden");
}

// Show the result
function showResult() {
  quizContainer.classList.remove("active");
  resultEl.classList.add("active");
  scoreEl.textContent = score;
  totalQuestionsEl.textContent = quizData.length;
}

// Restart the quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  quizContainer.classList.add("active");
  resultEl.classList.remove("active");
  loadQuestion();
}

// Event Listeners
optionsEl.forEach((button, index) => {
  button.addEventListener("click", () => selectAnswer(index));
});

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

restartBtn.addEventListener("click", restartQuiz);

// Initialize quiz
quizContainer.classList.add("active");
loadQuestion();
