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
            { "type": "h1", "text": "How many players?" },
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
            { "type": "button", "class": "button next", "text": "NEXT" },
            { "type": "p", "text": 'Click "NEXT" button to enter player names.' }
        ]
    },
    {
        "id": "colorAndNamePage",
        "page": 3,
        "class": "page page3",
        "type": "div",
        "content": [
            { "type": "h1", "text": "Player names" },
            {
                "type": "div", "class": "form-container", "content": [
                    {
                        "type": "form", "id": "NameForm", "content": [
                            { "type": "div", "id": "playerInputs" }
                        ]
                    }
                ]
            },
            { "type": "p", "id": "crimeInfo", "class": "enterPLayers", "text": "Enter a name for each player:" },
            { "type": "button", "class": "button next", "text": "NEXT" },
            { "type": "button", "class": "button next random", "text": "RANDOM" },
            { "type": "p", "class": "info", "text": 'Click "NEXT" to choose the first player as the leader, or click "RANDOM" to select a random leader.' }
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
            { "type": "p", "id": "crimeInfo", "class": "enterSecretWord", "text": "Come up with and write down the word association" },

            { "type": "button", "class": "button next", "text": "NEXT" },
            { "type": "p", "text": 'Click "NEXT" button and pass the phone to the next player.' }
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
            { "type": "p", "text": 'Click "NEXT ROUND" button to start a new Round.' }
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
let randomeMode = null;
const clickSound = new Audio("audio/click.mp3");

// Получение элемента по его идентификатору
const myElement = document.getElementById('reload');

function drawPage(pageNumber) {
    const appContainer = document.querySelector(".app");
    appContainer.innerHTML = "";

    const currentPage = siteElements.find((element) => element.page === pageNumber);
    drawElement(currentPage, appContainer);

    if (pageNumber === 3) {
        createPlayerInputs();
    }
}

function handleButtonClick(event) {
    const targetButton = event.target;
    if (targetButton.classList.contains("button") && targetButton.classList.contains("next") || (event.type === "keydown" && event.key === "Enter")) {
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
            if( targetButton.classList.contains("random")){
                randomeMode = 'yes';
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
        document.getElementById("crimeInfo").textContent = 'Well done, now click "NEXT" button.';
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
        cleanNameWarning();
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
    if (pageNumber === 4 && roundNumber > playersName.length - 1) {
        pageNumber++;
    }
    if (playersName.length < 6) {
        cercle2 = 2;
    } else {
        cercle2 = 1;
    }
    if (pageNumber === 5 && roundNumber < playersName.length * cercle2) {
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
    console.log("Новый порядок игроков: ", playersName);
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
        document.getElementById("crimeInfo").textContent = "Click on the window to reveal the hidden word";
        document.getElementById("playerRole").textContent = `Youre role: hide`;
    }
}

// Функция для генерации случайного числа с учётом времени
function ultraRandom(min, max) {
    const now = Date.now();
    const timeBasedRandom = (now % 1000) / 1000;
    const randomValue = (Math.random() + Math.random() * timeBasedRandom - Math.random() * timeBasedRandom);

    // Гарантируем, что результат находится в пределах min и max
    return Math.floor((Math.abs(randomValue) % 1) * (max - min + 1)) + min;
}

function shaffleRols() {
    playerRole = Array.from(playersName, () => "Detective");

    if (roundNumber === 1 && randomeMode) {
        // Выбираем случайного игрока, который станет первым
        let randomIndex = ultraRandom(0, playersName.length - 1);
        console.log("Случайный игрок: Player", randomIndex + 1," - " , playersName[randomIndex]);

        if (randomIndex !== 0) {
            // Создаем новый массив, начиная с выбранного игрока и затем добавляя остальных по кругу
            let rearrangedPlayers = [
                ...playersName.slice(randomIndex), // Берем всех игроков от случайного индекса до конца массива
                ...playersName.slice(0, randomIndex) // Затем добавляем игроков с начала до случайного индекса
            ];
            playersName = rearrangedPlayers;
        }
    }

    randomIndex = ultraRandom(1, playersName.length - 1);
    console.log("Рандомный номер: ", randomIndex, "Перемешенный список игроков: ", playersName);

    playerRole[randomIndex] = "Criminal";
    playerRole[0] = "Leader";

    console.log("Роли игроков: ", playerRole);
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

// Добавление обработчика событий для клика по элементу
myElement.addEventListener('click', function () {
    // Обновление страницы
    location.reload();
});

// Скрипт для отображения прелоадера 
window.onload = function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker зарегистрирован с областью:', registration.scope);
            })
            .catch(error => {
                console.error('Ошибка при регистрации Service Worker:', error);
            });
    }
    setTimeout(function () {
        document.getElementById("preloader_malc").style.display = "none";
    }, 700);
    drawPage(pageNumber);
    document.addEventListener("click", handleButtonClick);
};