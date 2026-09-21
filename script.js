/* =========================================================
   CLJ 1 EDUCATIONAL WEBSITE
   JAVASCRIPT
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    /* =========================
       ELEMENTS
    ========================== */
    const body = document.body;
    const themeToggle =
        document.getElementById("themeToggle");
    const themeIcon =
        document.getElementById("themeIcon");
    const menuToggle =
        document.getElementById("menuToggle");
    const navLinks =
        document.getElementById("navLinks");
    const progressBar =
        document.getElementById("scrollProgress");
    const backToTop =
        document.getElementById("backToTop");
    const year =
        document.getElementById("year");
    /* =========================
       YEAR
    ========================== */
    if (year) {
        year.textContent =
            new Date().getFullYear();
    }
    /* =========================
       DARK / LIGHT MODE
    ========================== */
    const savedTheme =
        localStorage.getItem("clj-theme");
    if (savedTheme === "dark") {
        body.classList.add("dark");
        if (themeIcon) {
            themeIcon.textContent = "☀";
        }
    } else {
        if (themeIcon) {
            themeIcon.textContent = "☾";
        }
    }
    themeToggle?.addEventListener("click", () => {
        body.classList.toggle("dark");
        const isDark =
            body.classList.contains("dark");
        localStorage.setItem(
            "clj-theme",
            isDark ? "dark" : "light"
        );
        if (themeIcon) {
            themeIcon.textContent =
                isDark ? "☀" : "☾";
        }
    });
    /* =========================
       MOBILE MENU
    ========================== */
    menuToggle?.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        const opened =
            navLinks.classList.contains("open");
        menuToggle.textContent =
            opened ? "✕" : "☰";
    });
    document.querySelectorAll(".nav-links a")
        .forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.textContent = "☰";
            });
        });
    /* =========================
       SCROLL PROGRESS
    ========================== */
    function updateScrollProgress() {
        const scrollTop =
            window.scrollY;
        const pageHeight =
            document.documentElement.scrollHeight
            - window.innerHeight;
        const percentage =
            pageHeight > 0
                ? (scrollTop / pageHeight) * 100
                : 0;
        if (progressBar) {
            progressBar.style.width =
                ${percentage}%;
        }
    }
    /* =========================
       BACK TO TOP
    ========================== */
    function updateBackToTop() {
        if (!backToTop) return;
        if (window.scrollY > 500) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }
    }
    window.addEventListener(
        "scroll",
        () => {
            updateScrollProgress();
            updateBackToTop();
        },
        { passive: true }
    );
    backToTop?.addEventListener(
        "click",
        () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    );
    /* =========================
       PILLARS
    ========================== */
    const pillarButtons =
        document.querySelectorAll(".pillar");
    const pillarDetail =
        document.getElementById("pillarDetail");
    const pillarData = {
        law: {
            number: "01",
            icon: "◉",
            title: "Law Enforcement",
            description:
                "The prime mover of the system or the initiator of the criminal justice cycle. The handout identifies the first pillar as consisting mainly of the Philippine National Police.",
            points: [
                "The PNP shall take the lead in investigation and gathering of evidence.",
                "It responds to violations of peace and safety in the community.",
                "The handout identifies NBI, PDEA, Bureau of Customs, Bureau of Immigration, and Philippine Coast Guard among law enforcement agencies."
            ]
        },
        prosecution: {
            number: "02",
            icon: "§",
            title: "Prosecution",
            description:
                "Prosecution is identified by the handout as one of the five components of the Philippine Criminal Justice System.",
            points: [
                "The handout identifies Prosecution as one of the five components.",
                "The uploaded pages do not provide a separate detailed discussion of this pillar."
            ]
        },
        courts: {
            number: "03",
            icon: "⚖",
            title: "Courts",
            description:
                "Courts are identified by the handout as one of the five components of the Philippine Criminal Justice System.",
            points: [
                "The handout identifies Courts as one of the five components.",
                "The uploaded pages do not provide a separate detailed discussion of this pillar."
            ]
        },
        corrections: {
            number: "04",
            icon: "▣",
            title: "Corrections",
            description:
                "Corrections is identified by the handout as one of the five components of the Philippine Criminal Justice System.",
            points: [
                "The handout identifies Corrections as one of the five components.",
                "The uploaded pages do not provide a separate detailed discussion of this pillar."
            ]
        },
        community: {
            number: "05",
            icon: "◎",
            title: "Community",
            description:
                "Community is identified by the handout as one of the five components of the Philippine Criminal Justice System.",
            points: [
                "The handout identifies the Community as one of the five components.",
                "The uploaded pages do not provide a separate detailed discussion of this pillar."
            ]
        }
    };
    function renderPillar(key) {
        const data =
            pillarData[key];
        if (!data || !pillarDetail) return;
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
                ${data.description}
            </p>
            <ul>
                ${data.points.map(point => `
                    <li>${point}</li>
                `).join("")}
            </ul>
            <div class="source-note">
                The uploaded handout names all five pillars but
                provides detailed discussion in these pages mainly
                for Law Enforcement.
            </div>
        `;
    }
    pillarButtons.forEach(button => {
        button.addEventListener("click", () => {
            pillarButtons.forEach(item => {
                item.classList.remove("active");
            });
            button.classList.add("active");
            renderPillar(
                button.dataset.pillar
            );
        });
    });
    /* =========================
       ARREST TABS
    ========================== */
    const tabs =
        document.querySelectorAll(".tab");
    const panels =
        document.querySelectorAll(".tab-panel");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const target =
                tab.dataset.tab;
            tabs.forEach(item => {
                item.classList.remove("active");
            });
            panels.forEach(panel => {
                panel.classList.remove("active");
            });
            tab.classList.add("active");
            const selected =
                document.getElementById(target);
            selected?.classList.add("active");
        });
    });
    /* =========================
       REVEAL ON SCROLL
    ========================== */
    const revealElements =
        document.querySelectorAll(".reveal");
    const revealObserver =
        new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        revealObserver.unobserve(
                            entry.target
                        );
                    }
                });
            },
            {
                threshold: 0.12
            }
        );
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    /* =========================
       QUIZ DATA
       
       Correct answers are stored
       internally so the site can
       calculate the score.
    ========================== */
    const quizQuestions = [
        {
            question:
                "What is crime according to the handout?",
            options: [
                "An act or omission punishable by public laws.",
                "Any disagreement between two persons.",
                "A private rule created by a community.",
                "Any act that receives social criticism."
            ],
            answer: 0
        },
        {
            question:
                "Which term refers to violations of the Revised Penal Code?",
            options: [
                "Felonies",
                "Offenses",
                "Delinquency",
                "Infractions or Misdemeanors"
            ],
            answer: 0
        },
        {
            question:
                "Which three branches of government are identified in the handout as co-equal and observing separation of powers?",
            options: [
                "Executive, Legislative and Judiciary",
                "Police, Courts and Corrections",
                "Executive, Police and Community",
                "Legislative, Police and Prosecution"
            ],
            answer: 0
        },
        {
            question:
                "Which is described in the handout as the first known body of law, promulgated by King Hammurabi of ancient Babylon?",
            options: [
                "Code of Hammurabi",
                "Roman Law",
                "Common Law",
                "Magna Carta"
            ],
            answer: 0
        },
        {
            question:
                "Which statement describes justice according to the handout?",
            options: [
                "The act of rendering what are due and treating persons equally.",
                "The punishment of every person accused of an offense.",
                "The investigation of every reported crime.",
                "The creation of rules by law enforcement agencies."
            ],
            answer: 0
        },
        {
            question:
                "Which dimension of justice focuses on the fairness of the processes by which decisions are made?",
            options: [
                "Procedural Justice",
                "Distributive Justice",
                "Restorative Justice",
                "Substantive Justice"
            ],
            answer: 0
        },
        {
            question:
                "Which list contains the five components of the Philippine Criminal Justice System identified in the handout?",
            options: [
                "Law Enforcement, Prosecution, Courts, Corrections and Community",
                "Law Enforcement, Military, Senate, Corrections and Community",
                "Police, Congress, Courts, Jail and Community",
                "Law Enforcement, Prosecution, Military, Courts and Jail"
            ],
            answer: 0
        },
        {
            question:
                "Which of the following is identified as a valid warrantless arrest?",
            options: [
                "In flagrante delicto arrest",
                "Arrest based only on an anonymous rumor",
                "Arrest based only on a personal disagreement",
                "Arrest without any identified circumstance"
            ],
            answer: 0
        },
        {
            question:
                "According to the handout, what is the validity period of a search warrant?",
            options: [
                "Ten (10) days",
                "Five (5) days",
                "Thirty (30) days",
                "One (1) year"
            ],
            answer: 0
        },
        {
            question:
                "What is the distinction given in the handout between instigation and entrapment?",
            options: [
                "Instigation induces a person to commit a crime, while entrapment uses means to catch a person who has already committed a crime.",
                "Instigation and entrapment are described as exactly the same.",
                "Instigation refers to search, while entrapment refers to seizure.",
                "Instigation applies only to warrants, while entrapment applies only to courts."
            ],
            answer: 0
        }
    ];
    /* =========================
       QUIZ VARIABLES
    ========================== */
    let currentQuestion = 0;
    let score = 0;
    let answered = false;
    const quizContent =
        document.getElementById("quizContent");
    const questionCounter =
        document.getElementById("questionCounter");
    const scoreDisplay =
        document.getElementById("score");
    const quizProgress =
        document.getElementById("quizProgress");
    const nextQuestion =
        document.getElementById("nextQuestion");
    const restartQuiz =
        document.getElementById("restartQuiz");
    /* =========================
       RENDER QUESTION
    ========================== */
    function renderQuestion() {
        if (!quizContent) return;
        answered = false;
        nextQuestion.disabled = true;
        nextQuestion.textContent =
            currentQuestion === quizQuestions.length - 1
                ? "See Results →"
                : "Next Question →";
        const item =
            quizQuestions[currentQuestion];
        questionCounter.textContent =
            Question ${currentQuestion + 1} of ${quizQuestions.length};
        const percentage =
            ((currentQuestion + 1) /
                quizQuestions.length) * 100;
        quizProgress.style.width =
            ${percentage}%;
        quizContent.innerHTML = `
            <div class="question-box">
                <span class="question-number">
                    QUESTION ${String(currentQuestion + 1).padStart(2, "0")}
                </span>
                <h3>
                    ${item.question}
                </h3>
                <div class="options">
                    ${item.options.map((option, index) => `
                        <button
                            class="option"
                            data-index="${index}"
                        >
                            <span class="option-letter">
                                ${String.fromCharCode(65 + index)}
                            </span>
                            <span>
                                ${option}
                            </span>
                        </button>
                    `).join("")}
                </div>
                <div
                    class="quiz-feedback hidden"
                    id="quizFeedback"
                ></div>
            </div>
        `;
        document
            .querySelectorAll(".option")
            .forEach(option => {
                option.addEventListener(
                    "click",
                    () => selectAnswer(option)
                );
            });
    }
    /* =========================
       SELECT ANSWER
    ========================== */
    function selectAnswer(selectedOption) {
        if (answered) return;
        answered = true;
        const selectedIndex =
            Number(selectedOption.dataset.index);
        const correctIndex =
            quizQuestions[currentQuestion].answer;
        const options =
            document.querySelectorAll(".option");
        options.forEach(option => {
            option.disabled = true;
        });
        if (selectedIndex === correctIndex) {
            selectedOption.classList.add("correct");
            score++;
            scoreDisplay.textContent =
                score;
        } else {
            selectedOption.classList.add("wrong");
        }
        const feedback =
            document.getElementById("quizFeedback");
        if (feedback) {
            feedback.classList.remove("hidden");
            if (selectedIndex === correctIndex) {
                feedback.textContent =
                    "Correct! Your answer matches the information presented in the handout.";
            } else {
                feedback.textContent =
                    "Not quite. Review the topic in the reviewer and continue to the next question.";
            }
        }
        nextQuestion.disabled = false;
    }
    /* =========================
       NEXT QUESTION
    ========================== */
    nextQuestion?.addEventListener(
        "click",
        () => {
            if (!answered) return;
            if (
                currentQuestion <
                quizQuestions.length - 1
            ) {
                currentQuestion++;
                renderQuestion();
                return;
            }
            showResults();
        }
    );
    /* =========================
       RESULTS
    ========================== */
    function showResults() {
        const percentage =
            Math.round(
                (score / quizQuestions.length) * 100
            );
        let message = "";
        if (percentage === 100) {
            message =
                "Excellent! You answered every question correctly.";
        } else if (percentage >= 80) {
            message =
                "Great work! You demonstrated strong understanding of the reviewer.";
        } else if (percentage >= 60) {
            message =
                "Good effort! Review the handout once more to strengthen your understanding.";
        } else {
            message =
                "Keep studying! Revisit the sections above and try the quiz again.";
        }
        quizContent.innerHTML = `
            <div class="result-card">
                <div class="result-score">
                    ${percentage}%
                </div>
                <h3>
                    Quiz Complete
                </h3>
                <p>
                    You scored
                    <strong>${score}</strong>
                    out of
                    <strong>${quizQuestions.length}</strong>.
                </p>
                <p style="margin-top:10px;">
                    ${message}
                </p>
            </div>
        `;
        questionCounter.textContent =
            "Quiz Finished";
        quizProgress.style.width =
            "100%";
        nextQuestion.classList.add("hidden");
        restartQuiz.classList.remove("hidden");
    }
    /* =========================
       RESTART QUIZ
    ========================== */
    restartQuiz?.addEventListener(
        "click",
        () => {
            currentQuestion = 0;
            score = 0;
            answered = false;
            scoreDisplay.textContent =
                "0";
            nextQuestion.classList.remove(
                "hidden"
            );
            restartQuiz.classList.add(
                "hidden"
            );
            renderQuestion();
            document
                .getElementById("quiz")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
        }
    );
    /* =========================
       INITIALIZE QUIZ
    ========================== */
    renderQuestion();
    /* =========================
       ACTIVE NAVIGATION
    ========================== */
    const sections =
        document.querySelectorAll(
            "main section[id]"
        );
    const navAnchors =
        document.querySelectorAll(
            ".nav-links a"
        );
    const sectionObserver =
        new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        return;
                    }
                    navAnchors.forEach(anchor => {
                        anchor.classList.remove(
                            "active-nav"
                        );
                        if (
                            anchor.getAttribute("href") ===
                            #${entry.target.id}
                        ) {
                            anchor.classList.add(
                                "active-nav"
                            );
                        }
                    });
                });
            },
            {
                rootMargin:
                    "-30% 0px -60% 0px"
            }
        );
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    /* =========================
       INITIAL SCROLL UPDATE
    ========================== */
    updateScrollProgress();
    updateBackToTop();
});
