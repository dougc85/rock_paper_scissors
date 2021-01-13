// Rock Paper Scissors - programmed to try to make use of newly learned 
//DOM manipulation
// -Doug Carter


const startButton = document.getElementById('start');
const quitButton = document.getElementById('quit');
const introPage = document.getElementById('intro'); 
const quitPage = document.getElementById('quit-screen');
const colorScreen = document.getElementById('color-screen');
const choicePage = document.getElementById('choice-screen');
const throwPage = document.getElementById('throw-id');
const tiePage = document.getElementById('tie-screen');
const scissorsPage = document.getElementById('scissors-screen');
const paperOrRockPage = document.getElementById("paper-or-rock-screen");
const scorePage = document.getElementById("score-screen");
const losePage = document.getElementById("lose-screen");
const winPage = document.getElementById("win-screen");
const finalPage = document.getElementById("final-screen");

//Events for Intro Page
startButton.addEventListener('click', startGame);
quitButton.addEventListener('click', quitGame);

//Events for Win/Lose Page
document.addEventListener('keyup', restart);

//Functions for Intro Page
function startGame(e) {
    introPage.classList.toggle('disappear');
    choicePage.classList.toggle('disappear');
}

function quitGame(e) {
    introPage.classList.toggle('disappear');
    colorScreen.classList.toggle('disappear');
    document.getElementById('screen-background').classList.toggle('disappear');
    quitPage.classList.toggle('disappear');
}

//Constants for Choice Page
const rockChoice = document.getElementById("rock-choice");
const paperChoice = document.getElementById("paper-choice");
const scissorsChoice = document.getElementById("scissors-choice");

//Event for player choosing weapon
document.getElementById("hands-box").addEventListener("click", playRound);

//Constants for Throw page - 
const playerThrows = document.getElementById('player-throws');
const cpuThrows = document.getElementById('cpu-throws');
const playerWeapon = document.getElementById('player-weapon');
const cpuWeapon = document.getElementById('cpu-weapon');

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
    }else if (e.target === paperChoice) {
        playerWeapon.setAttribute("src", "images/paper.jpg");
        return 'paper';
    }else if (e.target === scissorsChoice) {
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
const injuredPersonImages = ["images/injuredperson1.jpg", "images/injuredperson2.png", "images/injuredperson3.png"];

function showResults(results) {
    throwPage.classList.toggle('disappear');

    if (results[0] === 'tie') {
        tiePage.classList.toggle('disappear');
        return;
    } else if (results[1] === 'Scissors cut Paper.') {
        if (results[0] === 'You win!') {
            scissorsPage.querySelector("#scissors-loser").setAttribute("src", injuredCpuImages[(playerScore - 1)]);
            scissorsPage.querySelector("#scissors-winner").setAttribute("src", "images/personwinsscissors.jpg");
        }
        else {
            scissorsPage.querySelector("#scissors-loser").setAttribute("src", injuredPersonImages[(cpuScore - 1)]);
            scissorsPage.querySelector("#scissors-winner").setAttribute("src", "images/cpuwinsscissors.png");
        }
        scissorsPage.querySelector(".win-message").textContent = results[0];
        scissorsPage.querySelector(".win-description").textContent = results[1];
        scissorsPage.classList.toggle('disappear');
        return;
    } else {
        console.log('halp!');
        let personWinsImage = (results[1] == 'Rock crushes Scissors.') ? "images/personwinsrock.jpg" : "images/personwinspaper.jpg";
        let cpuWinsImage = (results[1] == 'Rock crushes Scissors.') ? "images/cpuwinsrock.jpg" : "images/cpuwinspaper.jpg";
        let fightImage = (results[1] == 'Rock crushes Scissors.') ? "images/rockonscissors.jpg" : "images/paperonrock.jpeg";

        if (results[0] === 'You win!') {
            paperOrRockPage.querySelector("#paper-or-rock-loser").setAttribute("src", injuredCpuImages[(playerScore - 1)]);
            paperOrRockPage.querySelector("#paper-or-rock-winner").setAttribute("src", personWinsImage);
        }
        else {
            paperOrRockPage.querySelector("#paper-or-rock-loser").setAttribute("src", injuredPersonImages[(cpuScore - 1)]);
            paperOrRockPage.querySelector("#paper-or-rock-winner").setAttribute("src", cpuWinsImage);
        }

        paperOrRockPage.querySelector(".win-message").textContent = results[0];
        paperOrRockPage.querySelector(".win-description").textContent = results[1];
        paperOrRockPage.querySelector(".fight-picture").setAttribute('src', fightImage);
        paperOrRockPage.classList.toggle('disappear');
        return;
    }
}

function removeResults(results) {

    if (results[0] === 'tie') {
        tiePage.classList.toggle('disappear');
        return;
    } else if (results[1] === 'Scissors cut Paper.') {
        scissorsPage.classList.toggle('disappear');
    } else {
        paperOrRockPage.classList.toggle('disappear');
    }
}

function showScore() {

    scorePage.querySelector(".player-score h3").textContent = playerScore;
    scorePage.querySelector(".cpu-score h3").textContent = cpuScore;
    scorePage.classList.toggle("disappear");
}

//Plays a round and then resets to the Choice Page or End Page
async function playRound(e) {

    if (e.target === document.getElementById("hands-box")) {
        return;
    }

    let player = humanPlay(e);
    let cpu = computerPlay();

    choicePage.classList.toggle('disappear');
    throwPage.classList.toggle('disappear');
    await sleep(500);
    for (let i = 0; i < appearingItemsLength; i++) {
        appearingItems[i].classList.toggle('make-visible');
        await sleep(1000);
    }
    await sleep(400);

    for (let i = 0; i < appearingItemsLength; i++) {
        appearingItems[i].classList.toggle('make-visible');
    }

    //Array of [winner, throw-winner, message]
    let results = determineWinner(player, cpu);

    showResults(results);

    await sleep(3000);

    removeResults(results);
    showScore();

    await sleep(2000);

    scorePage.classList.toggle("disappear");

    if (cpuScore >= 3) {
        cpuScore = 0;
        playerScore = 0;
        losePage.classList.toggle("disappear");
    } else if (playerScore >= 3) {
        playerScore = 0;
        cpuScore = 0;
        winPage.classList.toggle("disappear");
    } else {
        choicePage.classList.toggle('disappear');
    }
}

function restart(e) {
    if (e.key.toLowerCase() === 'n') {
        if ((winPage.getAttribute('class') == "disappear") && (losePage.getAttribute('class') == "disappear")) {
            return;
        } else if ((winPage.getAttribute('class') == "disappear")) {
            losePage.classList.toggle("disappear");
            colorScreen.classList.toggle('disappear');
            document.getElementById('screen-background').classList.toggle('disappear');
            finalPage.classList.toggle("disappear");
        } else {
            winPage.classList.toggle("disappear");
            colorScreen.classList.toggle('disappear');
            document.getElementById('screen-background').classList.toggle('disappear');
            finalPage.classList.toggle("disappear");
        }
    } else if (e.key.toLowerCase() === 'y') {
        if ((winPage.getAttribute('class') == "disappear") && (losePage.getAttribute('class') == "disappear")) {
            return;
        } else if ((winPage.getAttribute('class') == "disappear")) {
            losePage.classList.toggle("disappear");
            introPage.classList.toggle("disappear");
        } else {
            winPage.classList.toggle("disappear");
            introPage.classList.toggle("disappear");
        }
    }
}



//let keepPlaying = true;

/*

function game() {
    
    let rounds = 0;
    let cpuScore = 0;
    let playerScore = 0;

    while (rounds < 5) {
        let playerSelection = prompt("Would you like to throw Rock, Paper, or Scissors?")

        playerSelection = playerSelection.toLowerCase();
        playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1);

        if ((playerSelection !== 'Rock') && (playerSelection !== 'Paper') && (playerSelection !== 'Scissors')) {
            console.log('Incorrect Entry. Be sure to enter "Rock" "Paper" or "Scissors"')
            continue;
        } 

        let computerSelection = computerPlay();
        let result = playRound(playerSelection, computerSelection);

        console.log("You picked " + playerSelection + ". The Computer picked " + computerSelection + ".");
        console.log(result);

        if (result !== ('Tie Game!!!')) {
            rounds++;
            if (result.slice(0, 5) === "You w") {
                playerScore++;
            } else {
                cpuScore++;
            }
            console.log("CPU score is " + cpuScore + ". Player score is " + playerScore + ".");
        } else { 
            console.log("Score remains unchanged.");
        }

        if ((cpuScore === 3) || (playerScore === 3)) {
            break;
        }
    }

    let playAgain = prompt((cpuScore === 3) ? 'You lose! Would you like to try again? Y/N' : 'You win! Nice job! Play again? Y/N');

    playAgain = playAgain.toLowerCase();

    while (!(((playAgain === 'n') || (playAgain === 'no')) || ((playAgain === 'y') || (playAgain === 'yes')))) {
        playAgain = prompt('Play again? Please enter "Y" or "N"');
    }
    
    if ((playAgain === 'n') || (playAgain === 'no')) {
        keepPlaying = false;
    }
}

while (keepPlaying) {
    game();
}

*/
