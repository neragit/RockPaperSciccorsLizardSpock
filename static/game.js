console.log("game.js is loaded");

// Form logic
console.log("Current pathname:", window.location.pathname);

if (window.location.pathname === "/RockPaperSciccorsLizardSpock/") { 
    console.log("Page is RockPaperSciccorsLizardSpock");

    document.getElementById("name-form").addEventListener("submit", function(event) {
        event.preventDefault();
        console.log("Submitted");
        const playerName = document.getElementById("player-name").value;  // Get the player name entered in the form
        console.log("Form submitted, player name:", playerName);

        if (playerName) {
            localStorage.setItem("playerName", playerName);  // Store the player name in localStorage
            console.log("Player name stored in localStorage.");
            console.log("Redirecting to game.html");
            window.location.href = "./game.html";  // Redirect to game.html
        } else {
            console.log("No player name entered!");
        }
    });
} else {
    console.log("This is not index.html. The current page is:", window.location.pathname);
}


// Game logic
if (window.location.pathname.endsWith("game.html")) {
    const playerName = localStorage.getItem("playerName");  // Retrieve the player name from localStorage
    console.log("Player name retrieved from localStorage:", playerName);
    if (playerName) {  // Check if the player name exists in localStorage
        document.getElementById("player-name").textContent = playerName;  // Display the player name on the page
    } else {
        console.log("No player name found, redirecting to index.html");
        window.location.href = "index.html";  // Redirect to index.html if no player name is found
    }
}


function chooseOption(choice) {
    console.log("Player chose:", choice);  // Log the player's choice
    const aiChoice = getAIChoice(choice);  // Get the AI's choice based on the player's choice
    console.log("AI chose:", aiChoice);  // Log the AI's choice
    const result = determineWinner(choice, aiChoice);  // Determine the winner between the player and the AI
    console.log("Result:", result);  // Log the result of the game

    document.getElementById("result-message").textContent = result;  // Display the result message on the page
    document.getElementById("ai-choice").textContent = `AI chose: ${aiChoice}`;  // Display the AI's choice on the page
}

function getAIChoice(playerChoice) {
    const choices = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];  // Define the available choices for the AI
    for (let aiChoice of choices) {  // Loop through each AI choice
        if (rulesMatrix[aiChoice][playerChoice] === -1) {  // If the AI can beat the player's choice
            console.log("AI chooses to beat player's choice:", aiChoice);  // Log the AI's choice to beat the player
            return aiChoice;  // Return the AI's winning choice
        }
    }
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];  // If no winning choice found, choose randomly
    console.log("AI chooses randomly:", randomChoice);  // Log the randomly chosen AI move
    return randomChoice;  // Return the random AI choice
}

function determineWinner(playerChoice, aiChoice) {
    const outcome = rulesMatrix[playerChoice][aiChoice];  // Look up the result of the player's and AI's choices in the rules matrix
    console.log("Outcome:", outcome);  // Log the outcome from the rules matrix

    if (outcome === 1) {  // If the outcome is 1, the player loses
        return "You lose!";  // Return the loss message
    } else if (outcome === -1) {  // If the outcome is -1, the player wins
        return "You win!";  // Return the win message
    } else {
        return "It's a tie!";  // If the outcome is 0, it's a tie
    }
}

// Define the rules matrix for the game (Rock, Paper, Scissors, Lizard, Spock)
const rulesMatrix = {
    "Rock": {"Rock": 0, "Paper": -1, "Scissors": 1, "Lizard": 1, "Spock": -1},
    "Paper": {"Rock": 1, "Paper": 0, "Scissors": -1, "Lizard": -1, "Spock": 1},
    "Scissors": {"Rock": -1, "Paper": 1, "Scissors": 0, "Lizard": 1, "Spock": -1},
    "Lizard": {"Rock": -1, "Paper": 1, "Scissors": -1, "Lizard": 0, "Spock": 1},
    "Spock": {"Rock": 1, "Paper": -1, "Scissors": 1, "Lizard": -1, "Spock": 0}
}
