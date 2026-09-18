/* =========================================
   QUIZ WORLD
   Main JavaScript
========================================= */


/* =========================
   DEMO QUIZ DATA
========================= */

const quizzes = [

    {
        id: 1,
        title: "Python Fundamentals",
        category: "Programming",
        description: "Test your knowledge of basic Python programming.",
        questions: [
            {
                question: "Which keyword is used to define a function in Python?",
                options: [
                    "function",
                    "def",
                    "func",
                    "define"
                ],
                answer: 1,
                marks: 2
            },
            {
                question: "Which data type is used to store True or False?",
                options: [
                    "String",
                    "Integer",
                    "Boolean",
                    "Float"
                ],
                answer: 2,
                marks: 2
            },
            {
                question: "Which symbol is used for a comment in Python?",
                options: [
                    "//",
                    "/*",
                    "#",
                    "<!--"
                ],
                answer: 2,
                marks: 2
            },
            {
                question: "Which function is used to display output in Python?",
                options: [
                    "display()",
                    "output()",
                    "print()",
                    "show()"
                ],
                answer: 2,
                marks: 2
            },
            {
                question: "Which collection is ordered and changeable?",
                options: [
                    "Tuple",
                    "List",
                    "Set",
                    "String"
                ],
                answer: 1,
                marks: 2
            }
        ],
        time: 5
    },

    {
        id: 2,
        title: "General Knowledge",
        category: "General Knowledge",
        description: "Challenge yourself with general knowledge questions.",
        questions: [
            {
                question: "What is the capital of India?",
                options: [
                    "Mumbai",
                    "Chennai",
                    "New Delhi",
                    "Hyderabad"
                ],
                answer: 2,
                marks: 2
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: [
                    "Earth",
                    "Mars",
                    "Jupiter",
                    "Venus"
                ],
                answer: 1,
                marks: 2
            },
            {
                question: "How many continents are there?",
                options: [
                    "5",
                    "6",
                    "7",
                    "8"
                ],
                answer: 2,
                marks: 2
            },
            {
                question: "Which is the largest ocean?",
                options: [
                    "Atlantic Ocean",
                    "Indian Ocean",
                    "Arctic Ocean",
                    "Pacific Ocean"
                ],
                answer: 3,
                marks: 2
            },
            {
                question: "Which language is primarily used to style web pages?",
                options: [
                    "HTML",
                    "CSS",
                    "Python",
                    "SQL"
                ],
                answer: 1,
                marks: 2
            }
        ],
        time: 5
    },

    {
        id: 3,
        title: "Mathematics Challenge",
        category: "Mathematics",
        description: "Test your mathematical thinking and problem solving.",
        questions: [
            {
                question: "What is 12 × 8?",
                options: [
                    "86",
                    "96",
                    "106",
                    "108"
                ],
                answer: 1,
                marks: 2
            },
            {
                question: "What is the square of 15?",
                options: [
                    "125",
                    "200",
                    "225",
                    "250"
                ],
                answer: 2,
                marks: 2
            },
            {
                question: "What is the value of 2³?",
                options: [
                    "4",
                    "6",
                    "8",
                    "9"
                ],
                answer: 2,
                marks: 2
            },
            {
                question: "What is 25% of 200?",
                options: [
                    "25",
                    "40",
                    "50",
                    "75"
                ],
                answer: 2,
                marks: 2
            },
            {
                question: "What is the perimeter of a square with side 5 cm?",
                options: [
                    "10 cm",
                    "15 cm",
                    "20 cm",
                    "25 cm"
                ],
                answer: 2,
                marks: 2
            }
        ],
        time: 5
    }

];


/* =========================
   APPLICATION STATE
========================= */

let currentUser = null;

let currentQuiz = null;

let currentQuestionIndex = 0;

let userAnswers = [];

let timerInterval = null;

let timeRemaining = 0;

let quizStartTime = null;


/* =========================
   PAGE ELEMENTS
========================= */

const homePage = document.getElementById("homePage");
const loginPage = document.getElementById("loginPage");
const studentDashboard = document.getElementById("studentDashboard");
const adminDashboard = document.getElementById("adminDashboard");
const quizPage = document.getElementById("quizPage");
const resultPage = document.getElementById("resultPage");
const certificatePage = document.getElementById("certificatePage");

const loginTitle = document.getElementById("loginTitle");
const loginSubtitle = document.getElementById("loginSubtitle");

const loginForm = document.getElementById("loginForm");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");


/* =========================
   PAGE NAVIGATION
========================= */

function hideAllPages() {

    homePage.classList.add("hidden");
    loginPage.classList.add("hidden");
    studentDashboard.classList.add("hidden");
    adminDashboard.classList.add("hidden");
    quizPage.classList.add("hidden");
    resultPage.classList.add("hidden");
    certificatePage.classList.add("hidden");

}


function showHome() {

    hideAllPages();

    homePage.classList.remove("hidden");

}


/* =========================
   LOGIN
========================= */

function openStudentLogin() {

    hideAllPages();

    loginPage.classList.remove("hidden");

    loginTitle.textContent = "Student Login";

    loginSubtitle.textContent =
        "Login to continue your quiz journey.";

    loginForm.dataset.role = "student";

    usernameInput.focus();

}


function openAdminLogin() {

    hideAllPages();

    loginPage.classList.remove("hidden");

    loginTitle.textContent = "Admin Login";

    loginSubtitle.textContent =
        "Login to manage Quiz World.";

    loginForm.dataset.role = "admin";

    usernameInput.focus();

}


/* =========================
   LOGIN SUBMIT
========================= */

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const username = usernameInput.value.trim();

    const password = passwordInput.value.trim();

    const role = loginForm.dataset.role;


    if (!username || !password) {

        alert("Please enter username and password.");

        return;

    }


    /*
       DEMO LOGIN

       Student:
       student / 1234

       Admin:
       admin / admin123
    */

    if (
        role === "student" &&
        username === "student" &&
        password === "1234"
    ) {

        currentUser = {
            username: "student",
            name: "Quiz Student",
            role: "student"
        };

        openStudentDashboard();

        return;

    }


    if (
        role === "admin" &&
        username === "admin" &&
        password === "admin123"
    ) {

        currentUser = {
            username: "admin",
            name: "Quiz World Admin",
            role: "admin"
        };

        openAdminDashboard();

        return;

    }


    alert(
        "Invalid login details.\n\n" +
        "Demo Student: student / 1234\n" +
        "Demo Admin: admin / admin123"
    );

});


/* =========================
   STUDENT DASHBOARD
========================= */

function openStudentDashboard() {

    hideAllPages();

    studentDashboard.classList.remove("hidden");

    document.getElementById("studentName").textContent =
        currentUser.name;

    renderQuizList();

}


/* =========================
   QUIZ LIST
========================= */

function renderQuizList() {

    const container =
        document.getElementById("quizList");

    container.innerHTML = "";

    quizzes.forEach(function(quiz) {

        const totalMarks =
            quiz.questions.reduce(
                (sum, question) =>
                    sum + question.marks,
                0
            );

        const card =
            document.createElement("div");

        card.className = "quiz-item";

        card.innerHTML = `

            <span class="category">
                ${quiz.category}
            </span>

            <h3>${quiz.title}</h3>

            <p>${quiz.description}</p>

            <div class="quiz-info">

                <span>
                    📝 ${quiz.questions.length} Questions
                </span>

                <span>
                    ⏱️ ${quiz.time} Min
                </span>

                <span>
                    🎯 ${totalMarks} Marks
                </span>

            </div>

            <button
                class="primary-btn"
                onclick="startQuiz(${quiz.id})"
            >
                Start Quiz
            </button>

        `;

        container.appendChild(card);

    });

}


/* =========================
   START QUIZ
========================= */

function startQuiz(quizId) {

    const quiz =
        quizzes.find(q => q.id === quizId);

    if (!quiz) {

        alert("Quiz not found.");

        return;

    }


    currentQuiz = quiz;

    currentQuestionIndex = 0;

    userAnswers =
        new Array(quiz.questions.length).fill(null);

    timeRemaining = quiz.time * 60;

    quizStartTime = Date.now();


    /*
       Requirement:
       Question order should be randomized
       for each student.

       We create a copy so the original
       quiz data remains unchanged.
    */

    currentQuiz = {

        ...quiz,

        questions:
            [...quiz.questions]
                .sort(() => Math.random() - 0.5)

    };


    hideAllPages();

    quizPage.classList.remove("hidden");

    document.getElementById("quizTitle").textContent =
        currentQuiz.title;


    buildQuestionNavigation();

    showQuestion();

    startTimer();

}


/* =========================
   SHOW QUESTION
========================= */

function showQuestion() {

    const question =
        currentQuiz.questions[currentQuestionIndex];

    const total =
        currentQuiz.questions.length;


    document.getElementById("questionNumber")
        .textContent =
        `Question ${currentQuestionIndex + 1} of ${total}`;


    document.getElementById("questionMarks")
        .textContent =
        `${question.marks} Marks`;


    document.getElementById("questionText")
        .textContent =
        question.question;


    const optionsContainer =
        document.getElementById("optionsContainer");

    optionsContainer.innerHTML = "";


    question.options.forEach(function(option, index) {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className = "option";

        button.textContent =
            `${String.fromCharCode(65 + index)}. ${option}`;


        if (
            userAnswers[currentQuestionIndex] === index
        ) {

            button.classList.add("selected");

        }


        button.addEventListener(
            "click",
            function() {

                selectAnswer(index);

            }
        );


        optionsContainer.appendChild(button);

    });


    document.getElementById("previousBtn")
        .disabled =
        currentQuestionIndex === 0;


    const nextBtn =
        document.getElementById("nextBtn");

    const submitBtn =
        document.getElementById("submitQuizBtn");


    if (
        currentQuestionIndex ===
        total - 1
    ) {

        nextBtn.classList.add("hidden");

        submitBtn.classList.remove("hidden");

    }
    else {

        nextBtn.classList.remove("hidden");

        submitBtn.classList.add("hidden");

    }


    updateQuestionNavigation();

}


/* =========================
   SELECT ANSWER
========================= */

function selectAnswer(index) {

    userAnswers[currentQuestionIndex] = index;

    showQuestion();

}


/* =========================
   QUESTION NAVIGATION
========================= */

function buildQuestionNavigation() {

    const container =
        document.getElementById("questionNumbers");

    container.innerHTML = "";


    currentQuiz.questions.forEach(
        function(question, index) {

            const button =
                document.createElement("button");

            button.type = "button";

            button.className =
                "question-number";

            button.textContent =
                index + 1;


            button.addEventListener(
                "click",
                function() {

                    currentQuestionIndex = index;

                    showQuestion();

                }
            );


            container.appendChild(button);

        }
    );

}


function updateQuestionNavigation() {

    const buttons =
        document.querySelectorAll(
            ".question-number"
        );


    buttons.forEach(function(button, index) {

        button.classList.remove(
            "current",
            "answered"
        );


        if (
            userAnswers[index] !== null
        ) {

            button.classList.add("answered");

        }


        if (
            index === currentQuestionIndex
        ) {

            button.classList.add("current");

        }

    });

}


/* =========================
   NEXT
========================= */

document
    .getElementById("nextBtn")
    .addEventListener(
        "click",
        function() {

            if (
                currentQuestionIndex <
                currentQuiz.questions.length - 1
            ) {

                currentQuestionIndex++;

                showQuestion();

            }

        }
    );


/* =========================
   PREVIOUS
========================= */

document
    .getElementById("previousBtn")
    .addEventListener(
        "click",
        function() {

            if (
                currentQuestionIndex > 0
            ) {

                currentQuestionIndex--;

                showQuestion();

            }

        }
    );


/* =========================
   TIMER
========================= */

function startTimer() {

    clearInterval(timerInterval);

    updateTimerDisplay();


    timerInterval =
        setInterval(function() {

            timeRemaining--;

            updateTimerDisplay();


            /*
               1-minute warning
            */

            if (
                timeRemaining === 60
            ) {

                alert(
                    "⚠️ Only 1 minute remaining!"
                );

            }


            /*
               Automatic submission
            */

            if (
                timeRemaining <= 0
            ) {

                clearInterval(timerInterval);

                submitQuiz(true);

            }

        }, 1000);

}


function updateTimerDisplay() {

    const minutes =
        Math.floor(timeRemaining / 60);

    const seconds =
        timeRemaining % 60;


    document.getElementById("timer")
        .textContent =
        `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

}


/* =========================
   SUBMIT QUIZ
========================= */

document
    .getElementById("submitQuizBtn")
    .addEventListener(
        "click",
        function() {

            const unanswered =
                userAnswers.filter(
                    answer => answer === null
                ).length;


            if (unanswered > 0) {

                const confirmSubmit =
                    confirm(
                        `You have ${unanswered} unanswered question(s).\n\nSubmit anyway?`
                    );

                if (!confirmSubmit) {

                    return;

                }

            }


            submitQuiz(false);

        }
    );


function submitQuiz(autoSubmit) {

    clearInterval(timerInterval);


    let correct = 0;

    let wrong = 0;

    let marksObtained = 0;

    let totalMarks = 0;


    currentQuiz.questions.forEach(
        function(question, index) {

            totalMarks += question.marks;


            if (
                userAnswers[index] ===
                question.answer
            ) {

                correct++;

                marksObtained +=
                    question.marks;

            }
            else {

                wrong++;

            }

        }
    );


    const percentage =
        totalMarks > 0
            ? Math.round(
                (marksObtained / totalMarks) * 100
            )
            : 0;


    const timeTakenSeconds =
        (currentQuiz.time * 60) -
        timeRemaining;


    const timeTakenMinutes =
        Math.max(
            1,
            Math.ceil(timeTakenSeconds / 60)
        );


    /*
       Demo rank.
       Real ranking will be connected
       to the database later.
    */

    const rank =
        Math.max(
            1,
            Math.ceil(
                (100 - percentage) / 5
            )
        );


    document.getElementById("resultTotal")
        .textContent =
        currentQuiz.questions.length;


    document.getElementById("resultCorrect")
        .textContent =
        correct;


    document.getElementById("resultWrong")
        .textContent =
        wrong;


    document.getElementById("resultMarks")
        .textContent =
        marksObtained;


    document.getElementById("resultTotalMarks")
        .textContent =
        totalMarks;


    document.getElementById("resultTime")
        .textContent =
        `${timeTakenMinutes} min`;


    document.getElementById("resultRank")
        .textContent =
        `#${rank}`;


    document.getElementById("scorePercentage")
        .textContent =
        `${percentage}%`;


    document.getElementById("resultStatus")
        .textContent =
        percentage >= 40
            ? "PASS"
            : "FAIL";


    document.getElementById("resultMessage")
        .textContent =
        autoSubmit
            ? "Time expired. Your quiz was automatically submitted."
            : "You have successfully completed the quiz.";


    /*
       Store the latest result
       temporarily for certificate.
    */

    window.latestResult = {

        quizTitle: currentQuiz.title,

        percentage,

        marksObtained,

        totalMarks,

        date:
            new Date().toLocaleDateString(),

        certificateId:
            "QW-" +
            Date.now().toString().slice(-6)

    };


    hideAllPages();

    resultPage.classList.remove("hidden");

}


/* =========================
   CERTIFICATE
========================= */

document
    .getElementById("certificateBtn")
    .addEventListener(
        "click",
        function() {

            if (!window.latestResult) {

                return;

            }


            const result =
                window.latestResult;


            document.getElementById(
                "certificateStudent"
            ).textContent =
                currentUser.name;


            document.getElementById(
                "certificateQuiz"
            ).textContent =
                result.quizTitle;


            document.getElementById(
                "certificateScore"
            ).textContent =
                `${result.percentage}%`;


            document.getElementById(
                "certificateDate"
            ).textContent =
                result.date;


            document.getElementById(
                "certificateId"
            ).textContent =
                result.certificateId;


            hideAllPages();

            certificatePage.classList.remove(
                "hidden"
            );

        }
    );


/* =========================
   CERTIFICATE BACK
========================= */

document
    .getElementById("certificateBackBtn")
    .addEventListener(
        "click",
        function() {

            hideAllPages();

            resultPage.classList.remove(
                "hidden"
            );

        }
    );


/* =========================
   DASHBOARD BUTTON
========================= */

document
    .getElementById("dashboardBtn")
    .addEventListener(
        "click",
        function() {

            openStudentDashboard();

        }
    );


/* =========================
   STUDENT LOGIN BUTTON
========================= */

document
    .getElementById("studentLoginBtn")
    .addEventListener(
        "click",
        openStudentLogin
    );


/* =========================
   ADMIN LOGIN BUTTON
========================= */

document
    .getElementById("adminLoginBtn")
    .addEventListener(
        "click",
        openAdminLogin
    );


/* =========================
   HEADER LOGIN
========================= */

document
    .getElementById("loginHeaderBtn")
    .addEventListener(
        "click",
        openStudentLogin
    );


/* =========================
   BACK HOME
========================= */

document
    .getElementById("backHomeBtn")
    .addEventListener(
        "click",
        showHome
    );


/* =========================
   STUDENT LOGOUT
========================= */

document
    .getElementById("studentLogoutBtn")
    .addEventListener(
        "click",
        function() {

            currentUser = null;

            clearInterval(timerInterval);

            showHome();

        }
    );


/* =========================
   ADMIN DASHBOARD
========================= */

function openAdminDashboard() {

    hideAllPages();

    adminDashboard.classList.remove(
        "hidden"
    );

}


/* =========================
   ADMIN LOGOUT
========================= */

document
    .getElementById("adminLogoutBtn")
    .addEventListener(
        "click",
        function() {

            currentUser = null;

            showHome();

        }
    );


/* =========================
   ADMIN CREATE QUIZ DEMO
========================= */

document
    .getElementById("adminCreateQuizBtn")
    .addEventListener(
        "click",
        function() {

            alert(
                "Quiz Creator\n\n" +
                "The full Admin Quiz Creator will be added in the next version.\n\n" +
                "Admin will be able to set:\n" +
                "• Quiz Name\n" +
                "• Category\n" +
                "• Description\n" +
                "• Number of Questions\n" +
                "• Time Limit\n" +
                "• Marks\n" +
                "• Start / End Date\n" +
                "• Active / Inactive"
            );

        }
    );


/* =========================
   INITIAL STATE
========================= */

showHome();
