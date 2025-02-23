console.log("game.js is loaded");

console.log("game.js is loaded");

// Form logic
if (window.location.pathname === "/") {
    document.getElementById("name-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the form from submitting and reloading
        const playerName = document.getElementById("player-name").value;
        console.log("Form submitted, player name:", playerName);

        if (playerName) {
            localStorage.setItem("playerName", playerName);
            console.log("Player name stored in localStorage.");
            window.location.href = "./game.html";  // Redirect to game.html
        } else {
            console.log("No player name entered!");
        }
    });
}

// Game logic (remains unchanged)
if (window.location.pathname === "/game.html") {
    const playerName = localStorage.getItem("playerName");
    console.log("Player name retrieved from localStorage:", playerName);
    if (playerName) {
        document.getElementById("player-name").textContent = playerName;
    } else {
        console.log("No player name found, redirecting to index.html");
        window.location.href = "index.html";  // Redirect back to the index page if no player name
    }
}

    function chooseOption(choice) {
        console.log("Player chose:", choice);
        const aiChoice = getAIChoice(choice);
        console.log("AI chose:", aiChoice);
        const result = determineWinner(choice, aiChoice);
        console.log("Result:", result);

        document.getElementById("result-message").textContent = result;
        document.getElementById("ai-choice").textContent = `AI chose: ${aiChoice}`;
    }

    function getAIChoice(playerChoice) {
        const choices = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];
        for (let aiChoice of choices) {
            if (rulesMatrix[aiChoice][playerChoice] === -1) {
                console.log("AI chooses to beat player's choice:", aiChoice);
                return aiChoice;
            }
        }
        const randomChoice = choices[Math.floor(Math.random() * choices.length)];
        console.log("AI chooses randomly:", randomChoice);
        return randomChoice;
    }

    function determineWinner(playerChoice, aiChoice) {
        const outcome = rulesMatrix[playerChoice][aiChoice];
        console.log("Outcome:", outcome);

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
    };
}
