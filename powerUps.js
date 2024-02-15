// powerUps.js
function maybeAddPowerUp() {
    if (frameCount % 60 === 0) {
        addPowerUps(1);
    }
}

