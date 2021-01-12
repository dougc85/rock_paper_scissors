
console.log(2);

const startButton = document.getElementById('start');
const quitButton = document.getElementById('quit');

console.log(quitButton);

const introPage = document.getElementById('intro'); 
const quitPage = document.getElementById('quit-screen');
const colorScreen = document.getElementById('color-screen');
const choicePage = document.getElementById('choice-screen');
const throwPage = document.getElementById('throw-id');

startButton.addEventListener('click', startGame);
quitButton.addEventListener('click', quitGame);

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


let rockRound = false;
let paperRound = false;
let scissorsRound = false;
let tieRound = false;

const rockChoice = document.getElementById("rock-choice");
const paperChoice = document.getElementById("paper-choice");
const scissorsChoice = document.getElementById("scissors-choice");


document.getElementById("hands-box").addEventListener("click", whichThrow);

function whichThrow(e) {
    if (e.target === rockChoice) {
        rockRound = true;
    }else if (e.target === paperChoice) {
        paperRound = true;
    }else if (e.target === scissorsChoice) {
        scissorsRound = true;
    }
    showThrows();
}

function showThrows () {
    choicePage.classList.toggle('disappear');
    throwPage.classList.toggle('disappear');
}





/*
let keepPlaying = true;

function computerPlay() {
    let choice = Math.floor(Math.random() * 3);
    if (choice === 1) {
        return 'Rock';
    } else if (choice === 2) {
        return "Paper";
    } else {
        return "Scissors";
    }
}

function playRound(playerSelection, computerSelection) {
    let player = playerSelection.toLowerCase();
    let cpu = computerSelection.toLowerCase();

    if (player === cpu) {
        return 'Tie Game!!!';
    }

    if (player === 'rock') {
        if (cpu === 'paper') {
            return 'You lose! Paper covers Rock.';
        }
        return 'You win! Rock crushes Scissors.';
    } else if (player === 'paper') {
        if (cpu === 'rock') {
            return 'You win! Paper covers Rock.';
        }
        return 'You lose! Scissors cut Paper.';
    } else {
        if (cpu === 'paper') {
            return 'You win! Scissors cuts Paper.';
        }
        return 'You lose! Rock crushes Scissors.';
    }
}

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
