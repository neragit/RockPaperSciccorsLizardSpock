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
    const resultMessageElement = document.getElementById("result-message");
    const explanationMessageElement = document.getElementById("explanation-message");
    
    document.getElementById("ai-choice").textContent = `AI chose: ${aiChoice}`;
    
    resultMessageElement.textContent = result;
    resultMessageElement.style.display = "block";

    if (explanationMessageElement) {
        if (result === "It's a tie!") {
            explanationMessageElement.style.display = "none";
        } else {
            explanationMessageElement.style.display = "block";
            explanationMessageElement.textContent = getExplanation(choice, aiChoice, result);
        }
    }

    if (result === "You win!") {
        resultMessageElement.classList.remove("result-loss", "result-tie");
        resultMessageElement.classList.add("result-win");
    } else if (result === "You lose!") {
        resultMessageElement.classList.remove("result-win", "result-tie");
        resultMessageElement.classList.add("result-loss");
    } else {
        resultMessageElement.classList.remove("result-win", "result-loss");
        resultMessageElement.classList.add("result-tie");
    }
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

const rulesMatrix = {
    "Rock": {"Rock": 0, "Paper": -1, "Scissors": 1, "Lizard": 1, "Spock": -1},
    "Paper": {"Rock": 1, "Paper": 0, "Scissors": -1, "Lizard": -1, "Spock": 1},
    "Scissors": {"Rock": -1, "Paper": 1, "Scissors": 0, "Lizard": 1, "Spock": -1},
    "Lizard": {"Rock": -1, "Paper": 1, "Scissors": -1, "Lizard": 0, "Spock": 1},
    "Spock": {"Rock": 1, "Paper": -1, "Scissors": 1, "Lizard": -1, "Spock": 0}
}

function determineWinner(playerChoice, aiChoice) {
    const outcome = rulesMatrix[playerChoice][aiChoice];

    if (outcome === 1) {
        return "You win!";
    } else if (outcome === -1) {
        return "You lose!";
    } else {
        return "It's a tie!";
    }
}

function getExplanation(playerChoice, aiChoice, result) {
    const reasons = {
        "Rock": {
            "Scissors": "Rock crushes Scissors.",
            "Lizard": "Rock crushes Lizard.",
            "Paper": "Paper covers Rock.",
            "Spock": "Spock vaporizes Rock."
        },
        "Paper": {
            "Rock": "Paper covers Rock.",
            "Spock": "Paper disproves Spock.",
            "Scissors": "Scissors cuts Paper.",
            "Lizard": "Lizard eats Paper."
        },
        "Scissors": {
            "Paper": "Scissors cuts Paper.",
            "Lizard": "Scissors decapitates Lizard.",
            "Rock": "Rock crushes Scissors.",
            "Spock": "Spock smashes Scissors."
        },
        "Lizard": {
            "Spock": "Lizard poisons Spock.",
            "Paper": "Lizard eats Paper.",
            "Rock": "Rock crushes Lizard.",
            "Scissors": "Scissors decapitates Lizard."
        },
        "Spock": {
            "Scissors": "Spock smashes Scissors.",
            "Rock": "Spock vaporizes Rock.",
            "Paper": "Paper disproves Spock.",
            "Lizard": "Lizard poisons Spock."
        }
    };

    return reasons[playerChoice][aiChoice];
}
