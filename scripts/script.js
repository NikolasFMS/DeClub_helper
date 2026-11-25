(function () {
  'use strict';

  const STORAGE_KEYS = {
    settings: 'dc_settings_v2',
    players: 'dc_saved_players_v2',
    game: 'dc_game_state_v2'
  };

  const DEFAULT_SETTINGS = {
    theme: 'dark',
    lang: 'ru',
    sound: true,
    haptics: true,
    wakeLock: true
  };

  const WORD_BANK = {
    ru: [
      'Тайна', 'Зеркало', 'Полночь', 'Сон', 'Дорога', 'Огонь', 'Тень', 'Маска',
      'Мост', 'Ключ', 'Лабиринт', 'Свобода', 'Шторм', 'Тишина', 'Время', 'Полёт',
      'Одиночество', 'Праздник', 'Ловушка', 'Свет', 'Воспоминание', 'Океан',
      'Путешествие', 'Секрет', 'Туман', 'Сказка', 'Волшебство', 'Космос',
      'Опасность', 'Надежда', 'Зима', 'Весна', 'Осень', 'Лето', 'Побег',
      'Награда', 'Проклятие', 'Иллюзия', 'Встреча', 'Прощание', 'Закат',
      'Рассвет', 'Высота', 'Глубина', 'Холод', 'Тепло', 'Ритм', 'Мелодия',
      'Охота', 'Защита', 'Баланс', 'Хаос', 'Порядок', 'Сила', 'Слабость',
      'Страх', 'Смелость', 'Зависть', 'Дружба', 'Любовь', 'Предательство',
      'Сокровище', 'Карта', 'Компас', 'Корабль', 'Маяк', 'Остров', 'Пустыня',
      'Джунгли', 'Гора', 'Пещера', 'Замок', 'Башня', 'Руины', 'Сад', 'Лес',
      'Дождь', 'Гроза', 'Снег', 'Ветер', 'Звезда', 'Луна', 'Солнце', 'Затмение',
      'Часы', 'Песок', 'Стекло', 'Золото', 'Железо', 'Нить', 'Узел', 'Крылья',
      'След', 'Знак', 'Письмо', 'Книга', 'Картина', 'Сцена', 'Цирк', 'Карнавал',
      'Яд', 'Лекарство', 'Эликсир', 'Дверь', 'Окно', 'Лестница', 'Клетка',
      'Корона', 'Трон', 'Щит', 'Меч', 'Фонарь', 'Свеча', 'Дым', 'Пепел',
      'Эхо', 'Шёпот', 'Крик', 'Смех', 'Слёзы', 'Танец', 'Игра', 'Удача'
    ],
    en: [
      'Mystery', 'Mirror', 'Midnight', 'Dream', 'Journey', 'Fire', 'Shadow', 'Mask',
      'Bridge', 'Key', 'Labyrinth', 'Freedom', 'Storm', 'Silence', 'Time', 'Flight',
      'Solitude', 'Feast', 'Trap', 'Light', 'Memory', 'Ocean', 'Voyage', 'Secret',
      'Fog', 'Fairytale', 'Magic', 'Cosmos', 'Danger', 'Hope', 'Winter', 'Spring',
      'Autumn', 'Summer', 'Escape', 'Reward', 'Curse', 'Illusion', 'Reunion', 'Farewell',
      'Sunset', 'Dawn', 'Height', 'Depth', 'Cold', 'Warmth', 'Rhythm', 'Melody',
      'Hunt', 'Shelter', 'Balance', 'Chaos', 'Order', 'Strength', 'Fragile', 'Fear',
      'Courage', 'Envy', 'Friendship', 'Love', 'Betrayal', 'Treasure', 'Map', 'Compass',
      'Ship', 'Lighthouse', 'Island', 'Desert', 'Jungle', 'Mountain', 'Cave', 'Castle',
      'Tower', 'Ruins', 'Garden', 'Forest', 'Rain', 'Thunder', 'Snow', 'Wind',
      'Star', 'Moon', 'Sun', 'Eclipse', 'Clock', 'Sand', 'Glass', 'Gold',
      'Iron', 'Thread', 'Knot', 'Wings', 'Footprint', 'Omen', 'Letter', 'Book',
      'Painting', 'Stage', 'Circus', 'Carnival', 'Poison', 'Remedy', 'Elixir', 'Door',
      'Window', 'Staircase', 'Cage', 'Crown', 'Throne', 'Shield', 'Sword', 'Lantern',
      'Candle', 'Smoke', 'Ashes', 'Echo', 'Whisper', 'Scream', 'Laughter', 'Tears',
      'Dance', 'Riddle', 'Fortune', 'Horizon'
    ]
  };

  const I18N = {
    ru: {
      appSubtitle: 'Цифровой блокнот для настольной игры «Детектив Клуб». Раздавайте роли по кругу без бумаги и карандашей.',
      resumeGame: 'Продолжить игру',
      resumeMeta: (r, total, count) => `Раунд ${r} из ${total} · Игроков: ${count}`,
      newGame: 'Новая игра',
      setupTitle: 'Настройка партии',
      setupSubtitle: 'Выберите количество игроков и длительность игры.',
      playersLabel: 'Количество игроков',
      playersRangeHint: 'от 4 до 20',
      circlesLabel: 'Количество кругов',
      circleAuto: 'По правилам',
      circleAutoHint: (n) => (n <= 5 ? '2 круга для 4–5 игроков' : '1 круг для 6+ игроков'),
      circleTotalRounds: (rounds) => `Всего раундов: ${rounds}`,
      next: 'Далее',
      back: 'Назад',
      namesTitle: 'Имена игроков',
      namesSubtitle: 'Имена сохраняются автоматически для следующих партий.',
      playerPlaceholder: (i) => `Игрок ${i}`,
      clearNames: 'Очистить',
      namesError: 'Введите имена всех игроков',
      startFirstLeader: 'Начать с 1-го',
      startRandomLeader: 'Случайный ведущий',
      namesOrderHint: '«Начать с 1-го» — ведущим будет первый игрок в списке. «Случайный ведущий» выберет старт случайно.',
      roundMeta: (r, total) => `Раунд ${r} из ${total}`,
      playerStepMeta: (idx, total) => `Игрок ${idx} из ${total}`,
      leaderRole: 'Ведущий',
      detectiveRole: 'Детектив',
      criminalRole: 'Преступник',
      leaderTitle: (name) => `Ход ведущего: ${name}`,
      leaderSubtitle: 'Придумайте слово-ассоциацию к двум вашим картам и введите его ниже. Не показывайте экран другим.',
      wordPlaceholder: 'Введите секретное слово',
      suggestWord: 'Подсказать слово',
      wordError: 'Введите секретное слово',
      confirmWord: 'Скрыть слово и передать',
      handoffTitle: (name) => `Передайте телефон: ${name}`,
      handoffSubtitle: 'Убедитесь, что никто не подглядывает, затем удерживайте карточку ниже.',
      holdPromptTitle: 'Удерживайте, чтобы посмотреть',
      holdPromptSub: 'Как только отпустите палец — роль и слово скроются',
      yourRole: 'Ваша роль',
      criminalHint: 'Вы не знаете слово — постарайтесь не выдать себя и угадать его по картам!',
      seenConfirmed: 'Просмотрено · Можно передавать дальше',
      nextPlayer: 'Следующий игрок',
      startDiscussion: 'К обсуждению',
      discussionTitle: 'Раунд в процессе',
      discussionSubtitle: 'Все игроки узнали роли. Выкладывайте карты, объясняйте ассоциации и голосуйте, кто Преступник.',
      leaderLabel: (name) => `Ведущий раунда: ${name}`,
      timerTitle: 'Таймер обсуждения',
      timerStart: 'Старт',
      timerPause: 'Пауза',
      timerReset: 'Сброс',
      timerDone: 'Время вышло!',
      holdLeaderWord: 'Удерживайте, чтобы напомнить слово',
      openScores: 'Очки (+ / −)',
      nextRound: 'Следующий раунд',
      finishGame: 'Итоги игры',
      finishTitle: 'Партия завершена',
      finishSubtitle: 'Итоговый счёт игроков. При необходимости скорректируйте очки перед новой партией.',
      rematchSame: 'Реванш тем же составом',
      scoresTitle: 'Счёт игроков',
      scoresLeader: 'Лидер',
      scoresReset: 'Сбросить очки',
      done: 'Готово',
      noPlayersYet: 'Сначала начните партию и введите имена игроков.',
      settingsTitle: 'Настройки',
      tabSettings: 'Настройки',
      tabRules: 'Правила',
      themeLabel: 'Оформление',
      themeDark: 'Тёмная',
      themeLight: 'Светлая',
      langLabel: 'Язык',
      soundLabel: 'Звук',
      soundDesc: 'Щелчки кнопок и сигнал таймера',
      hapticsLabel: 'Тактильная отдача',
      hapticsDesc: 'Лёгкая вибрация при нажатиях',
      wakeLockLabel: 'Не выключать экран',
      wakeLockDesc: 'Экран остаётся активным во время партии',
      installLabel: 'Приложение',
      installDesc: 'Установите на экран «Домой» для работы без интернета',
      installBtn: 'Установить приложение',
      installIosBtn: 'Как установить на iPhone / iPad',
      reinstallLabel: 'Обновление и кэш',
      reinstallDesc: 'Переустановит файлы приложения, сохранив партию, имена и настройки',
      reinstallBtn: 'Переустановить приложение',
      confirmHomeTitle: 'В главное меню?',
      confirmHomeMsg: 'Текущая партия и очки сохранятся — вы сможете вернуться к ней в любой момент.',
      confirmHomeOk: 'В меню',
      confirmNewGameTitle: 'Начать новую игру?',
      confirmNewGameMsg: 'Текущая незавершённая партия будет заменена новой. Сохранённые имена останутся.',
      confirmNewGameOk: 'Начать заново',
      confirmResetScoresTitle: 'Сбросить все очки?',
      confirmResetScoresMsg: 'Счёт всех игроков станет равен 0.',
      confirmResetScoresOk: 'Сбросить',
      confirmReinstallTitle: 'Переустановить приложение?',
      confirmReinstallMsg: 'Кэш и Service Worker будут очищены, а приложение загрузится заново. Сохранённая игра, имена игроков и настройки останутся нетронутыми.',
      confirmReinstallOk: 'Переустановить',
      cancel: 'Отмена',
      offlineNotice: 'Автономный режим · Всё работает без интернета',
      reinstallOfflineErr: 'Для переустановки нужно подключение к интернету',
      reinstallingToast: 'Переустановка приложения...',
      installedToast: 'Приложение установлено',
      iosTitle: 'Установка на iPhone / iPad',
      iosSteps: '<p style="margin:0 0 10px">1. Нажмите кнопку <strong>«Поделиться»</strong> в нижней панели Safari.</p><p style="margin:0 0 10px">2. Прокрутите вниз и выберите <strong>«На экран «Домой»»</strong>.</p><p style="margin:0">3. Нажмите <strong>«Добавить»</strong> — приложение будет работать полностью офлайн.</p>',
      rulesHtml: `
        <div class="rules-section">
          <h3 class="rules-heading">Цель игры</h3>
          <p class="rules-text">Детективы стараются вычислить одного Преступника, который не знает загаданное слово. Преступник пытается выдать себя за Детектива, ориентируясь на чужие карты и объяснения.</p>
        </div>
        <div class="rules-section">
          <h3 class="rules-heading">1. Подготовка раунда</h3>
          <p class="rules-text">Ведущий смотрит свои карты, придумывает слово-ассоциацию, подходящее к двум из них, и вводит его в приложении. Затем телефон передаётся по кругу: каждый игрок удерживает карточку, чтобы увидеть роль и слово (у Преступника слова нет).</p>
        </div>
        <div class="rules-section">
          <h3 class="rules-heading">2. Выкладывание карт</h3>
          <ol class="rules-list">
            <li>Ведущий выкладывает 1-ю карту, подходящую к слову.</li>
            <li>Остальные игроки по часовой стрелке выкладывают по 1 карте.</li>
            <li>Ведущий выкладывает 2-ю карту, после чего все остальные снова выкладывают по 2-й карте.</li>
          </ol>
        </div>
        <div class="rules-section">
          <h3 class="rules-heading">3. Обсуждение и голосование</h3>
          <p class="rules-text">Ведущий вслух называет загаданное слово и объясняет связь со своими двумя картами. Далее по кругу каждый объясняет свои карты. После обсуждения все (кроме Ведущего) одновременно голосуют, кто Преступник.</p>
        </div>
        <div class="rules-section">
          <h3 class="rules-heading">4. Подсчёт очков (шпаргалка для + / −)</h3>
          <ul class="rules-list">
            <li><strong>Детектив</strong> получает <strong>+3 очка</strong>, если правильно указал Преступника.</li>
            <li>Если против Преступника проголосовал <strong>0 или 1 игрок</strong>: Преступник получает <strong>+5 очков</strong>, а Ведущий <strong>+4 очка</strong>.</li>
            <li>Если против Преступника проголосовали <strong>2 и более игроков</strong>: Преступник и Ведущий получают <strong>0 очков</strong>.</li>
          </ul>
        </div>
        <div class="rules-section">
          <h3 class="rules-heading">Длительность партии</h3>
          <p class="rules-text">При 4–5 игроках каждый становится Ведущим дважды (2 круга). При 6 и более игроках — по одному разу (1 круг). Побеждает игрок с наибольшим числом очков.</p>
        </div>
      `
    },
    en: {
      appSubtitle: 'Offline companion for the Detective Club board game. Pass the phone around — no notebooks or pens required.',
      resumeGame: 'Resume Game',
      resumeMeta: (r, total, count) => `Round ${r} of ${total} · Players: ${count}`,
      newGame: 'New Game',
      setupTitle: 'Game Setup',
      setupSubtitle: 'Choose the number of players and game length.',
      playersLabel: 'Number of players',
      playersRangeHint: '4 to 20',
      circlesLabel: 'Number of circles',
      circleAuto: 'Standard',
      circleAutoHint: (n) => (n <= 5 ? '2 circles for 4–5 players' : '1 circle for 6+ players'),
      circleTotalRounds: (rounds) => `Total rounds: ${rounds}`,
      next: 'Next',
      back: 'Back',
      namesTitle: 'Player Names',
      namesSubtitle: 'Names are saved automatically for future games.',
      playerPlaceholder: (i) => `Player ${i}`,
      clearNames: 'Clear',
      namesError: 'Please enter names for all players',
      startFirstLeader: 'Start with #1',
      startRandomLeader: 'Random Leader',
      namesOrderHint: '"Start with #1" makes the first player Leader. "Random Leader" picks a random starting player.',
      roundMeta: (r, total) => `Round ${r} of ${total}`,
      playerStepMeta: (idx, total) => `Player ${idx} of ${total}`,
      leaderRole: 'Leader',
      detectiveRole: 'Detective',
      criminalRole: 'Criminal',
      leaderTitle: (name) => `Leader: ${name}`,
      leaderSubtitle: 'Choose a secret word linking two of your cards and type it below. Keep the screen private.',
      wordPlaceholder: 'Enter the secret word',
      suggestWord: 'Suggest a word',
      wordError: 'Please enter a secret word',
      confirmWord: 'Hide word & pass phone',
      handoffTitle: (name) => `Pass phone to: ${name}`,
      handoffSubtitle: 'Make sure nobody is peeking, then press and hold the card below.',
      holdPromptTitle: 'Press and hold to reveal',
      holdPromptSub: 'Release your finger to hide your role and word immediately',
      yourRole: 'Your role',
      criminalHint: 'You do not know the word — blend in and deduce it from the other players’ cards!',
      seenConfirmed: 'Viewed · Ready to pass',
      nextPlayer: 'Next Player',
      startDiscussion: 'Start Discussion',
      discussionTitle: 'Round in Progress',
      discussionSubtitle: 'Everyone has seen their role. Play your cards, explain your clues, and vote on who the Criminal is.',
      leaderLabel: (name) => `Round Leader: ${name}`,
      timerTitle: 'Discussion Timer',
      timerStart: 'Start',
      timerPause: 'Pause',
      timerReset: 'Reset',
      timerDone: 'Time is up!',
      holdLeaderWord: 'Hold to peek at the secret word',
      openScores: 'Scores (+ / −)',
      nextRound: 'Next Round',
      finishGame: 'Finish Game',
      finishTitle: 'Game Complete',
      finishSubtitle: 'Final standings. You can still adjust points before starting a rematch.',
      rematchSame: 'Rematch with Same Players',
      scoresTitle: 'Scoreboard',
      scoresLeader: 'Leading',
      scoresReset: 'Reset Scores',
      done: 'Done',
      noPlayersYet: 'Start a game and enter player names first.',
      settingsTitle: 'Settings',
      tabSettings: 'Settings',
      tabRules: 'Rules',
      themeLabel: 'Appearance',
      themeDark: 'Dark',
      themeLight: 'Light',
      langLabel: 'Language',
      soundLabel: 'Sound',
      soundDesc: 'Button clicks and timer chime',
      hapticsLabel: 'Haptic Feedback',
      hapticsDesc: 'Subtle vibration on touch actions',
      wakeLockLabel: 'Keep Screen Awake',
      wakeLockDesc: 'Prevents the screen from dimming during play',
      installLabel: 'Install App',
      installDesc: 'Install to your home screen for full offline play',
      installBtn: 'Install App',
      installIosBtn: 'How to install on iPhone / iPad',
      reinstallLabel: 'Refresh & Cache',
      reinstallDesc: 'Re-downloads app files while keeping your saved game, player names, and settings',
      reinstallBtn: 'Reinstall App',
      confirmHomeTitle: 'Return to Start?',
      confirmHomeMsg: 'Your current game and scores stay saved so you can resume anytime.',
      confirmHomeOk: 'Main Menu',
      confirmNewGameTitle: 'Start a New Game?',
      confirmNewGameMsg: 'Your unfinished game will be replaced. Saved player names will be kept.',
      confirmNewGameOk: 'Start New',
      confirmResetScoresTitle: 'Reset All Scores?',
      confirmResetScoresMsg: 'Every player’s score will be reset to 0.',
      confirmResetScoresOk: 'Reset',
      confirmReinstallTitle: 'Reinstall App?',
      confirmReinstallMsg: 'Cached files and the Service Worker will be cleared and downloaded fresh. Your saved game, player names, and settings will NOT be erased.',
      confirmReinstallOk: 'Reinstall',
      cancel: 'Cancel',
      offlineNotice: 'Offline mode · Running from local cache',
      reinstallOfflineErr: 'An internet connection is required to reinstall',
      reinstallingToast: 'Reinstalling app...',
      installedToast: 'App installed',
      iosTitle: 'Install on iPhone / iPad',
      iosSteps: '<p style="margin:0 0 10px">1. Tap the <strong>Share</strong> button in Safari’s toolbar.</p><p style="margin:0 0 10px">2. Scroll down and tap <strong>Add to Home Screen</strong>.</p><p style="margin:0">3. Tap <strong>Add</strong> — the app will work completely offline.</p>',
      rulesHtml: `
        <div class="rules-section">
          <h3 class="rules-heading">Goal</h3>
          <p class="rules-text">Detectives try to identify the single Criminal who does not know the secret word. The Criminal tries to blend in by reading the table and improvising convincing links.</p>
        </div>
        <div class="rules-section">
          <h3 class="rules-heading">1. Secret Word & Roles</h3>
          <p class="rules-text">The Leader picks a word matching two cards in their hand and enters it here. Pass the phone around: each player holds the card to see their role and the word (the Criminal sees no word).</p>
        </div>
        <div class="rules-section">
          <h3 class="rules-heading">2. Playing Cards</h3>
          <ol class="rules-list">
            <li>The Leader plays their 1st card matching the secret word.</li>
            <li>Going clockwise, everyone else plays 1 card.</li>
            <li>The Leader plays a 2nd card, and everyone else follows with their 2nd card.</li>
          </ol>
        </div>
        <div class="rules-section">
          <h3 class="rules-heading">3. Explanation & Voting</h3>
          <p class="rules-text">The Leader announces the secret word and explains their two cards. Each player then explains theirs. Finally, everyone except the Leader votes simultaneously for who they think is the Criminal.</p>
        </div>
        <div class="rules-section">
          <h3 class="rules-heading">4. Scoring Reference (for + / −)</h3>
          <ul class="rules-list">
            <li>Each <strong>Detective</strong> gets <strong>+3 points</strong> for voting for the Criminal.</li>
            <li>If <strong>0 or 1 player</strong> voted for the Criminal: the Criminal gets <strong>+5 points</strong> and the Leader gets <strong>+4 points</strong>.</li>
            <li>If <strong>2 or more players</strong> voted for the Criminal: both the Criminal and the Leader get <strong>0 points</strong>.</li>
          </ul>
        </div>
        <div class="rules-section">
          <h3 class="rules-heading">Game Length</h3>
          <p class="rules-text">With 4–5 players, everyone is Leader twice (2 circles). With 6+ players, everyone is Leader once (1 circle). Highest score wins.</p>
        </div>
      `
    }
  };

  // --- State ---
  let settings = loadSettings();
  let savedPlayerNames = loadSavedPlayers();
  let game = loadGameState();

  let usedSuggestedWords = new Set();
  let settingsTab = 'settings';
  let deferredInstallPrompt = null;
  let wakeLockSentinel = null;
  let confirmCallback = null;
  let toastTimeout = null;

  // Discussion timer runtime state (ephemeral tick, preset saved in game)
  let timerRemaining = game.timerSeconds || 120;
  let timerRunning = false;
  let timerIntervalId = null;

  // Audio setup
  const clickAudio = new Audio('./audio/click.mp3');
  clickAudio.preload = 'auto';
  let audioCtx = null;

  // --- DOM Elements ---
  const appEl = document.getElementById('app');
  const homeBtn = document.getElementById('homeBtn');
  const scoresBtn = document.getElementById('scoresBtn');
  const settingsBtn = document.getElementById('settingsBtn');
  const offlineBanner = document.getElementById('offlineBanner');
  const toastEl = document.getElementById('toast');

  const scoresModal = document.getElementById('scoresModal');
  const scoresModalTitle = document.getElementById('scoresModalTitle');
  const scoresModalBody = document.getElementById('scoresModalBody');
  const scoresModalFooter = document.getElementById('scoresModalFooter');

  const settingsModal = document.getElementById('settingsModal');
  const settingsModalTitle = document.getElementById('settingsModalTitle');
  const settingsTabs = document.getElementById('settingsTabs');
  const settingsModalBody = document.getElementById('settingsModalBody');

  const confirmModal = document.getElementById('confirmModal');
  const confirmTitle = document.getElementById('confirmTitle');
  const confirmMessage = document.getElementById('confirmMessage');
  const confirmCancelBtn = document.getElementById('confirmCancelBtn');
  const confirmOkBtn = document.getElementById('confirmOkBtn');

  const iosInstallModal = document.getElementById('iosInstallModal');
  const iosInstallTitle = document.getElementById('iosInstallTitle');
  const iosInstallBody = document.getElementById('iosInstallBody');
  const iosInstallCloseBtn = document.getElementById('iosInstallCloseBtn');

  // --- Helpers ---
  function t() {
    return I18N[settings.lang] || I18N.ru;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function cryptoRandomInt(min, max) {
    const range = max - min + 1;
    if (range <= 1) return min;
    if (window.crypto && window.crypto.getRandomValues) {
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      return min + (array[0] % range);
    }
    return min + Math.floor(Math.random() * range);
  }

  function createEmptyGame() {
    return {
      active: false,
      screen: 'start',
      playerCount: Math.max(4, Math.min(20, savedPlayerNames.length >= 4 ? savedPlayerNames.length : 4)),
      circlesMode: 'auto',
      players: [],
      turnOrder: [],
      roles: [],
      roundNumber: 1,
      totalRounds: 8,
      currentTurnIndex: 0,
      secretWord: '',
      hasRevealedCurrent: false,
      timerSeconds: 120
    };
  }

  function loadSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.settings);
      if (raw) {
        return Object.assign({}, DEFAULT_SETTINGS, JSON.parse(raw));
      }
    } catch (e) {}
    return Object.assign({}, DEFAULT_SETTINGS);
  }

  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
    } catch (e) {}
  }

  function loadSavedPlayers() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.players);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed.map((n) => String(n || '').trim()).slice(0, 20);
        }
      }
    } catch (e) {}
    return [];
  }

  function savePlayersList(names) {
    savedPlayerNames = names.slice(0, 20);
    try {
      localStorage.setItem(STORAGE_KEYS.players, JSON.stringify(savedPlayerNames));
    } catch (e) {}
  }

  function loadGameState() {
    const fallback = createEmptyGame();
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.game);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          return Object.assign(fallback, parsed);
        }
      }
    } catch (e) {}
    return fallback;
  }

  function saveGameState() {
    if (game && ['leaderWord', 'handoff', 'discussion', 'finish'].includes(game.screen)) {
      game.savedResumeScreen = game.screen;
    }
    try {
      localStorage.setItem(STORAGE_KEYS.game, JSON.stringify(game));
    } catch (e) {}
  }

  function computeTotalRounds(playerCount, circlesMode) {
    if (circlesMode === 'auto') {
      return playerCount <= 5 ? playerCount * 2 : playerCount;
    }
    const mult = Number(circlesMode) || 1;
    return playerCount * mult;
  }

  // --- Feedback: Sound & Haptics ---
  function triggerHaptic(type) {
    if (!settings.haptics) return;
    if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return;
    try {
      if (type === 'medium') navigator.vibrate(24);
      else if (type === 'double') navigator.vibrate([18, 36, 18]);
      else if (type === 'alert') navigator.vibrate([120, 70, 120, 70, 180]);
      else navigator.vibrate(12);
    } catch (e) {}
  }

  function playBeep(freq, durationMs, gainVal) {
    try {
      const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextCtor) return;
      if (!audioCtx) audioCtx = new AudioContextCtor();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + durationMs / 1000);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + durationMs / 1000);
    } catch (e) {}
  }

  function playClick(hapticType) {
    triggerHaptic(hapticType || 'light');
    if (!settings.sound) return;
    try {
      clickAudio.currentTime = 0;
      const p = clickAudio.play();
      if (p && typeof p.catch === 'function') {
        p.catch(() => playBeep(520, 45, 0.06));
      }
    } catch (e) {
      playBeep(520, 45, 0.06);
    }
  }

  function playTimerChime() {
    triggerHaptic('alert');
    if (!settings.sound) return;
    playBeep(660, 180, 0.14);
    setTimeout(() => playBeep(880, 260, 0.14), 210);
  }

  // --- Wake Lock (Always Keep Screen On) ---
  async function acquireWakeLock() {
    if (!settings.wakeLock) return;
    if (document.visibilityState !== 'visible') return;
    if (!('wakeLock' in navigator) || !navigator.wakeLock) return;
    if (wakeLockSentinel && !wakeLockSentinel.released) return;
    try {
      wakeLockSentinel = await navigator.wakeLock.request('screen');
      wakeLockSentinel.addEventListener('release', () => {
        wakeLockSentinel = null;
      });
    } catch (e) {
      // May fail before user interaction or on battery saver; will retry on interaction/visibility
    }
  }

  async function releaseWakeLock() {
    if (wakeLockSentinel) {
      try {
        await wakeLockSentinel.release();
      } catch (e) {}
      wakeLockSentinel = null;
    }
  }

  function syncWakeLock() {
    if (settings.wakeLock) {
      acquireWakeLock();
    } else {
      releaseWakeLock();
    }
  }

  // --- Theme & Language ---
  function applyTheme() {
    const isLight = settings.theme === 'light';
    if (isLight) {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    const metaTheme = document.getElementById('metaThemeColor');
    if (metaTheme) {
      metaTheme.setAttribute('content', isLight ? '#f5f3ee' : '#141417');
    }
    document.documentElement.setAttribute('lang', settings.lang === 'en' ? 'en' : 'ru');
  }

  // --- Toast & Offline Banner ---
  function showToast(msg) {
    if (!msg) return;
    toastEl.textContent = msg;
    toastEl.classList.remove('hidden');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.classList.add('hidden');
    }, 2600);
  }

  function updateOfflineBanner() {
    if (navigator.onLine) {
      offlineBanner.classList.add('hidden');
    } else {
      offlineBanner.textContent = t().offlineNotice;
      offlineBanner.classList.remove('hidden');
    }
  }

  // --- PWA Install Helpers ---
  function isStandaloneMode() {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: fullscreen)').matches ||
      window.navigator.standalone === true
    );
  }

  function isIOSDevice() {
    const ua = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }

  async function triggerPWAInstall() {
    if (!deferredInstallPrompt) return;
    try {
      deferredInstallPrompt.prompt();
      const choice = await deferredInstallPrompt.userChoice;
      if (choice && choice.outcome === 'accepted') {
        deferredInstallPrompt = null;
        showToast(t().installedToast);
        if (!settingsModal.classList.contains('hidden')) renderSettingsModal();
        if (game.screen === 'start') render();
      }
    } catch (e) {}
  }

  async function performReinstall() {
    if (!navigator.onLine) {
      showToast(t().reinstallOfflineErr);
      return;
    }
    showToast(t().reinstallingToast);
    try {
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.unregister()));
      }
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
    } catch (e) {}

    // localStorage is intentionally untouched — game progress, player names, and settings persist!
    setTimeout(() => {
      const url = new URL(window.location.href);
      url.searchParams.set('reinstalled', String(Date.now()));
      window.location.replace(url.toString());
    }, 350);
  }

  // --- Game Logic ---
  function assignRolesForRound(turnOrderLength) {
    const roles = new Array(turnOrderLength).fill('Detective');
    roles[0] = 'Leader';
    const criminalPos = cryptoRandomInt(1, turnOrderLength - 1);
    roles[criminalPos] = 'Criminal';
    return roles;
  }

  function startNewMatch(playerNames, randomLeader) {
    stopTimer();
    const cleaned = playerNames.map((n) => n.trim());
    savePlayersList(cleaned);

    const players = cleaned.map((name) => ({ name, score: 0 }));
    let turnOrder = players.map((_, idx) => idx);

    if (randomLeader && turnOrder.length > 1) {
      const startIdx = cryptoRandomInt(0, turnOrder.length - 1);
      if (startIdx !== 0) {
        turnOrder = [...turnOrder.slice(startIdx), ...turnOrder.slice(0, startIdx)];
      }
    }

    const totalRounds = computeTotalRounds(players.length, game.circlesMode);

    game = {
      active: true,
      screen: 'leaderWord',
      playerCount: players.length,
      circlesMode: game.circlesMode,
      players,
      turnOrder,
      roles: assignRolesForRound(turnOrder.length),
      roundNumber: 1,
      totalRounds,
      currentTurnIndex: 0,
      secretWord: '',
      hasRevealedCurrent: false,
      timerSeconds: game.timerSeconds || 120
    };
    timerRemaining = game.timerSeconds;
    saveGameState();
    render();
  }

  function advanceToNextRound() {
    stopTimer();
    if (game.roundNumber >= game.totalRounds) {
      game.screen = 'finish';
      saveGameState();
      render();
      return;
    }

    // Rotate leader: move current leader (index 0) to the end of turnOrder
    if (game.turnOrder.length > 1) {
      const prevLeader = game.turnOrder.shift();
      game.turnOrder.push(prevLeader);
    }

    game.roundNumber += 1;
    game.roles = assignRolesForRound(game.turnOrder.length);
    game.currentTurnIndex = 0;
    game.secretWord = '';
    game.hasRevealedCurrent = false;
    game.screen = 'leaderWord';
    timerRemaining = game.timerSeconds || 120;

    saveGameState();
    render();
  }

  function getRandomSuggestedWord() {
    const list = WORD_BANK[settings.lang] || WORD_BANK.ru;
    let available = list.filter((w) => !usedSuggestedWords.has(w));
    if (available.length === 0) {
      usedSuggestedWords.clear();
      available = list;
    }
    const picked = available[cryptoRandomInt(0, available.length - 1)];
    usedSuggestedWords.add(picked);
    return picked;
  }

  // --- Timer Logic ---
  function formatTime(totalSec) {
    const safe = Math.max(0, Math.floor(totalSec));
    const m = Math.floor(safe / 60);
    const s = safe % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function stopTimer() {
    timerRunning = false;
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
      timerIntervalId = null;
    }
  }

  function updateTimerDOM() {
    const readout = document.getElementById('timerReadout');
    const toggleBtn = document.getElementById('timerToggleBtn');
    if (readout) {
      readout.textContent = formatTime(timerRemaining);
      readout.classList.toggle('is-urgent', timerRemaining <= 10 && timerRemaining > 0);
    }
    if (toggleBtn) {
      toggleBtn.textContent = timerRunning ? t().timerPause : t().timerStart;
    }
  }

  function toggleTimer() {
    playClick('light');
    if (timerRunning) {
      stopTimer();
      updateTimerDOM();
      return;
    }
    if (timerRemaining <= 0) {
      timerRemaining = game.timerSeconds || 120;
    }
    timerRunning = true;
    updateTimerDOM();
    timerIntervalId = setInterval(() => {
      timerRemaining -= 1;
      if (timerRemaining <= 0) {
        timerRemaining = 0;
        stopTimer();
        updateTimerDOM();
        playTimerChime();
        showToast(t().timerDone);
      } else {
        updateTimerDOM();
      }
    }, 1000);
  }

  function setTimerPreset(seconds) {
    playClick('light');
    stopTimer();
    game.timerSeconds = seconds;
    timerRemaining = seconds;
    saveGameState();
    render();
  }

  // --- Modals ---
  function openModal(el) {
    el.classList.remove('hidden');
  }

  function closeModal(el) {
    el.classList.add('hidden');
  }

  function showConfirm({ title, message, okText, isDanger, onConfirm }) {
    confirmTitle.textContent = title;
    confirmMessage.textContent = message;
    confirmCancelBtn.textContent = t().cancel;
    confirmOkBtn.textContent = okText;
    confirmOkBtn.className = isDanger ? 'btn btn-danger' : 'btn btn-primary';
    confirmCallback = onConfirm;
    openModal(confirmModal);
  }

  function openScoresModal() {
    playClick('light');
    renderScoresModal();
    openModal(scoresModal);
  }

  function renderScoresModal() {
    const dict = t();
    scoresModalTitle.textContent = dict.scoresTitle;

    if (!game.players || game.players.length === 0) {
      scoresModalBody.innerHTML = `<p class="screen-subtitle">${escapeHtml(dict.noPlayersYet)}</p>`;
      scoresModalFooter.innerHTML = `<button type="button" class="btn btn-primary full-width" data-close-modal="scoresModal">${escapeHtml(dict.done)}</button>`;
      return;
    }

    const maxScore = Math.max(...game.players.map((p) => p.score));

    const rowsHtml = game.players
      .map((player, index) => {
        const isLeader = maxScore > 0 && player.score === maxScore;
        return `
          <div class="score-row">
            <div class="score-player">
              <span class="score-name">${escapeHtml(player.name)}</span>
              ${isLeader ? `<span class="score-sub">${escapeHtml(dict.scoresLeader)}</span>` : ''}
            </div>
            <div class="score-controls">
              <button type="button" class="score-btn minus" data-score-idx="${index}" data-score-delta="-1" aria-label="-1" ${player.score <= 0 ? 'disabled' : ''}>−</button>
              <span class="score-value">${player.score}</span>
              <button type="button" class="score-btn plus" data-score-idx="${index}" data-score-delta="1" aria-label="+1">+</button>
            </div>
          </div>
        `;
      })
      .join('');

    scoresModalBody.innerHTML = `<div class="score-list">${rowsHtml}</div>`;
    scoresModalFooter.innerHTML = `
      <button type="button" id="resetScoresBtn" class="btn btn-secondary">${escapeHtml(dict.scoresReset)}</button>
      <button type="button" class="btn btn-primary" style="flex:1" data-close-modal="scoresModal">${escapeHtml(dict.done)}</button>
    `;

    scoresModalBody.querySelectorAll('[data-score-idx]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-score-idx'));
        const delta = Number(btn.getAttribute('data-score-delta'));
        if (!game.players[idx]) return;
        const nextVal = Math.max(0, game.players[idx].score + delta);
        if (nextVal === game.players[idx].score) return;
        game.players[idx].score = nextVal;
        playClick('light');
        saveGameState();
        renderScoresModal();
        if (game.screen === 'finish') render();
      });
    });

    const resetBtn = document.getElementById('resetScoresBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        playClick('light');
        showConfirm({
          title: dict.confirmResetScoresTitle,
          message: dict.confirmResetScoresMsg,
          okText: dict.confirmResetScoresOk,
          isDanger: true,
          onConfirm: () => {
            game.players.forEach((p) => {
              p.score = 0;
            });
            saveGameState();
            renderScoresModal();
            if (game.screen === 'finish') render();
          }
        });
      });
    }
  }

  function openSettingsModal(initialTab) {
    playClick('light');
    if (initialTab) settingsTab = initialTab;
    renderSettingsModal();
    openModal(settingsModal);
  }

  function renderSettingsModal() {
    const dict = t();
    settingsModalTitle.textContent = settingsTab === 'rules' ? dict.tabRules : dict.settingsTitle;

    settingsTabs.innerHTML = `
      <div class="segmented" role="tablist">
        <button type="button" role="tab" class="segmented-btn ${settingsTab === 'settings' ? 'active' : ''}" data-settings-tab="settings" aria-selected="${settingsTab === 'settings'}">${escapeHtml(dict.tabSettings)}</button>
        <button type="button" role="tab" class="segmented-btn ${settingsTab === 'rules' ? 'active' : ''}" data-settings-tab="rules" aria-selected="${settingsTab === 'rules'}">${escapeHtml(dict.tabRules)}</button>
      </div>
    `;

    settingsTabs.querySelectorAll('[data-settings-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        playClick('light');
        settingsTab = btn.getAttribute('data-settings-tab');
        renderSettingsModal();
      });
    });

    if (settingsTab === 'rules') {
      settingsModalBody.innerHTML = dict.rulesHtml;
      return;
    }

    const standalone = isStandaloneMode();
    const canInstallNative = !standalone && Boolean(deferredInstallPrompt);
    const canShowIOSGuide = !standalone && !canInstallNative && isIOSDevice();

    let installSectionHtml = '';
    if (canInstallNative || canShowIOSGuide) {
      installSectionHtml = `
        <div class="setting-block">
          <div class="setting-info">
            <span class="setting-title">${escapeHtml(dict.installLabel)}</span>
            <span class="setting-desc">${escapeHtml(dict.installDesc)}</span>
          </div>
          ${
            canInstallNative
              ? `<button type="button" id="settingsInstallBtn" class="btn btn-primary btn-sm full-width">${escapeHtml(dict.installBtn)}</button>`
              : `<button type="button" id="settingsIosInstallBtn" class="btn btn-secondary btn-sm full-width">${escapeHtml(dict.installIosBtn)}</button>`
          }
        </div>
      `;
    }

    settingsModalBody.innerHTML = `
      <div class="setting-block">
        <span class="setting-title">${escapeHtml(dict.themeLabel)}</span>
        <div class="segmented">
          <button type="button" class="segmented-btn ${settings.theme === 'dark' ? 'active' : ''}" data-set-theme="dark">${escapeHtml(dict.themeDark)}</button>
          <button type="button" class="segmented-btn ${settings.theme === 'light' ? 'active' : ''}" data-set-theme="light">${escapeHtml(dict.themeLight)}</button>
        </div>
      </div>

      <div class="setting-block">
        <span class="setting-title">${escapeHtml(dict.langLabel)}</span>
        <div class="segmented">
          <button type="button" class="segmented-btn ${settings.lang === 'ru' ? 'active' : ''}" data-set-lang="ru">Русский</button>
          <button type="button" class="segmented-btn ${settings.lang === 'en' ? 'active' : ''}" data-set-lang="en">English</button>
        </div>
      </div>

      <div class="setting-row">
        <div class="setting-info">
          <span class="setting-title">${escapeHtml(dict.soundLabel)}</span>
          <span class="setting-desc">${escapeHtml(dict.soundDesc)}</span>
        </div>
        <label class="switch">
          <input type="checkbox" id="toggleSound" ${settings.sound ? 'checked' : ''}>
          <span class="switch-track"></span>
        </label>
      </div>

      <div class="setting-row">
        <div class="setting-info">
          <span class="setting-title">${escapeHtml(dict.hapticsLabel)}</span>
          <span class="setting-desc">${escapeHtml(dict.hapticsDesc)}</span>
        </div>
        <label class="switch">
          <input type="checkbox" id="toggleHaptics" ${settings.haptics ? 'checked' : ''}>
          <span class="switch-track"></span>
        </label>
      </div>

      <div class="setting-row">
        <div class="setting-info">
          <span class="setting-title">${escapeHtml(dict.wakeLockLabel)}</span>
          <span class="setting-desc">${escapeHtml(dict.wakeLockDesc)}</span>
        </div>
        <label class="switch">
          <input type="checkbox" id="toggleWakeLock" ${settings.wakeLock ? 'checked' : ''}>
          <span class="switch-track"></span>
        </label>
      </div>

      ${installSectionHtml}

      <div class="setting-block">
        <div class="setting-info">
          <span class="setting-title">${escapeHtml(dict.reinstallLabel)}</span>
          <span class="setting-desc">${escapeHtml(dict.reinstallDesc)}</span>
        </div>
        <button type="button" id="reinstallBtn" class="btn btn-secondary btn-sm full-width">${escapeHtml(dict.reinstallBtn)}</button>
      </div>
    `;

    settingsModalBody.querySelectorAll('[data-set-theme]').forEach((btn) => {
      btn.addEventListener('click', () => {
        settings.theme = btn.getAttribute('data-set-theme');
        saveSettings();
        applyTheme();
        playClick('light');
        renderSettingsModal();
      });
    });

    settingsModalBody.querySelectorAll('[data-set-lang]').forEach((btn) => {
      btn.addEventListener('click', () => {
        settings.lang = btn.getAttribute('data-set-lang');
        saveSettings();
        applyTheme();
        playClick('light');
        updateOfflineBanner();
        renderSettingsModal();
        render();
      });
    });

    document.getElementById('toggleSound').addEventListener('change', (e) => {
      settings.sound = e.target.checked;
      saveSettings();
      if (settings.sound) playClick('light');
      else triggerHaptic('light');
    });

    document.getElementById('toggleHaptics').addEventListener('change', (e) => {
      settings.haptics = e.target.checked;
      saveSettings();
      if (settings.haptics) triggerHaptic('medium');
      if (settings.sound) playClick('light');
    });

    document.getElementById('toggleWakeLock').addEventListener('change', (e) => {
      settings.wakeLock = e.target.checked;
      saveSettings();
      syncWakeLock();
      playClick('light');
    });

    const installBtn = document.getElementById('settingsInstallBtn');
    if (installBtn) {
      installBtn.addEventListener('click', () => {
        playClick('light');
        triggerPWAInstall();
      });
    }

    const iosBtn = document.getElementById('settingsIosInstallBtn');
    if (iosBtn) {
      iosBtn.addEventListener('click', () => {
        playClick('light');
        openIOSInstallGuide();
      });
    }

    document.getElementById('reinstallBtn').addEventListener('click', () => {
      playClick('light');
      showConfirm({
        title: dict.confirmReinstallTitle,
        message: dict.confirmReinstallMsg,
        okText: dict.confirmReinstallOk,
        isDanger: false,
        onConfirm: () => {
          closeModal(settingsModal);
          performReinstall();
        }
      });
    });
  }

  function openIOSInstallGuide() {
    const dict = t();
    iosInstallTitle.textContent = dict.iosTitle;
    iosInstallBody.innerHTML = dict.iosSteps;
    iosInstallCloseBtn.textContent = dict.done;
    openModal(iosInstallModal);
  }

  // --- Screen Rendering ---
  function updateHeaderControls() {
    const hasActivePlayers = game.active && game.players && game.players.length > 0;
    scoresBtn.classList.toggle('hidden', !hasActivePlayers);
    scoresBtn.setAttribute('aria-label', t().scoresTitle);
    scoresBtn.setAttribute('title', t().scoresTitle);
    settingsBtn.setAttribute('aria-label', t().settingsTitle);
    settingsBtn.setAttribute('title', t().settingsTitle);
  }

  function render() {
    updateHeaderControls();
    switch (game.screen) {
      case 'setup':
        renderSetupScreen();
        break;
      case 'names':
        renderNamesScreen();
        break;
      case 'leaderWord':
        renderLeaderWordScreen();
        break;
      case 'handoff':
        renderHandoffScreen();
        break;
      case 'discussion':
        renderDiscussionScreen();
        break;
      case 'finish':
        renderFinishScreen();
        break;
      case 'start':
      default:
        renderStartScreen();
        break;
    }
  }

  function renderStartScreen() {
    const dict = t();
    const canResume = game.active && game.players && game.players.length >= 4;
    const standalone = isStandaloneMode();
    const showNativeInstall = !standalone && Boolean(deferredInstallPrompt);
    const showIosInstall = !standalone && !showNativeInstall && isIOSDevice();

    appEl.innerHTML = `
      <section class="screen screen-center">
        <div class="hero-block">
          <img class="hero-emblem" src="./ico/icon_x192.png" alt="Detective Club" width="68" height="68">
          <h1 class="screen-title">Detective Club</h1>
          <p class="screen-subtitle" style="max-width: 38ch;">${escapeHtml(dict.appSubtitle)}</p>
        </div>

        <div class="screen-footer">
          ${
            canResume
              ? `
                <button type="button" id="resumeGameBtn" class="btn btn-primary full-width">${escapeHtml(dict.resumeGame)}</button>
                <div class="meta-line" style="justify-content:center;">
                  <span>${escapeHtml(dict.resumeMeta(game.roundNumber, game.totalRounds, game.players.length))}</span>
                </div>
                <button type="button" id="startNewBtn" class="btn btn-secondary full-width">${escapeHtml(dict.newGame)}</button>
              `
              : `
                <button type="button" id="startNewBtn" class="btn btn-primary full-width">${escapeHtml(dict.newGame)}</button>
              `
          }
          ${
            showNativeInstall
              ? `<button type="button" id="homeInstallBtn" class="btn btn-ghost full-width">${escapeHtml(dict.installBtn)}</button>`
              : ''
          }
          ${
            showIosInstall
              ? `<button type="button" id="homeIosInstallBtn" class="btn btn-ghost full-width">${escapeHtml(dict.installIosBtn)}</button>`
              : ''
          }
        </div>
      </section>
    `;

    const resumeBtn = document.getElementById('resumeGameBtn');
    if (resumeBtn) {
      resumeBtn.addEventListener('click', () => {
        playClick('light');
        if (game.currentTurnIndex === 0 && !game.secretWord) {
          game.screen = 'leaderWord';
        } else if (game.currentTurnIndex < game.turnOrder.length && game.screen === 'start') {
          game.screen = game.secretWord ? 'handoff' : 'leaderWord';
        }
        // Restore exact saved active screen if stored
        if (game.savedResumeScreen && game.savedResumeScreen !== 'start') {
          game.screen = game.savedResumeScreen;
        }
        saveGameState();
        render();
      });
    }

    document.getElementById('startNewBtn').addEventListener('click', () => {
      playClick('light');
      const goSetup = () => {
        stopTimer();
        game.screen = 'setup';
        saveGameState();
        render();
      };

      if (canResume) {
        showConfirm({
          title: dict.confirmNewGameTitle,
          message: dict.confirmNewGameMsg,
          okText: dict.confirmNewGameOk,
          isDanger: false,
          onConfirm: goSetup
        });
      } else {
        goSetup();
      }
    });

    const homeInstallBtn = document.getElementById('homeInstallBtn');
    if (homeInstallBtn) {
      homeInstallBtn.addEventListener('click', () => {
        playClick('light');
        triggerPWAInstall();
      });
    }

    const homeIosInstallBtn = document.getElementById('homeIosInstallBtn');
    if (homeIosInstallBtn) {
      homeIosInstallBtn.addEventListener('click', () => {
        playClick('light');
        openIOSInstallGuide();
      });
    }
  }

  function renderSetupScreen() {
    const dict = t();
    const totalRounds = computeTotalRounds(game.playerCount, game.circlesMode);

    appEl.innerHTML = `
      <section class="screen">
        <div class="screen-body">
          <div>
            <h1 class="screen-title">${escapeHtml(dict.setupTitle)}</h1>
            <p class="screen-subtitle">${escapeHtml(dict.setupSubtitle)}</p>
          </div>

          <div class="panel">
            <div class="field-group">
              <div class="field-label">
                <span>${escapeHtml(dict.playersLabel)}</span>
                <span class="field-hint">${escapeHtml(dict.playersRangeHint)}</span>
              </div>
              <div class="stepper">
                <button type="button" id="decPlayersBtn" class="stepper-btn" aria-label="-1" ${game.playerCount <= 4 ? 'disabled' : ''}>−</button>
                <span id="playerCountVal" class="stepper-value">${game.playerCount}</span>
                <button type="button" id="incPlayersBtn" class="stepper-btn" aria-label="+1" ${game.playerCount >= 20 ? 'disabled' : ''}>+</button>
              </div>
            </div>

            <div class="divider"></div>

            <div class="field-group">
              <div class="field-label">
                <span>${escapeHtml(dict.circlesLabel)}</span>
                <span class="field-hint">${escapeHtml(dict.circleTotalRounds(totalRounds))}</span>
              </div>
              <div class="segmented">
                <button type="button" class="segmented-btn ${game.circlesMode === 'auto' ? 'active' : ''}" data-circles="auto">${escapeHtml(dict.circleAuto)}</button>
                <button type="button" class="segmented-btn ${game.circlesMode === 1 ? 'active' : ''}" data-circles="1">1</button>
                <button type="button" class="segmented-btn ${game.circlesMode === 2 ? 'active' : ''}" data-circles="2">2</button>
                <button type="button" class="segmented-btn ${game.circlesMode === 3 ? 'active' : ''}" data-circles="3">3</button>
              </div>
              ${
                game.circlesMode === 'auto'
                  ? `<span class="field-hint">${escapeHtml(dict.circleAutoHint(game.playerCount))}</span>`
                  : ''
              }
            </div>
          </div>
        </div>

        <div class="screen-footer">
          <button type="button" id="setupNextBtn" class="btn btn-primary full-width">${escapeHtml(dict.next)}</button>
          <button type="button" id="setupBackBtn" class="btn btn-ghost full-width">${escapeHtml(dict.back)}</button>
        </div>
      </section>
    `;

    document.getElementById('decPlayersBtn').addEventListener('click', () => {
      if (game.playerCount <= 4) return;
      playClick('light');
      game.playerCount -= 1;
      saveGameState();
      renderSetupScreen();
    });

    document.getElementById('incPlayersBtn').addEventListener('click', () => {
      if (game.playerCount >= 20) return;
      playClick('light');
      game.playerCount += 1;
      saveGameState();
      renderSetupScreen();
    });

    appEl.querySelectorAll('[data-circles]').forEach((btn) => {
      btn.addEventListener('click', () => {
        playClick('light');
        const val = btn.getAttribute('data-circles');
        game.circlesMode = val === 'auto' ? 'auto' : Number(val);
        saveGameState();
        renderSetupScreen();
      });
    });

    document.getElementById('setupNextBtn').addEventListener('click', () => {
      playClick('light');
      game.screen = 'names';
      saveGameState();
      render();
    });

    document.getElementById('setupBackBtn').addEventListener('click', () => {
      playClick('light');
      game.screen = 'start';
      saveGameState();
      render();
    });
  }

  function renderNamesScreen() {
    const dict = t();
    const count = game.playerCount;
    const rows = [];

    for (let i = 0; i < count; i++) {
      const prefill = savedPlayerNames[i] || '';
      rows.push(`
        <div class="name-row">
          <span class="name-index">${i + 1}.</span>
          <input
            type="text"
            class="text-input player-name-input"
            data-player-idx="${i}"
            value="${escapeHtml(prefill)}"
            placeholder="${escapeHtml(dict.playerPlaceholder(i + 1))}"
            maxlength="28"
            autocomplete="off"
          >
        </div>
      `);
    }

    appEl.innerHTML = `
      <section class="screen">
        <div class="screen-body">
          <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px;">
            <div>
              <h1 class="screen-title">${escapeHtml(dict.namesTitle)}</h1>
              <p class="screen-subtitle">${escapeHtml(dict.namesSubtitle)}</p>
            </div>
            <button type="button" id="clearNamesBtn" class="btn btn-ghost btn-sm">${escapeHtml(dict.clearNames)}</button>
          </div>

          <div class="panel">
            <div class="names-grid ${count >= 8 ? 'many-players' : ''}">
              ${rows.join('')}
            </div>
            <p id="namesError" class="error-text hidden">${escapeHtml(dict.namesError)}</p>
          </div>
        </div>

        <div class="screen-footer">
          <div class="btn-row">
            <button type="button" id="startOrderedBtn" class="btn btn-primary">${escapeHtml(dict.startFirstLeader)}</button>
            <button type="button" id="startRandomBtn" class="btn btn-secondary">${escapeHtml(dict.startRandomLeader)}</button>
          </div>
          <p class="field-hint" style="margin:0; text-align:center;">${escapeHtml(dict.namesOrderHint)}</p>
          <button type="button" id="namesBackBtn" class="btn btn-ghost full-width">${escapeHtml(dict.back)}</button>
        </div>
      </section>
    `;

    const inputs = Array.from(appEl.querySelectorAll('.player-name-input'));
    const errorEl = document.getElementById('namesError');

    const persistDraftNames = () => {
      const updated = savedPlayerNames.slice();
      inputs.forEach((inp, idx) => {
        updated[idx] = inp.value.trim();
      });
      // Keep non-empty trimmed entries aligned by index up to max length
      savedPlayerNames = updated;
      try {
        localStorage.setItem(STORAGE_KEYS.players, JSON.stringify(savedPlayerNames));
      } catch (e) {}
    };

    inputs.forEach((inp, idx) => {
      inp.addEventListener('input', () => {
        errorEl.classList.add('hidden');
        persistDraftNames();
      });
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (idx + 1 < inputs.length) {
            inputs[idx + 1].focus();
          } else {
            document.getElementById('startOrderedBtn').click();
          }
        }
      });
    });

    document.getElementById('clearNamesBtn').addEventListener('click', () => {
      playClick('light');
      inputs.forEach((inp) => {
        inp.value = '';
      });
      savePlayersList([]);
      errorEl.classList.add('hidden');
      if (inputs[0]) inputs[0].focus();
    });

    const tryStart = (randomLeader) => {
      const values = inputs.map((inp) => inp.value.trim());
      const firstEmpty = values.findIndex((v) => !v);
      if (firstEmpty !== -1) {
        triggerHaptic('double');
        errorEl.classList.remove('hidden');
        inputs[firstEmpty].focus();
        return;
      }
      playClick('medium');
      startNewMatch(values, randomLeader);
    };

    document.getElementById('startOrderedBtn').addEventListener('click', () => tryStart(false));
    document.getElementById('startRandomBtn').addEventListener('click', () => tryStart(true));

    document.getElementById('namesBackBtn').addEventListener('click', () => {
      playClick('light');
      persistDraftNames();
      game.screen = 'setup';
      saveGameState();
      render();
    });
  }

  function renderLeaderWordScreen() {
    const dict = t();
    const leaderIdx = game.turnOrder[0];
    const leader = game.players[leaderIdx];
    const totalPlayers = game.turnOrder.length;

    appEl.innerHTML = `
      <section class="screen">
        <div class="screen-body">
          <div class="meta-line">
            <span>${escapeHtml(dict.roundMeta(game.roundNumber, game.totalRounds))}</span>
            <span class="meta-sep" aria-hidden="true">·</span>
            <span>${escapeHtml(dict.playerStepMeta(1, totalPlayers))}</span>
            <span class="meta-sep" aria-hidden="true">·</span>
            <span style="color: var(--role-leader); font-weight: 600;">${escapeHtml(dict.leaderRole)}</span>
          </div>

          <div>
            <h1 class="screen-title">${escapeHtml(dict.leaderTitle(leader ? leader.name : ''))}</h1>
            <p class="screen-subtitle">${escapeHtml(dict.leaderSubtitle)}</p>
          </div>

          <div class="panel">
            <div class="word-input-wrap">
              <input
                type="text"
                id="secretWordInput"
                class="text-input word-input"
                value="${escapeHtml(game.secretWord || '')}"
                placeholder="${escapeHtml(dict.wordPlaceholder)}"
                maxlength="48"
                autocomplete="off"
                autocorrect="off"
              >
              <button type="button" id="suggestWordBtn" class="btn btn-secondary btn-sm full-width">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <path d="M12 22.08V12"></path>
                  <path d="m3.27 6.96 8.73 5.05 8.73-5.05"></path>
                </svg>
                ${escapeHtml(dict.suggestWord)}
              </button>
              <p id="wordError" class="error-text hidden">${escapeHtml(dict.wordError)}</p>
            </div>
          </div>
        </div>

        <div class="screen-footer">
          <button type="button" id="confirmWordBtn" class="btn btn-primary full-width">${escapeHtml(dict.confirmWord)}</button>
        </div>
      </section>
    `;

    const wordInput = document.getElementById('secretWordInput');
    const wordError = document.getElementById('wordError');

    wordInput.addEventListener('input', () => {
      wordError.classList.add('hidden');
      game.secretWord = wordInput.value;
      saveGameState();
    });

    wordInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('confirmWordBtn').click();
      }
    });

    document.getElementById('suggestWordBtn').addEventListener('click', () => {
      playClick('light');
      const suggested = getRandomSuggestedWord();
      wordInput.value = suggested;
      game.secretWord = suggested;
      wordError.classList.add('hidden');
      saveGameState();
    });

    document.getElementById('confirmWordBtn').addEventListener('click', () => {
      const word = wordInput.value.trim();
      if (!word) {
        triggerHaptic('double');
        wordError.classList.remove('hidden');
        wordInput.focus();
        return;
      }
      playClick('medium');
      game.secretWord = word;
      game.currentTurnIndex = 1;
      game.hasRevealedCurrent = false;
      game.screen = 'handoff';
      saveGameState();
      render();
    });
  }

  function renderHandoffScreen() {
    const dict = t();
    const turnIdx = game.currentTurnIndex;
    const totalPlayers = game.turnOrder.length;
    const playerIdx = game.turnOrder[turnIdx];
    const player = game.players[playerIdx];
    const role = game.roles[turnIdx] || 'Detective';
    const isLastPlayer = turnIdx >= totalPlayers - 1;
    const isCriminal = role === 'Criminal';

    const roleDisplay = isCriminal ? dict.criminalRole : dict.detectiveRole;
    const roleClass = isCriminal ? 'criminal' : 'detective';

    appEl.innerHTML = `
      <section class="screen">
        <div class="screen-body">
          <div class="meta-line">
            <span>${escapeHtml(dict.roundMeta(game.roundNumber, game.totalRounds))}</span>
            <span class="meta-sep" aria-hidden="true">·</span>
            <span>${escapeHtml(dict.playerStepMeta(turnIdx + 1, totalPlayers))}</span>
          </div>

          <div>
            <h1 class="screen-title">${escapeHtml(dict.handoffTitle(player ? player.name : ''))}</h1>
            <p class="screen-subtitle">${escapeHtml(dict.handoffSubtitle)}</p>
          </div>

          <div
            id="revealCard"
            class="reveal-card role-${roleClass}"
            role="button"
            tabindex="0"
            aria-label="${escapeHtml(dict.holdPromptTitle)}"
          >
            <div id="revealHiddenView">
              <div class="reveal-icon" style="margin-bottom: 10px;">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <p class="reveal-prompt-title">${escapeHtml(dict.holdPromptTitle)}</p>
              <p class="reveal-prompt-sub">${escapeHtml(dict.holdPromptSub)}</p>
            </div>

            <div id="revealShownView" class="hidden">
              <div class="role-label ${roleClass}">
                ${
                  isCriminal
                    ? `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2a10 10 0 1 0 10 10"></path><path d="m16 8 5-5"></path><path d="m16 3 5 5"></path></svg>`
                    : `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>`
                }
                <span>${escapeHtml(dict.yourRole)}: ${escapeHtml(roleDisplay)}</span>
              </div>
              ${
                isCriminal
                  ? `<p class="secret-word-display">???</p><p class="reveal-prompt-sub" style="margin-top:8px; max-width:30ch;">${escapeHtml(dict.criminalHint)}</p>`
                  : `<p class="secret-word-display">${escapeHtml(game.secretWord)}</p>`
              }
            </div>
          </div>

          <div id="seenNote" class="seen-note">${game.hasRevealedCurrent ? escapeHtml(dict.seenConfirmed) : ''}</div>
        </div>

        <div class="screen-footer">
          <button
            type="button"
            id="handoffNextBtn"
            class="btn btn-primary full-width"
            ${game.hasRevealedCurrent ? '' : 'disabled'}
          >
            ${escapeHtml(isLastPlayer ? dict.startDiscussion : dict.nextPlayer)}
          </button>
        </div>
      </section>
    `;

    const card = document.getElementById('revealCard');
    const hiddenView = document.getElementById('revealHiddenView');
    const shownView = document.getElementById('revealShownView');
    const seenNote = document.getElementById('seenNote');
    const nextBtn = document.getElementById('handoffNextBtn');

    let isHolding = false;

    const showSecret = () => {
      if (isHolding) return;
      isHolding = true;
      card.classList.add('is-revealed');
      hiddenView.classList.add('hidden');
      shownView.classList.remove('hidden');
      playClick('medium');

      if (!game.hasRevealedCurrent) {
        game.hasRevealedCurrent = true;
        saveGameState();
        seenNote.textContent = dict.seenConfirmed;
        nextBtn.disabled = false;
      }
    };

    const hideSecret = () => {
      if (!isHolding) return;
      isHolding = false;
      card.classList.remove('is-revealed');
      shownView.classList.add('hidden');
      hiddenView.classList.remove('hidden');
    };

    card.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      if (card.setPointerCapture) {
        try {
          card.setPointerCapture(e.pointerId);
        } catch (err) {}
      }
      showSecret();
    });
    card.addEventListener('pointerup', hideSecret);
    card.addEventListener('pointercancel', hideSecret);
    card.addEventListener('lostpointercapture', hideSecret);
    card.addEventListener('contextmenu', (e) => e.preventDefault());

    card.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        showSecret();
      }
    });
    card.addEventListener('keyup', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        hideSecret();
      }
    });
    card.addEventListener('blur', hideSecret);

    nextBtn.addEventListener('click', () => {
      if (!game.hasRevealedCurrent) return;
      playClick('light');
      if (isLastPlayer) {
        game.screen = 'discussion';
        timerRemaining = game.timerSeconds || 120;
        saveGameState();
        render();
      } else {
        game.currentTurnIndex += 1;
        game.hasRevealedCurrent = false;
        saveGameState();
        render();
      }
    });
  }

  function renderDiscussionScreen() {
    const dict = t();
    const leaderIdx = game.turnOrder[0];
    const leader = game.players[leaderIdx];
    const isFinalRound = game.roundNumber >= game.totalRounds;
    const preset = game.timerSeconds || 120;

    appEl.innerHTML = `
      <section class="screen">
        <div class="screen-body">
          <div class="meta-line">
            <span>${escapeHtml(dict.roundMeta(game.roundNumber, game.totalRounds))}</span>
            <span class="meta-sep" aria-hidden="true">·</span>
            <span>${escapeHtml(dict.leaderLabel(leader ? leader.name : ''))}</span>
          </div>

          <div>
            <h1 class="screen-title">${escapeHtml(dict.discussionTitle)}</h1>
            <p class="screen-subtitle">${escapeHtml(dict.discussionSubtitle)}</p>
          </div>

          <div class="timer-card">
            <span class="field-hint">${escapeHtml(dict.timerTitle)}</span>
            <div id="timerReadout" class="timer-readout ${timerRemaining <= 10 && timerRemaining > 0 ? 'is-urgent' : ''}">${formatTime(timerRemaining)}</div>
            <div class="timer-presets">
              <button type="button" class="btn btn-sm ${preset === 60 ? 'btn-primary' : 'btn-secondary'}" data-preset="60">1:00</button>
              <button type="button" class="btn btn-sm ${preset === 120 ? 'btn-primary' : 'btn-secondary'}" data-preset="120">2:00</button>
              <button type="button" class="btn btn-sm ${preset === 180 ? 'btn-primary' : 'btn-secondary'}" data-preset="180">3:00</button>
            </div>
            <div class="timer-controls">
              <button type="button" id="timerToggleBtn" class="btn btn-secondary">${escapeHtml(timerRunning ? dict.timerPause : dict.timerStart)}</button>
              <button type="button" id="timerResetBtn" class="btn btn-ghost">${escapeHtml(dict.timerReset)}</button>
            </div>
          </div>

          <button type="button" id="peekWordBtn" class="btn btn-secondary full-width" style="touch-action:none;">
            ${escapeHtml(dict.holdLeaderWord)}
          </button>
        </div>

        <div class="screen-footer">
          <button type="button" id="openScoresInlineBtn" class="btn btn-secondary full-width">${escapeHtml(dict.openScores)}</button>
          <button type="button" id="nextRoundBtn" class="btn btn-primary full-width">${escapeHtml(isFinalRound ? dict.finishGame : dict.nextRound)}</button>
        </div>
      </section>
    `;

    appEl.querySelectorAll('[data-preset]').forEach((btn) => {
      btn.addEventListener('click', () => {
        setTimerPreset(Number(btn.getAttribute('data-preset')));
      });
    });

    document.getElementById('timerToggleBtn').addEventListener('click', toggleTimer);

    document.getElementById('timerResetBtn').addEventListener('click', () => {
      playClick('light');
      stopTimer();
      timerRemaining = game.timerSeconds || 120;
      updateTimerDOM();
    });

    const peekBtn = document.getElementById('peekWordBtn');
    const showPeek = () => {
      triggerHaptic('light');
      peekBtn.textContent = game.secretWord;
    };
    const hidePeek = () => {
      peekBtn.textContent = dict.holdLeaderWord;
    };
    peekBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      if (peekBtn.setPointerCapture) {
        try {
          peekBtn.setPointerCapture(e.pointerId);
        } catch (err) {}
      }
      showPeek();
    });
    peekBtn.addEventListener('pointerup', hidePeek);
    peekBtn.addEventListener('pointercancel', hidePeek);
    peekBtn.addEventListener('lostpointercapture', hidePeek);
    peekBtn.addEventListener('blur', hidePeek);
    peekBtn.addEventListener('contextmenu', (e) => e.preventDefault());

    document.getElementById('openScoresInlineBtn').addEventListener('click', openScoresModal);

    document.getElementById('nextRoundBtn').addEventListener('click', () => {
      playClick('medium');
      advanceToNextRound();
    });
  }

  function renderFinishScreen() {
    const dict = t();
    const sorted = game.players
      .map((p, idx) => ({ name: p.name, score: p.score, idx }))
      .sort((a, b) => b.score - a.score);

    const topScore = sorted.length > 0 ? sorted[0].score : 0;

    const listHtml = sorted
      .map((p, rank) => {
        const isWinner = topScore > 0 && p.score === topScore;
        return `
          <div class="score-row">
            <div class="score-player">
              <span class="score-name">${rank + 1}. ${escapeHtml(p.name)}</span>
              ${isWinner ? `<span class="score-sub">${escapeHtml(dict.scoresLeader)}</span>` : ''}
            </div>
            <span class="score-value">${p.score}</span>
          </div>
        `;
      })
      .join('');

    appEl.innerHTML = `
      <section class="screen">
        <div class="screen-body">
          <div>
            <h1 class="screen-title">${escapeHtml(dict.finishTitle)}</h1>
            <p class="screen-subtitle">${escapeHtml(dict.finishSubtitle)}</p>
          </div>

          <div class="panel">
            <div class="score-list">
              ${listHtml}
            </div>
          </div>
        </div>

        <div class="screen-footer">
          <button type="button" id="finishScoresBtn" class="btn btn-secondary full-width">${escapeHtml(dict.openScores)}</button>
          <button type="button" id="rematchBtn" class="btn btn-primary full-width">${escapeHtml(dict.rematchSame)}</button>
          <button type="button" id="finishNewGameBtn" class="btn btn-ghost full-width">${escapeHtml(dict.newGame)}</button>
        </div>
      </section>
    `;

    document.getElementById('finishScoresBtn').addEventListener('click', openScoresModal);

    document.getElementById('rematchBtn').addEventListener('click', () => {
      playClick('medium');
      const names = game.players.map((p) => p.name);
      startNewMatch(names, true);
    });

    document.getElementById('finishNewGameBtn').addEventListener('click', () => {
      playClick('light');
      game.active = false;
      game.screen = 'setup';
      saveGameState();
      render();
    });
  }

  // --- Global Events ---
  homeBtn.addEventListener('click', () => {
    playClick('light');
    if (game.screen === 'start') return;

    if (game.active && ['leaderWord', 'handoff', 'discussion', 'finish'].includes(game.screen)) {
      const dict = t();
      showConfirm({
        title: dict.confirmHomeTitle,
        message: dict.confirmHomeMsg,
        okText: dict.confirmHomeOk,
        isDanger: false,
        onConfirm: () => {
          stopTimer();
          game.savedResumeScreen = game.screen;
          game.screen = 'start';
          saveGameState();
          render();
        }
      });
    } else {
      game.screen = 'start';
      saveGameState();
      render();
    }
  });

  scoresBtn.addEventListener('click', openScoresModal);
  settingsBtn.addEventListener('click', () => openSettingsModal('settings'));

  // Close modal buttons & backdrop click
  document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('[data-close-modal]');
    if (closeBtn) {
      playClick('light');
      const modalId = closeBtn.getAttribute('data-close-modal');
      const target = document.getElementById(modalId);
      if (target) closeModal(target);
      return;
    }

    if (e.target.classList.contains('modal-backdrop') && e.target.id !== 'confirmModal') {
      playClick('light');
      closeModal(e.target);
    }
  });

  confirmCancelBtn.addEventListener('click', () => {
    playClick('light');
    confirmCallback = null;
    closeModal(confirmModal);
  });

  confirmOkBtn.addEventListener('click', () => {
    playClick('medium');
    const cb = confirmCallback;
    confirmCallback = null;
    closeModal(confirmModal);
    if (typeof cb === 'function') cb();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!confirmModal.classList.contains('hidden')) {
        confirmCallback = null;
        closeModal(confirmModal);
      } else if (!iosInstallModal.classList.contains('hidden')) {
        closeModal(iosInstallModal);
      } else if (!scoresModal.classList.contains('hidden')) {
        closeModal(scoresModal);
      } else if (!settingsModal.classList.contains('hidden')) {
        closeModal(settingsModal);
      }
    }
  });

  // Wake Lock lifecycle
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      syncWakeLock();
    }
  });

  document.addEventListener(
    'pointerdown',
    () => {
      if (settings.wakeLock && (!wakeLockSentinel || wakeLockSentinel.released)) {
        acquireWakeLock();
      }
    },
    { passive: true }
  );

  // Online / Offline indicator
  window.addEventListener('online', updateOfflineBanner);
  window.addEventListener('offline', updateOfflineBanner);

  // PWA Install Prompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    if (game.screen === 'start') render();
    if (!settingsModal.classList.contains('hidden') && settingsTab === 'settings') {
      renderSettingsModal();
    }
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    showToast(t().installedToast);
    if (game.screen === 'start') render();
    if (!settingsModal.classList.contains('hidden') && settingsTab === 'settings') {
      renderSettingsModal();
    }
  });

  // Service Worker registration (relative path for GitHub Pages deploy-from-branch)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./service-worker.js', { scope: './' })
        .catch(() => {});
    });
  }

  // Clean reinstall query parameter if present
  try {
    const currentUrl = new URL(window.location.href);
    if (currentUrl.searchParams.has('reinstalled')) {
      currentUrl.searchParams.delete('reinstalled');
      window.history.replaceState({}, '', currentUrl.toString());
    }
  } catch (e) {}

  // --- Boot ---
  applyTheme();
  updateOfflineBanner();
  syncWakeLock();
  render();
})();