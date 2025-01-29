// Datos extraídos del documento Word
const wordsData = [
    { verb: "Accept", noun: "Acceptance", adjective: "Acceptable", adverb: "Acceptably" },
    { verb: "Accuse", noun: "Accusation", adjective: "Accusing", adverb: "Accusingly" },
    { verb: "Act", noun: "Act, Action, Activity", adjective: "Active", adverb: "Actively" },
    // Añade el resto de los grupos de palabras aquí...
];

let currentWord = null;
let history = [];
let correctAnswers = 0;
let wrongAnswers = 0;

// Elementos del DOM
const sentenceElement = document.getElementById("sentence");
const optionsButtons = document.querySelectorAll(".option");
const feedbackElement = document.getElementById("feedback");
const newWordBtn = document.getElementById("new-word-btn");
const resetBtn = document.getElementById("reset-btn");
const historyList = document.getElementById("history-list");
const remainingCategories = document.getElementById("remaining-categories");
const remainingList = document.getElementById("remaining-list");
const checkResultsBtn = document.getElementById("check-results-btn");
const solveBtn = document.getElementById("solve-btn");

// Función para generar una palabra aleatoria
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordsData.length);
    return wordsData[randomIndex];
}

// Función para generar una frase aleatoria con la palabra en negrita
function generateSentence(word, type) {
    const sentences = {
        verb: [`She decided to <strong>${word}</strong> the offer without hesitation.`, `He will <strong>${word}</strong> the invitation if it arrives on time.`],
        noun: [`The <strong>${word}</strong> of the new policy was immediate.`, `Her <strong>${word}</strong> to the situation was admirable.`],
        adjective: [`The solution was <strong>${word}</strong> and easy to implement.`, `This is the most <strong>${word}</strong> option available.`],
        adverb: [`She performed the task <strong>${word}</strong> and efficiently.`, `He spoke <strong>${word}</strong> during the presentation.`]
    };
    const randomIndex = Math.floor(Math.random() * sentences[type].length);
    return sentences[type][randomIndex];
}

// Función para mostrar una nueva palabra
function displayNewWord() {
    const wordGroup = getRandomWord();
    const wordTypes = Object.keys(wordGroup);
    const randomType = wordTypes[Math.floor(Math.random() * wordTypes.length)];
    currentWord = { word: wordGroup[randomType], type: randomType, group: wordGroup };

    sentenceElement.innerHTML = generateSentence(currentWord.word, currentWord.type);
    feedbackElement.textContent = "";
    remainingCategories.style.display = "none";
}

// Función para manejar la selección de opciones
optionsButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.dataset.type === currentWord.type) {
            feedbackElement.textContent = "Correct!";
            feedbackElement.style.color = "green";
            correctAnswers++;
            showRemainingCategories();
        } else {
            feedbackElement.textContent = "Try again!";
            feedbackElement.style.color = "red";
            wrongAnswers++;
        }
        updateHistory();
    });
});

// Función para mostrar las categorías restantes
function showRemainingCategories() {
    remainingList.innerHTML = "";
    for (const [type, word] of Object.entries(currentWord.group)) {
        if (type !== currentWord.type) {
            const listItem = document.createElement("li");
            listItem.innerHTML = `${type}: <input type="text" data-correct="${word}">`;
            remainingList.appendChild(listItem);
        }
    }
    remainingCategories.style.display = "block";
}

// Función para comprobar los resultados
checkResultsBtn.addEventListener("click", () => {
    remainingList.querySelectorAll("input").forEach(input => {
        if (input.value.trim().toLowerCase() === input.dataset.correct.toLowerCase()) {
            input.style.color = "green";
        } else {
            input.style.color = "red";
        }
    });
});

// Función para resolver las categorías restantes
solveBtn.addEventListener("click", () => {
    remainingList.querySelectorAll("input").forEach(input => {
        input.value = input.dataset.correct;
        input.style.color = "green";
    });
});

// Función para actualizar el historial
function updateHistory() {
    history.push(currentWord.word);
    const listItem = document.createElement("li");
    listItem.textContent = currentWord.word;
    historyList.appendChild(listItem);
}

// Función para reiniciar el ejercicio
function resetExercise() {
    history = [];
    correctAnswers = 0;
    wrongAnswers = 0;
    historyList.innerHTML = "";
    feedbackElement.textContent = "";
    remainingCategories.style.display = "none";
    displayNewWord();
}

// Función para mostrar/ocultar el historial
function toggleHistory() {
    const historyList = document.getElementById("history-list");
    if (historyList.style.display === "none") {
        historyList.style.display = "block";
    } else {
        historyList.style.display = "none";
    }
}

// Event listeners
newWordBtn.addEventListener("click", displayNewWord);
resetBtn.addEventListener("click", resetExercise);

// Inicialización
displayNewWord();