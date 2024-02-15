// ui.js
function drawInventory() {
    let inventoryX = playerPosition.x + 40; // Offset from player
    let inventoryY = playerPosition.y - 50; // Adjusted for visibility
    fill(255, 255, 255, 150); // Semi-transparent white for background
    let inventoryWidth = 120;
    let inventoryHeight = 20 + Object.keys(inventory).length * 20;
    rect(inventoryX, inventoryY, inventoryWidth, inventoryHeight); // Dynamic height based on inventory size
    fill(0); // Text color
    textSize(12); // Adjust text size as needed
    let textOffsetY = 15;
    Object.entries(inventory).forEach(([color, count], index) => {
        text(`${color.toUpperCase()}: ${count}`, inventoryX + 10, inventoryY + textOffsetY + index * 20);
    });
}

function drawScoreboard() {
    fill(255);
    textSize(32);
    textAlign(CENTER, TOP);
    text(`Score: ${score}`, width / 2, 10);
}

function updateAndDisplayTimer() {
    if (timer > 0) {
        timer--;
        let seconds = timer / 60;
        fill(255);
        textSize(32);
        textAlign(CENTER, BOTTOM);
        text(`Time: ${seconds.toFixed(1)}`, width / 2, height - 10);
    }
}

