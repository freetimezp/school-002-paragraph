/* =========================================
   SCHOOL 002 — PARAGRAPH TYPOGRAPHY
   Vanilla JavaScript
========================================= */

/* =========================================
   1. TYPOGRAPHY PLAYGROUND
========================================= */

// Get the controls.
const fontSizeInput = document.getElementById("fontSize");
const lineHeightInput = document.getElementById("lineHeight");
const textWidthInput = document.getElementById("textWidth");
const fontFamilyInput = document.getElementById("fontFamily");
const fontWeightInput = document.getElementById("fontWeight");

// Get the labels that display current values.
const fontSizeValue = document.getElementById("fontSizeValue");
const lineHeightValue = document.getElementById("lineHeightValue");
const textWidthValue = document.getElementById("textWidthValue");

// Get the live paragraph preview.
const sampleCopy = document.getElementById("sampleCopy");

// Get the preview statistics.
const statFont = document.getElementById("statFont");
const statLine = document.getElementById("statLine");
const statWidth = document.getElementById("statWidth");
const previewStatus = document.getElementById("previewStatus");

// Store the original settings so Reset restores them.
const defaultSettings = {
    fontSize: 18,
    lineHeight: 1.6,
    textWidth: 560,
    fontFamily: "sans",
    fontWeight: "400",
};

// Update the preview whenever a control changes.
function updateTypography() {
    const fontSize = Number(fontSizeInput.value);
    const lineHeight = Number(lineHeightInput.value);
    const textWidth = Number(textWidthInput.value);

    const fontFamily = fontFamilyInput.value;
    const fontWeight = fontWeightInput.value;

    // Update the paragraph's actual CSS styles.
    sampleCopy.style.fontSize = `${fontSize}px`;
    sampleCopy.style.lineHeight = lineHeight;
    sampleCopy.style.maxWidth = `${textWidth}px`;
    sampleCopy.style.fontWeight = fontWeight;

    // Select the requested font stack.
    const fontFamilies = {
        sans: '"Space Grotesk", Arial, sans-serif',
        serif: 'Georgia, "Times New Roman", serif',
        mono: '"DM Mono", "Courier New", monospace',
    };

    sampleCopy.style.fontFamily = fontFamilies[fontFamily];

    // Update the values beside the sliders.
    fontSizeValue.textContent = `${fontSize}px`;
    lineHeightValue.textContent = lineHeight.toFixed(1);
    textWidthValue.textContent = `${textWidth}px`;

    // Keep the bottom statistics synchronized.
    statFont.textContent = `${fontSize}px`;
    statLine.textContent = lineHeight.toFixed(1);
    statWidth.textContent = `${textWidth}px`;

    // Show that the preview is being customized.
    previewStatus.textContent = "CUSTOM STYLES";
}

// Listen for changes to the controls.
// The input event updates the preview while dragging.
[
    fontSizeInput,
    lineHeightInput,
    textWidthInput,
    fontFamilyInput,
    fontWeightInput,
].forEach((control) => {
    control.addEventListener("input", updateTypography);
});

// Restore every control to its original value.
document.getElementById("resetBtn").addEventListener("click", () => {
    fontSizeInput.value = defaultSettings.fontSize;
    lineHeightInput.value = defaultSettings.lineHeight;
    textWidthInput.value = defaultSettings.textWidth;
    fontFamilyInput.value = defaultSettings.fontFamily;
    fontWeightInput.value = defaultSettings.fontWeight;

    updateTypography();

    // Indicate that the default settings have been restored.
    previewStatus.textContent = "DEFAULT STYLES";
});

// Initialize the preview when the page loads.
updateTypography();
previewStatus.textContent = "DEFAULT STYLES";

/* =========================================
   2. QUICK KNOWLEDGE CHECK
========================================= */

// Three short questions about this lesson.
// Answers use zero-based option indexes.

const quizQuestions = [
    {
        question: "Which HTML element represents a paragraph?",
        code: "<p>Readable text goes here.</p>",
        options: ["<text>", "<paragraph>", "<p>", "<body-text>"],
        answer: 2,
        explanation:
            "The <p> element represents a paragraph of related content.",
    },
    {
        question: "What does line-height control?",
        code: "p {\n    line-height: 1.6;\n}",
        options: [
            "The height of each line box",
            "The maximum width of the paragraph",
            "The thickness of the font",
            "The color of the text",
        ],
        answer: 0,
        explanation:
            "line-height controls the height of line boxes. A unitless value of 1.6 multiplies the element's font size by 1.6.",
    },
    {
        question:
            "Which CSS property limits the width of a paragraph without forcing it to be wider?",
        code: "p {\n    max-width: 65ch;\n}",
        options: ["font-weight", "max-width", "line-height", "text-color"],
        answer: 1,
        explanation:
            "max-width sets an upper limit on the element's width. The ch unit is based on the width of the 0 glyph in the relevant font.",
    },
];

// Quiz state.
let currentQuestion = 0;
let quizScore = 0;
let questionChecked = false;

// Quiz elements.
const checkCard = document.getElementById("checkCard");
const checkCount = document.getElementById("checkCount");
const checkScore = document.getElementById("checkScore");
const miniProgressFill = document.getElementById("miniProgressFill");
const checkQuestion = document.getElementById("checkQuestion");
const checkCode = document.getElementById("checkCode");
const checkOptions = document.getElementById("checkOptions");
const checkFeedback = document.getElementById("checkFeedback");
const checkHint = document.getElementById("checkHint");

const checkAnswerBtn = document.getElementById("checkAnswerBtn");
const checkNextBtn = document.getElementById("checkNextBtn");

const completion = document.getElementById("completion");
const completionTitle = document.getElementById("completionTitle");
const completionText = document.getElementById("completionText");
const retryBtn = document.getElementById("retryBtn");

// Escape HTML before inserting dynamic text into the page.
// This prevents text and code examples from being interpreted
// as HTML markup.
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;",
        };

        return entities[character];
    });
}

// Display the current question and its options.
function renderQuestion() {
    const question = quizQuestions[currentQuestion];

    questionChecked = false;

    checkCount.textContent = `QUESTION ${String(currentQuestion + 1).padStart(2, "0")} / ${quizQuestions.length}`;

    checkScore.textContent = `SCORE ${quizScore}`;

    miniProgressFill.style.width = `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;

    checkQuestion.textContent = question.question;

    // Use textContent for the code example so HTML tags
    // are displayed as code rather than rendered as elements.
    checkCode.textContent = question.code;

    // Randomize answer order while retaining the correct answer.
    const shuffledOptions = question.options
        .map((text, originalIndex) => ({
            text,
            originalIndex,
        }))
        .sort(() => Math.random() - 0.5);

    // Store the correct answer's new index for grading.
    question.displayedAnswer = shuffledOptions.findIndex(
        (option) => option.originalIndex === question.answer,
    );

    checkOptions.innerHTML = shuffledOptions
        .map(
            (option, index) => `
        <label class="check-option">
            <input type="radio" name="quickAnswer" value="${index}">
            <span>${escapeHTML(option.text)}</span>
        </label>
    `,
        )
        .join("");

    // Clear feedback from the previous question.
    checkFeedback.hidden = true;
    checkFeedback.textContent = "";
    checkFeedback.className = "check-feedback";

    checkAnswerBtn.hidden = false;
    checkNextBtn.hidden = true;

    checkHint.textContent = "SELECT ONE ANSWER";
}

// Grade the selected answer.
function checkQuickAnswer() {
    // Prevent duplicate scoring.
    if (questionChecked) return;

    const selected = checkOptions.querySelector(
        'input[name="quickAnswer"]:checked',
    );

    if (!selected) {
        checkFeedback.hidden = false;
        checkFeedback.className = "check-feedback";
        checkFeedback.textContent = "Choose an answer before continuing.";
        return;
    }

    questionChecked = true;

    const question = quizQuestions[currentQuestion];
    const selectedIndex = Number(selected.value);
    const isCorrect = selectedIndex === question.displayedAnswer;

    if (isCorrect) {
        quizScore++;
    }

    checkScore.textContent = `SCORE ${quizScore}`;

    // Disable the options and reveal the correct answer.
    const labels = checkOptions.querySelectorAll(".check-option");

    labels.forEach((label, index) => {
        const input = label.querySelector("input");

        input.disabled = true;

        if (index === question.displayedAnswer) {
            label.classList.add("correct");
        } else if (index === selectedIndex) {
            label.classList.add("incorrect");
        }
    });

    // Show feedback and a short explanation.
    checkFeedback.hidden = false;
    checkFeedback.className = `check-feedback ${isCorrect ? "good" : "bad"}`;

    checkFeedback.textContent = `${isCorrect ? "Correct! " : "Not quite. "}${question.explanation}`;

    checkHint.textContent = isCorrect ? "+1 POINT" : "KEEP LEARNING";

    checkAnswerBtn.hidden = true;
    checkNextBtn.hidden = false;

    checkNextBtn.textContent =
        currentQuestion === quizQuestions.length - 1
            ? "View result →"
            : "Next question →";
}

// Move forward or show the completion screen.
function nextQuickQuestion() {
    if (!questionChecked) return;

    currentQuestion++;

    if (currentQuestion >= quizQuestions.length) {
        showCompletion();
        return;
    }

    renderQuestion();
}

// Show the final result.
function showCompletion() {
    checkCard.hidden = true;
    completion.hidden = false;

    const percentage = Math.round((quizScore / quizQuestions.length) * 100);

    if (percentage === 100) {
        completionTitle.textContent = "PERFECTLY READABLE.";
        completionText.textContent =
            "Excellent! You understand the paragraph element, line height, and max-width. Keep experimenting with real designs.";
    } else if (percentage >= 67) {
        completionTitle.textContent = "GOOD PROGRESS.";
        completionText.textContent = `You scored ${quizScore} out of ${quizQuestions.length}. Review the explanations, experiment with the playground, and try again.`;
    } else {
        completionTitle.textContent = "PRACTICE MAKES PROGRESS.";
        completionText.textContent = `You scored ${quizScore} out of ${quizQuestions.length}. Revisit the examples above and try changing the controls before retrying.`;
    }

    // Bring the result into view.
    completion.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        block: "center",
    });
}

// Restart the mini quiz.
function restartQuickQuiz() {
    currentQuestion = 0;
    quizScore = 0;
    questionChecked = false;

    completion.hidden = true;
    checkCard.hidden = false;

    renderQuestion();

    checkCard.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        block: "start",
    });
}

// Connect the quiz buttons.
checkAnswerBtn.addEventListener("click", checkQuickAnswer);
checkNextBtn.addEventListener("click", nextQuickQuestion);
retryBtn.addEventListener("click", restartQuickQuiz);

// Start the quick check.
renderQuestion();
