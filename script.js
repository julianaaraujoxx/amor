/* =========================================
   CONFIGURAÇÃO
========================================= */

const correctPassword = "euteamo";

const music = document.getElementById("backgroundMusic");

let musicPlaying = false;


/* =========================================
   LOGIN
========================================= */

function checkPassword() {

    const passwordInput =
        document.getElementById("password");

    const password =
        passwordInput.value;

    const errorMessage =
        document.getElementById("errorMessage");


    if (password === correctPassword) {

        document.getElementById("loginScreen")
            .style.display = "none";

        document.getElementById("secretSite")
            .style.display = "block";

        errorMessage.textContent = "";

        document.body.style.overflow = "auto";

        window.scrollTo(0, 0);


        /* ================================
           INICIA A MÚSICA
        ================================= */

        music.volume = 0.45;

        music.play()
            .then(() => {

                musicPlaying = true;

                updateMusicButton();

            })
            .catch(() => {

                console.log(
                    "O navegador bloqueou a reprodução automática."
                );

            });

    }

    else {

        errorMessage.textContent =
            "Senha incorreta, meu amor... tente novamente.";

        passwordInput.value = "";

        passwordInput.focus();

    }

}


/* =========================================
   ENTER NO TECLADO
========================================= */

document
    .getElementById("password")
    .addEventListener(
        "keypress",
        function(event) {

            if (event.key === "Enter") {

                checkPassword();

            }

        }
    );


/* =========================================
   MÚSICA
========================================= */

function toggleMusic() {

    if (music.paused) {

        music.play()
            .then(() => {

                musicPlaying = true;

                updateMusicButton();

            });

    }

    else {

        music.pause();

        musicPlaying = false;

        updateMusicButton();

    }

}


function updateMusicButton() {

    const button =
        document.getElementById("musicButton");

    if (musicPlaying) {

        button.innerHTML =
            "🔊 Música";

        button.classList.add("playing");

    }

    else {

        button.innerHTML =
            "🔇 Música";

        button.classList.remove("playing");

    }

}


/* =========================================
   BLOQUEAR SITE
========================================= */

function lockSite() {

    document.getElementById("secretSite")
        .style.display = "none";

    document.getElementById("loginScreen")
        .style.display = "flex";

    document.getElementById("password")
        .value = "";

    window.scrollTo(0, 0);

    music.pause();

    music.currentTime = 0;

    musicPlaying = false;

    updateMusicButton();

}


/* =========================================
   SCROLL
========================================= */

function scrollToSection(sectionId) {

    const section =
        document.getElementById(sectionId);

    if (!section) {
        return;
    }

    section.scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================================
   CONTAGEM REGRESSIVA
========================================= */

/*
    DATA DA VIAGEM

    17 de setembro de 2026

    Horário utilizado:
    00:00:00

    Se quiser mudar para outro horário,
    altere a linha abaixo.
*/

const tripDate =
    new Date("2026-09-17T00:00:00-03:00");


function updateCountdown() {

    const now = new Date();

    const difference =
        tripDate.getTime() -
        now.getTime();


    if (difference <= 0) {

        document.getElementById("days")
            .textContent = "00";

        document.getElementById("hours")
            .textContent = "00";

        document.getElementById("minutes")
            .textContent = "00";

        document.getElementById("seconds")
            .textContent = "00";

        return;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (difference %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (difference %
                (1000 * 60)) /
            1000
        );


    document.getElementById("days")
        .textContent =
        String(days).padStart(2, "0");


    document.getElementById("hours")
        .textContent =
        String(hours).padStart(2, "0");


    document.getElementById("minutes")
        .textContent =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds")
        .textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =========================================
   CARTA
========================================= */

function openLetter() {

    const modal =
        document.getElementById("letterModal");

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeLetter() {

    const modal =
        document.getElementById("letterModal");

    modal.classList.remove("active");

    document.body.style.overflow = "auto";

}


/* =========================================
   FECHAR CARTA CLICANDO FORA
========================================= */

document
    .getElementById("letterModal")
    .addEventListener(
        "click",
        function(event) {

            if (event.target === this) {

                closeLetter();

            }

        }
    );


/* =========================================
   JOGO
========================================= */

const game =
    document.getElementById("game");

const player =
    document.getElementById("player");

const gameMessage =
    document.getElementById("gameMessage");

const scoreElement =
    document.getElementById("score");

const coinsElement =
    document.getElementById("coins");

const livesElement =
    document.getElementById("lives");


let gameStarted = false;

let playerX = 70;

let playerY = 0;

let velocityY = 0;

let jumping = false;

let score = 0;

let coins = 0;

let lives = 3;

let gameLoop;

let collectedCoins = [];


/* =========================================
   INICIAR JOGO
========================================= */

function startGame() {

    gameStarted = true;

    score = 0;

    coins = 0;

    lives = 3;

    playerX = 70;

    playerY = 0;

    velocityY = 0;

    jumping = false;

    collectedCoins = [];


    scoreElement.textContent = "0";

    coinsElement.textContent = "0";

    updateLives();


    document
        .querySelectorAll(".coin")
        .forEach(
            coin => {

                coin.classList.remove("collected");

                coin.dataset.collected =
                    "false";

            }
        );


    gameMessage.classList.add("hidden");


    player.style.left =
        playerX + "px";

    player.style.bottom =
        "25px";


    game.focus();


    if (gameLoop) {

        cancelAnimationFrame(gameLoop);

    }

    updateGame();

}


/* =========================================
   CONTROLES
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (!gameStarted) {
            return;
        }

        if (
            event.key === "ArrowLeft" ||
            event.key.toLowerCase() === "a"
        ) {

            event.preventDefault();

            moveLeft();

        }


        if (
            event.key === "ArrowRight" ||
            event.key.toLowerCase() === "d"
        ) {

            event.preventDefault();

            moveRight();

        }


        if (
            event.key === " " ||
            event.key === "ArrowUp" ||
            event.key.toLowerCase() === "w"
        ) {

            event.preventDefault();

            jump();

        }

    }
);


/* =========================================
   ANDAR
========================================= */

function moveLeft() {

    if (!gameStarted) {
        return;
    }

    playerX -= 20;

    if (playerX < 5) {

        playerX = 5;

    }

    player.classList.add("walking");

    updatePlayerPosition();

    setTimeout(
        () => player.classList.remove("walking"),
        150
    );

}


function moveRight() {

    if (!gameStarted) {
        return;
    }

    const maxX =
        game.clientWidth - 70;

    playerX += 20;

    if (playerX > maxX) {

        playerX = maxX;

    }

    player.classList.add("walking");

    updatePlayerPosition();

    setTimeout(
        () => player.classList.remove("walking"),
        150
    );

}


/* =========================================
   PULAR
========================================= */

function jump() {

    if (!gameStarted) {
        return;
    }

    if (jumping) {
        return;
    }

    jumping = true;

    velocityY = 12;

    player.classList.add("jumping");

}


/* =========================================
   POSIÇÃO
========================================= */

function updatePlayerPosition() {

    player.style.left =
        playerX + "px";

}


/* =========================================
   FÍSICA
========================================= */

function updatePhysics() {

    if (!jumping) {
        return;
    }

    playerY += velocityY;

    velocityY -= 0.7;


    if (playerY <= 0) {

        playerY = 0;

        velocityY = 0;

        jumping = false;

        player.classList.remove("jumping");

    }


    player.style.transform =
        `translateY(${-playerY}px)`;

}


/* =========================================
   COLETAR MOEDAS
========================================= */

function checkCoins() {

    const playerRect =
        player.getBoundingClientRect();


    document
        .querySelectorAll(".coin")
        .forEach(
            coin => {

                if (
                    coin.dataset.collected ===
                    "true"
                ) {

                    return;

                }


                const coinRect =
                    coin.getBoundingClientRect();


                if (
                    isColliding(
                        playerRect,
                        coinRect
                    )
                ) {

                    coin.dataset.collected =
                        "true";

                    coin.classList.add(
                        "collected"
                    );

                    coins++;

                    score += 100;


                    coinsElement.textContent =
                        coins;

                    scoreElement.textContent =
                        score;

                }

            }
        );

}


/* =========================================
   INIMIGOS
========================================= */

function checkEnemies() {

    const playerRect =
        player.getBoundingClientRect();


    document
        .querySelectorAll(".enemy")
        .forEach(
            enemy => {

                const enemyRect =
                    enemy.getBoundingClientRect();


                if (
                    isColliding(
                        playerRect,
                        enemyRect
                    )
                ) {

                    loseLife();

                }

            }
        );

}


/* =========================================
   COLISÃO
========================================= */

function isColliding(a, b) {

    return !(
        a.right < b.left ||
        a.left > b.right ||
        a.bottom < b.top ||
        a.top > b.bottom
    );

}


/* =========================================
   PERDER VIDA
========================================= */

let lastHit = 0;

function loseLife() {

    const now =
        Date.now();


    if (now - lastHit < 1200) {
        return;
    }

    lastHit = now;

    lives--;

    updateLives();


    playerX = 70;

    playerY = 0;

    velocityY = 0;

    jumping = false;

    player.classList.remove(
        "jumping"
    );

    updatePlayerPosition();


    if (lives <= 0) {

        endGame(false);

    }

}


/* =========================================
   VIDAS
========================================= */

function updateLives() {

    let hearts = "";

    for (
        let i = 0;
        i < lives;
        i++
    ) {

        hearts += "❤️";

    }

    livesElement.textContent =
        hearts || "💀";

}


/* =========================================
   CHEGADA
========================================= */

function checkFinish() {

    const playerRect =
        player.getBoundingClientRect();

    const flag =
        document.querySelector(".flag");

    const flagRect =
        flag.getBoundingClientRect();


    if (
        isColliding(
            playerRect,
            flagRect
        )
    ) {

        endGame(true);

    }

}


/* =========================================
   FINAL DO JOGO
========================================= */

function endGame(won) {

    gameStarted = false;


    if (gameLoop) {

        cancelAnimationFrame(
            gameLoop
        );

    }


    if (won) {

        score += 500;

        scoreElement.textContent =
            score;


        gameMessage.innerHTML = `

            <div>

                <h3>
                    VOCÊ CONSEGUIU! 💛
                </h3>

                <p>
                    Chegou até o nosso coração.
                </p>

                <p>
                    Pontuação:
                    <strong>
                        ${score}
                    </strong>
                </p>

                <button onclick="startGame()">
                    JOGAR DE NOVO
                </button>

            </div>

        `;

    }

    else {

        gameMessage.innerHTML = `

            <div>

                <h3>
                    GAME OVER 💔
                </h3>

                <p>
                    Folgada, precisa tentar de novo.
                </p>

                <button onclick="startGame()">
                    TENTAR NOVAMENTE
                </button>

            </div>

        `;

    }


    gameMessage.classList.remove(
        "hidden"
    );

}


/* =========================================
   LOOP DO JOGO
========================================= */

function updateGame() {

    if (!gameStarted) {
        return;
    }


    updatePhysics();

    checkCoins();

    checkEnemies();

    checkFinish();


    gameLoop =
        requestAnimationFrame(
            updateGame
        );

}


/* =========================================
   BOTÕES MOBILE
========================================= */

game.addEventListener(
    "click",
    function() {

        game.focus();

    }
);


/* =========================================
   INICIAR ESTADO
========================================= */

updateLives();
