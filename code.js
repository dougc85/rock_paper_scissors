// Rock Paper Scissors - programmed to try to make use of newly learned 
//DOM manipulation
// -Doug Carter


const screenBackground = document.querySelector('.screen-background');
const startButton = document.querySelector('.start');
const quitButton = document.querySelector('.quit');
const introScreen = document.querySelector('.intro-screen');
const quitScreen = document.querySelector('.quit-screen');
const colorLayer = document.querySelector('.color-layer');

const handsBox = document.querySelector('.hands-box');
const choiceScreen = document.querySelector('.choice-screen');
const throwScreen = document.querySelector('.throw-screen');
const tieScreen = document.querySelector('.tie-screen');

const scissorsScreen = document.querySelector('.scissors-screen');
const scissorsLoser = scissorsScreen.querySelector('.scissors-loser');
const scissorsWinner = scissorsScreen.querySelector('.scissors-winner');


const paperOrRockScreen = document.querySelector(".paper-or-rock-screen");
const paperOrRockLoser = paperOrRockScreen.querySelector('.paper-or-rock-loser');
const paperOrRockWinner = paperOrRockScreen.querySelector('.paper-or-rock-winner');



const scoreScreen = document.querySelector(".score-screen");
const loseScreen = document.querySelector(".lose-screen");
const winScreen = document.querySelector(".win-screen");
const finalScreen = document.querySelector(".final-screen");

const yKeys = Array.from(document.querySelectorAll(".y-key"));
const nKeys = Array.from(document.querySelectorAll(".n-key"));

(yKeys.concat(nKeys)).forEach(key => {
    key.addEventListener('click', restart);
});

//Events for Intro Page
startButton.addEventListener('click', startGame);
quitButton.addEventListener('click', quitGame);

//Functions for Intro Page
function startGame(e) {
    introScreen.classList.toggle('disappear');
    choiceScreen.classList.toggle('disappear');
}

function quitGame(e) {
    introScreen.classList.toggle('disappear');
    colorLayer.classList.toggle('disappear');
    screenBackground.classList.toggle('disappear');
    quitScreen.classList.toggle('disappear');
}

//Constants for Choice Page
const rockChoice = document.querySelector(".rock-choice");
const paperChoice = document.querySelector(".paper-choice");
const scissorsChoice = document.querySelector(".scissors-choice");

//Event for player choosing weapon
handsBox.addEventListener("click", playRound);

//Constants for Throw page - 
const playerThrows = document.querySelector('.player-throws');
const cpuThrows = document.querySelector('.cpu-throws');
const playerWeapon = document.querySelector('.player-weapon');
const cpuWeapon = document.querySelector('.cpu-weapon');

//Array of elements of Throw page - used for timed reveal
let appearingItems = [playerThrows, playerWeapon, cpuThrows, cpuWeapon];
const appearingItemsLength = 4;

//Sleep function
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

let cpuScore = 0;
let playerScore = 0;


//Helper for playRound
//Picks weapon for computer

function computerPlay() {

    let choice = Math.floor(Math.random() * 3);
    if (choice === 1) {
        cpuWeapon.setAttribute("src", "images/rock.jpg");
        return 'rock';
    } else if (choice === 2) {
        cpuWeapon.setAttribute("src", "images/paper.jpg");
        return "paper";
    } else {
        cpuWeapon.setAttribute("src", "images/scissors.jpg");
        return "scissors";
    }
}

//Helper for playRound
//Picks weapon for player
function humanPlay(e) {
    if (e.target === rockChoice) {
        playerWeapon.setAttribute("src", "images/rock.jpg");
        return 'rock';
    } else if (e.target === paperChoice) {
        playerWeapon.setAttribute("src", "images/paper.jpg");
        return 'paper';
    } else if (e.target === scissorsChoice) {
        playerWeapon.setAttribute("src", "images/scissors.jpg");
        return 'scissors';
    }
}

//Helper for playRound
//Returns an array: [winner message, throw-message]
function determineWinner(playerSelection, computerSelection) {
    let player = playerSelection;
    let cpu = computerSelection;

    if (player === cpu) {
        return ['tie', 'You and THE MACHINE have come to an impasse this round.'];
    }

    if (player === 'rock') {
        if (cpu === 'paper') {
            cpuScore++;
            return ['You lose!', 'Paper covers Rock.'];
        }
        playerScore++;
        return ['You win!', 'Rock crushes Scissors.'];
    } else if (player === 'paper') {
        if (cpu === 'rock') {
            playerScore++;
            return ['You win!', 'Paper covers Rock.'];
        }
        cpuScore++;
        return ['You lose!', 'Scissors cut Paper.'];
    } else {
        if (cpu === 'paper') {
            playerScore++;
            return ['You win!', 'Scissors cut Paper.'];
        }
        cpuScore++;
        return ['You lose!', 'Rock crushes Scissors.'];
    }
}

const injuredCpuImages = ["images/injuredcpu1.jpg", "images/injuredcpu2.jpg", "images/injuredcpu3.jpg"];
const injuredPersonImages = ["images/injuredperson1.jpg", "images/injuredperson2.jpg", "images/injuredperson3.jpg"];

function showResults(results) {

    if (results[0] == "tie") {
        return
    } else if (results[1] === 'Scissors cut Paper.') {
        if (results[0] === 'You win!') {
            scissorsLoser.setAttribute("src", injuredCpuImages[(playerScore - 1)]);
            scissorsWinner.setAttribute("src", "images/personwinsscissors.jpg");
        }
        else {
            scissorsLoser.setAttribute("src", injuredPersonImages[(cpuScore - 1)]);
            scissorsWinner.setAttribute("src", "images/cpuwinsscissors.jpg");
        }
        scissorsScreen.querySelector(".win-message").textContent = results[0];
        scissorsScreen.querySelector(".win-description").textContent = results[1];
        return;
    } else {
        let personWinsImage = (results[1] == 'Rock crushes Scissors.') ? "images/personwinsrock.jpg" : "images/personwinspaper.jpg";
        let cpuWinsImage = (results[1] == 'Rock crushes Scissors.') ? "images/cpuwinsrock.jpg" : "images/cpuwinspaper.jpg";
        let fightImage = (results[1] == 'Rock crushes Scissors.') ? "images/rockonscissors.jpg" : "images/paperonrock.jpg";

        if (results[0] === 'You win!') {
            paperOrRockLoser.setAttribute("src", injuredCpuImages[(playerScore - 1)]);
            paperOrRockWinner.setAttribute("src", personWinsImage);
        }
        else {
            paperOrRockLoser.setAttribute("src", injuredPersonImages[(cpuScore - 1)]);
            paperOrRockWinner.setAttribute("src", cpuWinsImage);
        }

        paperOrRockScreen.querySelector(".win-message").textContent = results[0];
        paperOrRockScreen.querySelector(".win-description").textContent = results[1];
        paperOrRockScreen.querySelector(".fight-picture").setAttribute('src', fightImage);
        return;
    }
}

function removeResults(results) {

    if (results[0] === 'tie') {
        tieScreen.classList.toggle('disappear');
        return;
    } else if (results[1] === 'Scissors cut Paper.') {
        scissorsScreen.classList.toggle('disappear');
    } else {
        paperOrRockScreen.classList.toggle('disappear');
    }
}

function showScore() {

    scoreScreen.querySelector(".player-score h3").textContent = playerScore;
    scoreScreen.querySelector(".cpu-score h3").textContent = cpuScore;
    scoreScreen.classList.toggle("disappear");
}

//Plays a round and then resets to the Choice Page or End Page
async function playRound(e) {

    if (e.target === handsBox) {
        return;
    }

    let player = humanPlay(e);
    let cpu = computerPlay();

    if (cpu === player) {
        cpu = computerPlay();
    }

    choiceScreen.classList.toggle('disappear');
    throwScreen.classList.toggle('disappear');
    await sleep(500);
    for (let i = 0; i < appearingItemsLength; i++) {
        appearingItems[i].classList.toggle('make-visible');
        await sleep(10);
    }

    //Array of [winner, throw-winner, message]
    let results = determineWinner(player, cpu);

    showResults(results);

    await sleep(500);

    for (let i = 0; i < appearingItemsLength; i++) {
        appearingItems[i].classList.toggle('make-visible');
    }

    throwScreen.classList.toggle('disappear');
    if (results[0] === 'tie') {
        tieScreen.classList.toggle('disappear');
    } else if (results[1] === 'Scissors cut Paper.') {
        scissorsScreen.classList.toggle('disappear');
    } else if ((results[1] === 'Rock crushes Scissors.') || (results[1] === 'Paper covers Rock.')) {
        paperOrRockScreen.classList.toggle('disappear');
    }

    await sleep(3000);

    removeResults(results);
    showScore();

    await sleep(2000);

    scoreScreen.classList.toggle("disappear");

    if (cpuScore >= 3) {
        cpuScore = 0;
        playerScore = 0;
        loseScreen.classList.toggle("disappear");
        document.addEventListener('keyup', readKeypress);
    } else if (playerScore >= 3) {
        playerScore = 0;
        cpuScore = 0;
        winScreen.classList.toggle("disappear");
        document.addEventListener('keyup', readKeypress);
    } else {
        choiceScreen.classList.toggle('disappear');
    }
}

function readKeypress(e) {
    if (e.key.toLowerCase() === 'n') {
        document.removeEventListener('keyup', readKeypress);
        toExitScreen();
    } else if (e.key.toLowerCase() === 'y') {
        restart();
        document.removeEventListener('keyup', readKeypress);
    }
}

function toExitScreen() {
    if ((winScreen.getAttribute('class') == "disappear")) {
        loseScreen.classList.toggle("disappear");
        colorLayer.classList.toggle('disappear');
        screenBackground.classList.toggle('disappear');
        finalScreen.classList.toggle("disappear");
    } else {
        winScreen.classList.toggle("disappear");
        colorLayer.classList.toggle('disappear');
        screenBackground.classList.toggle('disappear');
        finalScreen.classList.toggle("disappear");
    }
}

function restart() {
    if ((winScreen.getAttribute('class') == "disappear")) {
        loseScreen.classList.toggle("disappear");
        introScreen.classList.toggle("disappear");
    } else {
        winScreen.classList.toggle("disappear");
        introScreen.classList.toggle("disappear");
    }
}