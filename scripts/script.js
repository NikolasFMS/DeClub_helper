const siteElements = [
    {
        "id": "startPage",
        "page": 1,
        "class": "page page1",
        "type": "div",
        "content": [
            {
                "type": "h1", "text": "New Game"
            },
            {
                "type": "div", "class": "button-container", "content": [
                    { "type": "button", "class": "button next", "text": "START" }
                ]
            },
            { "type": "p", "text": 'Click "START" button to start a new game Detective Club.' }
        ]
    },
    {
        "id": "playerCountPage",
        "page": 2,
        "class": "page page2",
        "type": "div",
        "content": [
            { "type": "h1", "text": "Select number of players:" },
            {
                "type": "div", "class": "select-container", "content": [
                    {
                        "type": "select", "id": "playerCount", "class": "select player", "content": [
                            { "type": "option", "value": "4", "text": "4 players" },
                            { "type": "option", "value": "5", "text": "5 players" },
                            { "type": "option", "value": "6", "text": "6 players" },
                            { "type": "option", "value": "7", "text": "7 players" },
                            { "type": "option", "value": "8", "text": "8 players" },
                            { "type": "option", "value": "9", "text": "9 players" },
                            { "type": "option", "value": "10", "text": "10 players" },
                            { "type": "option", "value": "11", "text": "11 players" },
                            { "type": "option", "value": "12", "text": "12 players" },
                            { "type": "option", "value": "13", "text": "13 players" },
                            { "type": "option", "value": "14", "text": "14 players" },
                            { "type": "option", "value": "15", "text": "15 players" },
                            { "type": "option", "value": "16", "text": "16 players" },
                            { "type": "option", "value": "17", "text": "17 players" },
                            { "type": "option", "value": "18", "text": "18 players" },
                            { "type": "option", "value": "19", "text": "19 players" },
                            { "type": "option", "value": "20", "text": "20 players" }
                        ]
                    }
                ]
            },
            { "type": "p", "text": "Select number of players" },
            { "type": "button", "class": "button next", "text": "START" },
            { "type": "p", "text": 'Click "START" button to start a new game Detective Club.' }
        ]
    },
    {
        "id": "colorAndNamePage",
        "page": 3,
        "class": "page page3",
        "type": "div",
        "content": [
            { "type": "h1", "text": "Enter player names:" },
            {
                "type": "div", "class": "form-container", "content": [
                    {
                        "type": "form", "id": "NameForm", "content": [
                            { "type": "div", "id": "playerInputs" }
                        ]
                    }
                ]
            },
            { "type": "p", "id": "crimeInfo", "class": "enterPLayers", "text": "Select a color and enter a name for each player:" },
            { "type": "button", "class": "button next", "text": "NEXT" },
            { "type": "p", "text": 'Click "START" button to start a new game Detective Club.' }
        ]
    },
    {
        "id": "roundPage",
        "page": 4,
        "type": "div",
        "class": "page page4",
        "content": [
            { "type": "h2", "id": "roundNumberText", "text": "Round 1" },
            { "type": "p", "id": "namePlayerText", "text": "Player: Nikolas " },
            { "type": "p", "id": "playerRole", "text": "Youre role: " },
            {
                "type": "div", "class": "form-container secret-word", "content": [
                    { "type": "input", "id": "wordInput", "class": "secret-word-text", "placeholder": "Enter the hidden word" },
                    { "type": "div", "class": "overlay", "id": "overlay", "style": 'none' }

                ]
            },
            { "type": "p", "id": "crimeInfo", "class": "enterSecretWord", "text": "Secret password" },

            { "type": "button", "class": "button next", "text": "NEXT" },
            { "type": "p", "text": 'Click "NEXT" button to start a new game Detective Club.' }
        ]
    },
    {
        "id": "nextRound",
        "page": 5,
        "style": "display: none;",
        "type": "div",
        "class": "page page5",
        "content": [
            { "type": "h2", "text": "Next round" },
            { "type": "button", "class": "button next", "text": "NEXT ROUND" },
            { "type": "p", "text": 'Click "START" button to start a new game Detective Club.' }
        ]
    },
    {
        "id": "finish",
        "page": 6,
        "type": "div",
        "class": "page page6",
        "content": [
            { "type": "h2", "text": "One more time?" },
            { "type": "button", "class": "button next", "text": "NEW GAME" },
            { "type": "p", "text": 'Click "START" button to start a new game Detective Club.' }
        ]
    }
];

let pageNumber = 1; // Начинаем с первой страницы
let currentPlayerIndex = 1 // Номер игрока
let playerCount = 4; // КОлличество игроков
let roundNumber = 1; // Текущий раунд
let playersName = []; // Имена игроков
let playerRole = []; // Роли для каждого игрока
let secretWord = ""; // Загаданное слово
let hideWord = false;
let a = ['st', 'nd', 'rd'];
let cercle2 = 1;
const clickSound = document.getElementById('clickSound');


document.addEventListener("DOMContentLoaded", function () {
    drawPage(pageNumber);
    document.addEventListener("click", handleButtonClick);
});

function drawPage(pageNumber) {
    const appContainer = document.querySelector(".app");
    appContainer.innerHTML = "";

    const currentPage = siteElements.find((element) => element.page === pageNumber);
    drawElement(currentPage, appContainer);

    if (pageNumber === 3) {
        createPlayerInputs();
    }

    console.log("Текущая страница: " + pageNumber);
}

function handleButtonClick(event) {
    const targetButton = event.target;
    if (targetButton.classList.contains("button") && targetButton.classList.contains("next")) {
        const currentPage = siteElements.find((element) => element.page === pageNumber);
        playClickSound();
        console.log(`page: ${pageNumber}, Round: ${roundNumber}, Player: number ${currentPlayerIndex}, name ${playersName[currentPlayerIndex - 1]}`);

        if (pageNumber === 2) {
            playerCount = parseInt(document.getElementById("playerCount").value, 10);
        }

        if (pageNumber === 3) {
            if (!areAllPlayerNamesEntered()) {
                showNameWarning("crimeInfo", "Enter the names of all players");
                return;
            }
            savePlayersName();
        }

        if (pageNumber === 4 && currentPlayerIndex < playersName.length) {
            handlePage4();
        } else {
            if (hideWord) {
                showNameWarning("crimeInfo", "Open secret word");
                return;
            } else {
                handleNextPage();
            }
        }
    }
}

function handlePage4() {
    const overlay = document.getElementById("overlay");

    overlay.addEventListener("click", function () {
        playClickSound();
        document.getElementById("playerRole").textContent = `Youre role: ${playerRole[currentPlayerIndex - 1]}`;
        overlay.style.display = "none";
        cleanNameWarning();
        hideWord = false;
        const wordInput = document.getElementById("wordInput");

        if (playerRole[currentPlayerIndex - 1] === "Criminal") {
            wordInput.value = "Guess the word!";
        } else {
            wordInput.value = secretWord;
        }
    });

    if (currentPlayerIndex === 1) {
        const wordInput = document.getElementById("wordInput");

        wordInput.addEventListener("click", function () {
            if (hideWord) {
                wordInput.value = secretWord;
                hideWord = false;
            }
        });

        const secretWordInput = document.getElementById("wordInput");
        const enteredSecretWord = secretWordInput.value.trim();

        if (!enteredSecretWord) {
            showNameWarning("crimeInfo", "Enter secret word");
            return;
        }

        getSecretWord();
        document.getElementById("wordInput").value = "Open secret word";
        overlay.style.display = "block";
        hideWord = true;
        wordInput.disabled = true;
        currentPlayerIndex++;
        page4Text();
    } else {
        if (hideWord) {
            showNameWarning("crimeInfo", "Open secret word");
            return;
        } else {
            cleanNameWarning();
            overlay.style.display = "block";
            currentPlayerIndex++;
            page4Text();
            hideWord = true;
            var secretWordInput = document.getElementById("wordInput");
            secretWordInput.value = "Open secret word";
        }
    }
}

function handleNextPage() {
    if (pageNumber === 4 && roundNumber === playersName.length) {
        if(cercle2 = 1 && playerCount > 6) {
          cercle2++;
          newRound();
        } else {
          pageNumber++;
        }
    }

    if (pageNumber === 5 && roundNumber < playersName.length) {
        newRound();
    }

    if (pageNumber === 6) {
        resetGame();
    }

    pageNumber = (pageNumber < siteElements.length) ? pageNumber + 1 : 1;
    drawPage(pageNumber);
    if (pageNumber === 4) {
        page4Text();
    }

    console.log(`page: ${pageNumber}, Round: ${roundNumber}, Player: number ${currentPlayerIndex}, name ${playersName[currentPlayerIndex - 1]}`);
}

function newRound() {
    pageNumber = 3;
    currentPlayerIndex = 1;
    roundNumber++;
    shaffleRols();
    moveLastPlayerToFirst();
}

function moveLastPlayerToFirst() {
    if (playersName.length > 1) {
        const lastPlayer = playersName.shift();
        playersName.push(lastPlayer);  // Используем push для добавления элемента в конец массива
    }
    console.log(playersName);
}

function drawElement(element, container) {
    const newElement = document.createElement(element.type);

    if (element.id) newElement.id = element.id;
    if (element.class) newElement.className = element.class;
    if (element.text) newElement.textContent = element.text;
    if (element.placeholder) newElement.placeholder = element.placeholder;
    if (element.type) newElement.type = element.type;

    if (element.content) {
        element.content.forEach((childElement) => {
            drawElement(childElement, newElement);
        });
    }

    container.appendChild(newElement);
}

function createPlayerInputs() {
    let playerInputsHTML = "";
    for (let i = 1; i <= playerCount; i++) {
        playerInputsHTML += `
      <p class="player-number">Player ${i}</p>
      <input type="text" id="name${i}" placeholder=""><br>`;
    }
    document.getElementById("playerInputs").innerHTML = playerInputsHTML;
}

function savePlayersName() {
    const inputs = document.querySelectorAll("#playerInputs input");
    playersName = Array.from(inputs).map((input) => input.value);
    console.log(playersName);
    shaffleRols();
}

function page4Text() {
    let i = currentPlayerIndex;
    let n = 'th';
    if (i === 1) {
        n = a[0];
    } else if (i === 2) {
        n = a[1];
    } else if (i === 3) {
        n = a[2];
    }
    document.getElementById("roundNumberText").textContent = `Round: ${roundNumber}`;
    document.getElementById("namePlayerText").textContent = `${currentPlayerIndex}${n} player: ${playersName[currentPlayerIndex - 1]}`;
    if (currentPlayerIndex === 1) {
        document.getElementById("playerRole").textContent = `Youre role: ${playerRole[currentPlayerIndex - 1]}`;
    } else {
        document.getElementById("playerRole").textContent = `Youre role: hide`;
    }
}
function shaffleRols() {
    playerRole = Array.from(playersName, () => "Detective");
    const randomRepeats = Math.floor(Math.random() * 12) + 5;

    for (let i = 0; i < randomRepeats; i++) {
        var randomIndex = Math.floor(Math.random() * (playersName.length - 1)) + 1;
    }

    playerRole[randomIndex] = "Criminal";
    playerRole[0] = "Leader";

    console.log(playerRole);
}

function areAllPlayerNamesEntered() {
    const inputs = document.querySelectorAll("#playerInputs input");
    for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].value.trim()) {
            return false;
        }
    }
    return true;
}

function showNameWarning(modul, text) {
    const alert = document.getElementById(modul);
    alert.textContent = text;
    alert.style.color = "#DAAF56";
    alert.style.fontSize = "1.4vh";
}

function cleanNameWarning() {
    const alert = document.getElementById("crimeInfo");
    alert.style.color = "#ccc";
    alert.style.fontSize = "1.3vh";
}

function getSecretWord() {
    secretWord = document.getElementById("wordInput").value;
    console.log(secretWord);
}

function resetGame() {
    pageNumber = 1;
    currentPlayerIndex = 1;
    playerCount = 4;
    roundNumber = 1;
    playersName = [];
    playerRole = [];
    secretWord = "";
    hideWord = false;
}
// Функция для воспроизведения звука
function playClickSound() {
    // Перематываем аудио на начало (если требуется повторное воспроизведение)
    clickSound.currentTime = 0;
    // Воспроизводим звук
    clickSound.play();
}


// Получение элемента по его идентификатору
const myElement = document.getElementById('reload');

// Добавление обработчика событий для клика по элементу
myElement.addEventListener('click', function() {
    // Обновление страницы
    location.reload();
});
