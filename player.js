// player.js
function handlePlayerInput() {
    if (keyIsDown(87)) { // W key
        playerPosition.y -= 5;
        if (playerPosition.y < 0) playerPosition.y = height;
    }
    if (keyIsDown(83)) { // S key
        playerPosition.y += 5;
        if (playerPosition.y > height) playerPosition.y = 0;
    }
    if (keyIsDown(65)) { // A key
        playerPosition.x -= 5;
        if (playerPosition.x < 0) playerPosition.x = width;
    }
    if (keyIsDown(68)) { // D key
        playerPosition.x += 5;
        if (playerPosition.x > width) playerPosition.x = 0;
    }
}

