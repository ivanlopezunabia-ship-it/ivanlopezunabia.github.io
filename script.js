/* =========================================================
   CLJ 1 EDUCATIONAL WEBSITE
   JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;

    const themeToggle =
        document.getElementById("themeToggle");

    const themeIcon =
        document.getElementById("themeIcon");

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");

    const scrollProgress =
        document.getElementById("scrollProgress");

    const backToTop =
        document.getElementById("backToTop");

    const yearElement =
        document.getElementById("year");


    /* =====================================================
       YEAR
    ===================================================== */

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       DARK MODE
    ===================================================== */

    const savedTheme =
        localStorage.getItem("clj1-theme");

    if (savedTheme === "dark") {
        body.classList.add("dark-mode");

        if (themeIcon) {
            themeIcon.textContent = "☀";
        }
    }

    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            body.classList.toggle("dark-mode");

            const isDark =
                body.classList.contains("dark-mode");

            localStorage.setItem(
                "clj1-theme",
                isDark ? "dark" : "light"
            );

            if (themeIcon) {
                themeIcon.textContent =
                    isDark ? "☀" : "☾";
            }

        });

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navLinks.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

            menuToggle.textContent =
                isOpen ? "✕" : "☰";

        });


        /* Close menu after clicking navigation link */

        navLinks
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener("click", () => {

                    navLinks.classList.remove("open");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                    menuToggle.textContent = "☰";

                });

            });

    }


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    function updateScrollProgress() {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        if (scrollProgress) {
            scrollProgress.style.width =
                `${percentage}%`;
        }

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    function updateBackToTop() {

        if (!backToTop) {
            return;
        }

        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    }

    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header =
        document.querySelector(".header");

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const navigationLinks =
        document.querySelectorAll(
            ".nav-links a"
        );

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    function updateActiveNavigation() {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 150;

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {
                currentSection =
                    section.getAttribute("id");
            }

        });

        navigationLinks.forEach((link) => {

            const href =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === `#${currentSection}`
            );

        });

    }


    /* =====================================================
       SCROLL EVENT
    ===================================================== */

    function handleScroll() {

        updateScrollProgress();
        updateBackToTop();
        updateHeader();
        updateActiveNavigation();

    }

    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );

    handleScroll();


    /* =====================================================
       REVEAL ANIMATIONS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       FIVE PILLARS
    ===================================================== */

    const pillarButtons =
        document.querySelectorAll(".pillar");

    const pillarDetail =
        document.getElementById("pillarDetail");


    const pillarData = {

        law: {
            number: "01",
            title: "Law Enforcement",
            icon: "◉",
            text:
                "The prime mover of the system or the initiator of the criminal justice cycle. The handout identifies the first pillar as consisting mainly of the Philippine National Police.",
            bullets: [
                "The PNP shall take the lead in investigation and gathering of evidence.",
                "It responds to violations of peace and safety in the community.",
                "The handout also identifies NBI, PDEA, Bureau of Customs, Bureau of Immigration, and Philippine Coast Guard among law enforcement agencies."
            ]
        },

        prosecution: {
            number: "02",
            title: "Prosecution",
            icon: "⚖",
            text:
                "The second pillar of the Philippine Criminal Justice System identified in the handout.",
            bullets: [
                "Prosecution is identified as one of the five pillars of the Philippine Criminal Justice System.",
                "It forms part of the criminal justice process described in the handout.",
                "The five pillars work together as components of the criminal justice system."
            ]
        },

        courts: {
            number: "03",
            title: "Courts",
            icon: "§",
            text:
                "The third pillar identified in the Philippine Criminal Justice System.",
            bullets: [
                "Courts are identified as one of the five pillars.",
                "The courts form part of the criminal justice process.",
                "The handout connects the criminal justice system with due process."
            ]
        },

        corrections: {
            number: "04",
            title: "Corrections",
            icon: "▣",
            text:
                "The fourth pillar identified in the Philippine Criminal Justice System.",
            bullets: [
                "Corrections is identified as one of the five pillars.",
                "It forms part of the criminal justice system.",
                "The five pillars function as components of the criminal justice process."
            ]
        },

        community: {
            number: "05",
            title: "Community",
            icon: "◎",
            text:
                "The fifth pillar identified in the Philippine Criminal Justice System.",
            bullets: [
                "Community is identified as one of the five pillars.",
                "The community forms part of the criminal justice system.",
                "The handout identifies the five pillars as components of the Philippine Criminal Justice System."
            ]
        }

    };


    function updatePillar(key) {

        if (!pillarDetail) {
            return;
        }

        const data =
            pillarData[key];

        if (!data) {
            return;
        }

        pillarDetail.innerHTML = `
            <span class="pillar-detail-number">
                ${data.number}
            </span>

            <div class="pillar-big-icon">
                ${data.icon}
            </div>

            <h3>
                ${data.title}
            </h3>

            <p>
                ${data.text}
            </p>

            <ul>
                ${data.bullets
                    .map(
                        (item) =>
                            `<li>${item}</li>`
                    )
                    .join("")}
            </ul>

            <div class="source-note">
                Content is presented according to the
                provided CLJ 1 handout.
            </div>
        `;

    }


    pillarButtons.forEach((button) => {

        button.addEventListener("click", () => {

            pillarButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            const pillar =
                button.dataset.pillar;

            updatePillar(pillar);

        });

    });


    /* =====================================================
       ARREST TABS
    ===================================================== */

    const tabButtons =
        document.querySelectorAll(".tab");

    const tabPanels =
        document.querySelectorAll(".tab-panel");


    tabButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const target =
                button.dataset.tab;

            tabButtons.forEach((tab) => {
                tab.classList.remove("active");
            });

            tabPanels.forEach((panel) => {
                panel.classList.remove("active");
            });

            button.classList.add("active");

            const selectedPanel =
                document.getElementById(target);

            if (selectedPanel) {
                selectedPanel.classList.add(
                    "active"
                );
            }

        });

    });


    /* =====================================================
       QUIZ
    ===================================================== */

    const quizContent =
        document.getElementById("quizContent");

    const questionCounter =
        document.getElementById(
            "questionCounter"
        );

    const scoreElement =
        document.getElementById("score");

    const quizProgress =
        document.getElementById(
            "quizProgress"
        );

    const nextQuestion =
        document.getElementById(
            "nextQuestion"
        );

    const restartQuiz =
        document.getElementById(
            "restartQuiz"
        );


    const quizQuestions = [

        {
            question:
                "What is an act or omission punishable by public laws?",
            options: [
                "Justice",
                "Crime",
                "Due Process",
                "Victimology"
            ],
            answer: 1
        },

        {
            question:
                "What Latin principle means there is no crime where there is no law punishing it?",
            options: [
                "Nullum crimen nulla poena sine lege",
                "Habeas corpus",
                "Due process",
                "Equal protection"
            ],
            answer: 0
        },

        {
            question:
                "How many pillars are identified in the Philippine Criminal Justice System?",
            options: [
                "Three",
                "Four",
                "Five",
                "Six"
            ],
            answer: 2
        },

        {
            question:
                "Which pillar is described as the prime mover or initiator of the criminal justice cycle?",
            options: [
                "Courts",
                "Community",
                "Corrections",
                "Law Enforcement"
            ],
            answer: 3
        },

        {
            question:
                "Which dimension of justice focuses on fairness of the processes by which decisions are made?",
            options: [
                "Restorative Justice",
                "Procedural Justice",
                "Distributive Justice",
                "Criminal Justice"
            ],
            answer: 1
        },

        {
            question:
                "What are the essential elements of procedural due process identified in the handout?",
            options: [
                "Crime and punishment",
                "Notice and Hearing",
                "Arrest and seizure",
                "Complaint and conviction"
            ],
            answer: 1
        },

        {
            question:
                "What is the taking of a person into custody of the law?",
            options: [
                "Arrest",
                "Search",
                "Seizure",
                "Prosecution"
            ],
            answer: 0
        },

        {
            question:
                "Which is one of the three valid warrantless arrest circumstances identified in the handout?",
            options: [
                "Plain view",
                "Hot Pursuit",
                "Customs search",
                "Stop and frisk"
            ],
            answer: 1
        },

        {
            question:
                "How long is a search warrant valid according to the handout?",
            options: [
                "5 days",
                "7 days",
                "10 days",
                "30 days"
            ],
            answer: 2
        },

        {
            question:
                "Which historical body of law is associated in the handout with King Hammurabi of ancient Babylon?",
            options: [
                "Roman Law",
                "Common Law",
                "Code of Hammurabi",
                "Canon Law"
            ],
            answer: 2
        }

    ];


    let currentQuestion = 0;
    let score = 0;
    let selectedAnswer = false;


    function renderQuestion() {

        if (
            !quizContent ||
            !questionCounter ||
            !quizProgress
        ) {
            return;
        }

        const question =
            quizQuestions[currentQuestion];

        if (!question) {
            showQuizResult();
            return;
        }

        selectedAnswer = false;

        questionCounter.textContent =
            `Question ${currentQuestion + 1} of ${quizQuestions.length}`;

        quizProgress.style.width =
            `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;

        if (scoreElement) {
            scoreElement.textContent =
                score;
        }

        if (nextQuestion) {
            nextQuestion.disabled = true;
            nextQuestion.textContent =
                currentQuestion ===
                quizQuestions.length - 1
                    ? "Finish Quiz →"
                    : "Next Question →";
        }

        quizContent.innerHTML = `
            <div class="question-title">
                ${question.question}
            </div>

            <div class="quiz-options">
                ${question.options
                    .map(
                        (option, index) => `
                            <button
                                type="button"
                                class="quiz-option"
                                data-answer="${index}"
                            >
                                ${String.fromCharCode(
                                    65 + index
                                )}. ${option}
                            </button>
                        `
                    )
                    .join("")}
            </div>

            <div
                id="quizFeedback"
                class="quiz-feedback hidden"
            ></div>
        `;


        const options =
            quizContent.querySelectorAll(
                ".quiz-option"
            );

        options.forEach((option) => {

            option.addEventListener(
                "click",
                () => {

                    if (selectedAnswer) {
                        return;
                    }

                    selectedAnswer = true;

                    const selected =
                        Number(
                            option.dataset.answer
                        );

                    const correct =
                        question.answer;

                    options.forEach((item) => {

                        item.disabled = true;

                        const itemAnswer =
                            Number(
                                item.dataset.answer
                            );

                        if (
                            itemAnswer ===
                            correct
                        ) {
                            item.classList.add(
                                "correct"
                            );
                        }

                    });

                    const feedback =
                        document.getElementById(
                            "quizFeedback"
                        );

                    if (selected === correct) {

                        score++;

                        option.classList.add(
                            "correct"
                        );

                        if (feedback) {

                            feedback.classList.remove(
                                "hidden"
                            );

                            feedback.textContent =
                                "✓ Correct!";

                        }

                    } else {

                        option.classList.add(
                            "wrong"
                        );

                        if (feedback) {

                            feedback.classList.remove(
                                "hidden"
                            );

                            feedback.textContent =
                                "✗ Incorrect. The correct answer is highlighted.";
                        }

                    }

                    if (scoreElement) {
                        scoreElement.textContent =
                            score;
                    }

                    if (nextQuestion) {
                        nextQuestion.disabled =
                            false;
                    }

                }
            );

        });

    }


    function showQuizResult() {

        if (!quizContent) {
            return;
        }

        if (questionCounter) {
            questionCounter.textContent =
                "Quiz Completed";
        }

        if (quizProgress) {
            quizProgress.style.width = "100%";
        }

        quizContent.innerHTML = `
            <div class="quiz-result">

                <div class="quiz-result-icon">
                    🏆
                </div>

                <h3>
                    Quiz Complete!
                </h3>

                <p>
                    You scored
                    <strong>${score}</strong>
                    out of
                    <strong>${quizQuestions.length}</strong>.
                </p>

            </div>
        `;

        if (nextQuestion) {
            nextQuestion.classList.add(
                "hidden"
            );
        }

        if (restartQuiz) {
            restartQuiz.classList.remove(
                "hidden"
            );
        }

    }


    function resetQuiz() {

        currentQuestion = 0;
        score = 0;
        selectedAnswer = false;

        if (nextQuestion) {
            nextQuestion.classList.remove(
                "hidden"
            );
        }

        if (restartQuiz) {
            restartQuiz.classList.add(
                "hidden"
            );
        }

        if (scoreElement) {
            scoreElement.textContent = "0";
        }

        renderQuestion();

    }


    if (nextQuestion) {

        nextQuestion.addEventListener(
            "click",
            () => {

                if (!selectedAnswer) {
                    return;
                }

                currentQuestion++;

                if (
                    currentQuestion >=
                    quizQuestions.length
                ) {
                    showQuizResult();
                } else {
                    renderQuestion();
                }

            }
        );

    }


    if (restartQuiz) {

        restartQuiz.addEventListener(
            "click",
            resetQuiz
        );

    }


    if (quizContent) {
        renderQuestion();
    }


    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                if (
                    navLinks &&
                    navLinks.classList.contains(
                        "open"
                    )
                ) {

                    navLinks.classList.remove(
                        "open"
                    );

                    if (menuToggle) {

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        menuToggle.textContent =
                            "☰";
                    }

                }

            }

        }
    );


    /* =====================================================
       RESIZE HANDLING
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900 &&
                navLinks &&
                navLinks.classList.contains(
                    "open"
                )
            ) {

                navLinks.classList.remove(
                    "open"
                );

                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.textContent =
                        "☰";
                }

            }

        }
    );

});
