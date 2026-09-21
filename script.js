/* =========================================================
   CLJ 1 • CRIMINAL JUSTICE REVIEWER
   Interactive functionality
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  /* ---------- Theme ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  const savedTheme = localStorage.getItem("clj1-theme");

  if (savedTheme === "dark") {
    body.classList.add("dark");
  }

  function updateThemeIcon() {
    if (themeIcon) {
      themeIcon.textContent = body.classList.contains("dark") ? "☀" : "☾";
    }
  }

  updateThemeIcon();

  themeToggle?.addEventListener("click", () => {
    body.classList.toggle("dark");

    localStorage.setItem(
      "clj1-theme",
      body.classList.contains("dark") ? "dark" : "light"
    );

    updateThemeIcon();
  });


  /* ---------- Reading Progress ---------- */

  const progressBar = document.getElementById("progressBar");

  function updateProgress() {
    const scrollTop = window.scrollY;

    const height =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      height > 0 ? (scrollTop / height) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  }

  window.addEventListener("scroll", updateProgress, {
    passive: true
  });

  updateProgress();


  /* ---------- Active Navigation ---------- */

  const navLinks = [
    ...document.querySelectorAll(".main-nav a[href^='#']")
  ];

  const sections = navLinks
    .map(link =>
      document.querySelector(link.getAttribute("href"))
    )
    .filter(Boolean);

  const navObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {

        if (entry.isIntersecting) {

          navLinks.forEach(link =>
            link.classList.remove("active")
          );

          const active = navLinks.find(
            link =>
              link.getAttribute("href") ===
              `#${entry.target.id}`
          );

          active?.classList.add("active");
        }
      });
    },
    {
      rootMargin: "-25% 0px -60% 0px",
      threshold: 0
    }
  );

  sections.forEach(section =>
    navObserver.observe(section)
  );


  /* ---------- Reveal Animations ---------- */

  const revealItems = document.querySelectorAll(
    ".info-card, " +
    ".panel, " +
    ".history-grid article, " +
    ".type-card, " +
    ".compare-card, " +
    ".agency-grid > div, " +
    ".challenge-grid .flip-card"
  );

  revealItems.forEach(item =>
    item.classList.add("reveal")
  );

  const revealObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);
        }
      });

    },
    {
      threshold: 0.08
    }
  );

  revealItems.forEach(item =>
    revealObserver.observe(item)
  );


  /* =========================================================
     FIVE PILLARS
     ========================================================= */

  const pillarData = {

    "Law Enforcement": {
      number: "01",
      title: "Law Enforcement",
      text:
        "The prime mover or initiator of the criminal justice cycle. The first pillar consists mainly of the PNP and leads in investigation, evidence gathering, and responding to violations of peace and safety."
    },

    "Prosecution": {
      number: "02",
      title: "Prosecution",
      text:
        "The second pillar of the Philippine Criminal Justice System. Use the supplied handout material as the basis for reviewing its role in the criminal justice process."
    },

    "Courts": {
      number: "03",
      title: "Courts",
      text:
        "The third pillar. Courts form part of the due-process structure through which criminal cases are considered and resolved."
    },

    "Corrections": {
      number: "04",
      title: "Corrections",
      text:
        "The fourth pillar. Corrections is one of the five components identified by the handout as part of the Philippine Criminal Justice System."
    },

    "Community": {
      number: "05",
      title: "Community",
      text:
        "The fifth pillar. The community is included in the Philippine Criminal Justice System's five-pillar structure."
    }

  };


  const pillarDetail =
    document.getElementById("pillarDetail");

  const pillarButtons =
    document.querySelectorAll(".pillar");


  function selectPillar(button) {

    const name = button.dataset.pillar;

    const data = pillarData[name];

    if (!data || !pillarDetail) return;


    pillarButtons.forEach(btn =>
      btn.classList.remove("selected")
    );

    button.classList.add("selected");


    pillarDetail.innerHTML = `

      <div class="detail-icon">
        ${data.number}
      </div>

      <div>

        <h3>
          ${data.title}
        </h3>

        <p>
          ${data.text}
        </p>

      </div>

    `;
  }


  pillarButtons.forEach(button => {

    button.addEventListener("click", () => {
      selectPillar(button);
    });

  });


  /* =========================================================
     ACCORDION
     ========================================================= */

  const accordionItems =
    document.querySelectorAll(".accordion-item");


  accordionItems.forEach(item => {

    const content =
      item.nextElementSibling;


    if (item.classList.contains("open")) {
      content?.classList.add("open");
    }


    item.addEventListener("click", () => {

      const isOpen =
        item.classList.contains("open");


      accordionItems.forEach(other => {

        other.classList.remove("open");

        other.nextElementSibling
          ?.classList.remove("open");

      });


      if (!isOpen) {

        item.classList.add("open");

        content?.classList.add("open");

      }

    });

  });


  /* =========================================================
     TABS
     ========================================================= */

  const tabs =
    document.querySelectorAll(".tab");

  const panels =
    document.querySelectorAll(".tab-panel");


  tabs.forEach(tab => {

    tab.addEventListener("click", () => {

      const targetId =
        tab.dataset.tab;


      tabs.forEach(t =>
        t.classList.remove("active")
      );

      panels.forEach(panel =>
        panel.classList.remove("active")
      );


      tab.classList.add("active");

      document
        .getElementById(targetId)
        ?.classList.add("active");

    });

  });


  /* =========================================================
     CHALLENGE FLIP CARDS
     ========================================================= */

  document
    .querySelectorAll(".flip-card")
    .forEach(card => {

      card.addEventListener("click", () => {

        card.classList.toggle("flipped");

      });


      card.addEventListener("keydown", event => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          card.classList.toggle("flipped");

        }

      });

    });


  /* =========================================================
     QUIZ
     ========================================================= */

  const quizQuestions = [

    {
      question:
        "Which dimension of justice focuses on fairness of the processes by which decisions are made?",

      options: [
        "Distributive Justice",
        "Procedural Justice",
        "Restorative Justice",
        "Substantive Justice"
      ],

      answer: 1,

      explanation:
        "Procedural Justice focuses on the fairness of decision-making processes."
    },


    {
      question:
        "Which is identified as the prime mover or initiator of the criminal justice cycle?",

      options: [
        "Courts",
        "Community",
        "Law Enforcement",
        "Corrections"
      ],

      answer: 2,

      explanation:
        "The handout identifies Law Enforcement as the prime mover or initiator."
    },


    {
      question:
        "Which is NOT listed as a valid warrantless arrest circumstance in the handout?",

      options: [
        "In flagrante delicto",
        "Hot pursuit",
        "Arrest of an escapee",
        "Administrative arrest"
      ],

      answer: 3,

      explanation:
        "The three listed circumstances are in flagrante delicto, hot pursuit, and arrest of an escapee."
    },


    {
      question:
        "What does nullum crimen nulla poena sine lege mean in the handout?",

      options: [
        "Every crime requires a victim",
        "There is no crime where there is no law punishing it",
        "Every law requires a court order",
        "Justice must always involve imprisonment"
      ],

      answer: 1,

      explanation:
        "The phrase means there is no crime where there is no law punishing it."
    },


    {
      question:
        "How long is a search warrant valid according to the supplied handout?",

      options: [
        "5 days",
        "10 days",
        "15 days",
        "30 days"
      ],

      answer: 1,

      explanation:
        "The handout states that a search warrant has a validity period of ten (10) days."
    },


    {
      question:
        "Which historical legal foundation was signed on June 15, 1215 by King John of England?",

      options: [
        "Roman Law",
        "Magna Carta",
        "Canon Law",
        "Code of Hammurabi"
      ],

      answer: 1,

      explanation:
        "The handout identifies the Magna Carta and gives June 15, 1215 as its date."
    },


    {
      question:
        "Which term refers to police inducing a person to commit a crime that would not otherwise be committed?",

      options: [
        "Entrapment",
        "Instigation",
        "Hot pursuit",
        "Plain view"
      ],

      answer: 1,

      explanation:
        "The handout describes this as instigation and states that it is not valid."
    },


    {
      question:
        "Which body of law is described in the handout as a written code from the pre-Spanish era?",

      options: [
        "Maragtas Code",
        "Magna Carta",
        "Twelve Tables",
        "Germanic Law"
      ],

      answer: 0,

      explanation:
        "The handout identifies the Maragtas Code as a written code in the pre-Spanish era."
    },


    {
      question:
        "Which of the following is one of the five pillars of the Philippine Criminal Justice System?",

      options: [
        "Legislature",
        "Community",
        "Media",
        "Education"
      ],

      answer: 1,

      explanation:
        "The five pillars listed are Law Enforcement, Prosecution, Courts, Corrections, and Community."
    },


    {
      question:
        "Which type of due process protects individuals from unreasonable, oppressive, or arbitrary laws?",

      options: [
        "Procedural due process",
        "Substantive due process",
        "Administrative due process",
        "Criminal due process"
      ],

      answer: 1,

      explanation:
        "Substantive due process concerns the law itself, regardless of the procedure used to enforce it."
    }

  ];


  const quizContent =
    document.getElementById("quizContent");

  const questionCounter =
    document.getElementById("questionCounter");

  const quizProgress =
    document.getElementById("quizProgress");

  const scoreBadge =
    document.getElementById("scoreBadge");

  const nextQuestion =
    document.getElementById("nextQuestion");

  const restartQuiz =
    document.getElementById("restartQuiz");


  let currentQuestion = 0;

  let score = 0;

  let answered = false;


  /* ---------- Render Question ---------- */

  function renderQuestion() {

    if (!quizContent) return;


    const q =
      quizQuestions[currentQuestion];


    answered = false;


    if (questionCounter) {

      questionCounter.textContent =
        `Question ${currentQuestion + 1} of ${quizQuestions.length}`;

    }


    if (quizProgress) {

      quizProgress.style.width =
        `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;

    }


    if (nextQuestion) {
      nextQuestion.disabled = true;
    }


    quizContent.innerHTML = `

      <div class="quiz-question">

        <h3>
          ${escapeHTML(q.question)}
        </h3>

        <div class="quiz-options">

          ${q.options.map((option, index) => `

            <button
              class="quiz-option"
              type="button"
              data-answer="${index}"
            >

              <strong>
                ${String.fromCharCode(65 + index)}.
              </strong>

              ${escapeHTML(option)}

            </button>

          `).join("")}

        </div>

        <div
          class="quiz-feedback"
          id="quizFeedback"
          aria-live="polite"
        ></div>

      </div>

    `;


    quizContent
      .querySelectorAll(".quiz-option")
      .forEach(option => {

        option.addEventListener("click", () => {

          chooseAnswer(
            Number(option.dataset.answer)
          );

        });

      });

  }


  /* ---------- Choose Answer ---------- */

  function chooseAnswer(selected) {

    if (answered) return;


    answered = true;


    const q =
      quizQuestions[currentQuestion];


    const options =
      [
        ...quizContent.querySelectorAll(
          ".quiz-option"
        )
      ];


    const feedback =
      document.getElementById(
        "quizFeedback"
      );


    options.forEach(option => {

      option.disabled = true;


      const answerIndex =
        Number(option.dataset.answer);


      if (answerIndex === q.answer) {

        option.classList.add(
          "correct"
        );

      }


      if (
        answerIndex === selected &&
        selected !== q.answer
      ) {

        option.classList.add(
          "wrong"
        );

      }

    });


    if (selected === q.answer) {

      score++;


      feedback.textContent =
        `✓ Correct! ${q.explanation}`;

      feedback.style.color =
        "var(--success)";

    } else {

      feedback.textContent =
        `✗ Not quite. ${q.explanation}`;

      feedback.style.color =
        "var(--danger)";

    }


    if (scoreBadge) {

      scoreBadge.textContent =
        `Score: ${score}`;

    }


    if (nextQuestion) {

      nextQuestion.disabled = false;

    }

  }


  /* ---------- Show Quiz Result ---------- */

  function showResult() {

    if (!quizContent) return;


    const percentage =
      Math.round(
        (score / quizQuestions.length) * 100
      );


    if (questionCounter) {

      questionCounter.textContent =
        "Quiz complete";

    }


    if (quizProgress) {

      quizProgress.style.width =
        "100%";

    }


    quizContent.innerHTML = `

      <div class="quiz-result">

        <span class="eyebrow">
          Knowledge check finished
        </span>

        <h3>
          Your result
        </h3>

        <span class="result-score">
          ${score}/${quizQuestions.length}
        </span>

        <p>
          You answered ${percentage}% of the
          questions correctly.
        </p>

        <p class="muted">
          Review the sections above and try
          again to reinforce recall.
        </p>

      </div>

    `;


    if (nextQuestion) {

      nextQuestion.disabled = true;

    }

  }


  /* ---------- Next Question ---------- */

  function goNext() {

    if (!answered) return;


    if (
      currentQuestion <
      quizQuestions.length - 1
    ) {

      currentQuestion++;

      renderQuestion();

    } else {

      showResult();

    }

  }


  /* ---------- Restart Quiz ---------- */

  function restart() {

    currentQuestion = 0;

    score = 0;

    answered = false;


    if (scoreBadge) {

      scoreBadge.textContent =
        "Score: 0";

    }


    renderQuestion();

  }


  nextQuestion?.addEventListener(
    "click",
    goNext
  );


  restartQuiz?.addEventListener(
    "click",
    restart
  );


  /* ---------- Escape HTML ---------- */

  function escapeHTML(value) {

    return String(value)

      .replaceAll("&", "&amp;")

      .replaceAll("<", "&lt;")

      .replaceAll(">", "&gt;")

      .replaceAll('"', "&quot;")

      .replaceAll("'", "&#039;");

  }


  /* Start Quiz */

  renderQuestion();


  /* =========================================================
     BACK TO TOP
     ========================================================= */

  const backTop =
    document.getElementById("backTop");


  backTop?.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });


  /* =========================================================
     KEYBOARD SHORTCUT
     Press T to change theme
     ========================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key.toLowerCase() === "t" &&
        !["INPUT", "TEXTAREA"].includes(
          document.activeElement?.tagName
        )
      ) {

        themeToggle?.click();

      }

    }
  );

});
