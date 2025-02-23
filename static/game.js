// Form logic
if (window.location.pathname === "/RockPaperSciccorsLizardSpock/") { 
    document.getElementById("name-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const playerName = document.getElementById("player-name").value;

        if (playerName) {
            localStorage.setItem("playerName", playerName);
            window.location.href = "./game.html";
        } else {
            console.log("No player name entered!");
        }
    });
}

// Game logic
if (window.location.pathname.endsWith("game.html")) {
    const playerName = localStorage.getItem("playerName");
    if (playerName) {
        document.getElementById("player-name").textContent = playerName;
    } else {
        window.location.href = "/RockPaperSciccorsLizardSpock/";
    }
}

function chooseOption(choice) {
    const aiChoice = getAIChoice(choice);
    const result = determineWinner(choice, aiChoice);

    document.getElementById("result-message").textContent = result;
    document.getElementById("ai-choice").textContent = `AI chose: ${aiChoice}`;
}

function getAIChoice(playerChoice) {
    const choices = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];
    for (let aiChoice of choices) {
        if (rulesMatrix[aiChoice][playerChoice] === 1) {
            return aiChoice;
        }
    }
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    return randomChoice;
}

function determineWinner(playerChoice, aiChoice) {
    const outcome = rulesMatrix[playerChoice][aiChoice];

    if (outcome === 1) {
        return "You lose!";
    } else if (outcome === -1) {
        return "You win!";
    } else {
        return "It's a tie!";
    }
}

const rulesMatrix = {
    "Rock": {"Rock": 0, "Paper": -1, "Scissors": 1, "Lizard": 1, "Spock": -1},
    "Paper": {"Rock": 1, "Paper": 0, "Scissors": -1, "Lizard": -1, "Spock": 1},
    "Scissors": {"Rock": -1, "Paper": 1, "Scissors": 0, "Lizard": 1, "Spock": -1},
    "Lizard": {"Rock": -1, "Paper": 1, "Scissors": -1, "Lizard": 0, "Spock": 1},
    "Spock": {"Rock": 1, "Paper": -1, "Scissors": 1, "Lizard": -1, "Spock": 0}
}
