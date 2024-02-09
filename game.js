<script>
    class BootScene extends Phaser.Scene {
        constructor() {
            super('BootScene');
        }

        create() {
            this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Tap to Start', { fontSize: '32px', fill: '#fff' })
                .setOrigin(0.5)
                .setInteractive()
                .on('pointerdown', () => {
                    this.scene.start('GameScene');
                });
        }
    }

    class GameScene extends Phaser.Scene {
        constructor() {
            super('GameScene');
        }

        create() {
            this.player = this.physics.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, null).setInteractive();
            this.player.setSize(40, 40);
            this.graphics = this.add.graphics({ fillStyle: { color: 0x00ff00 } });
            this.graphics.fillRectShape(this.player.getBounds());
            this.cursors = this.input.keyboard.createCursorKeys();
            this.score = 0;
            this.lives = 3;
            this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '16px', fill: '#fff' });
            this.livesText = this.add.text(10, 30, 'Lives: 3', { fontSize: '16px', fill: '#fff' });

            // Red Circles
            this.redCircles = this.physics.add.group({ defaultKey: 'redCircle', createCallback: (obj) => obj.setCircle(20).setInteractive() });
            for (let i = 0; i < 10; i++) this.spawnRedCircle();
            this.physics.add.overlap(this.player, this.redCircles, this.hitRedCircle, null, this);

            // Blue Circle
            this.blueCircle = this.physics.add.group({ defaultKey: 'blueCircle', createCallback: (obj) => obj.setCircle(20).setInteractive() });
            this.spawnBlueCircle();
            this.physics.add.overlap(this.player, this.blueCircle, this.hitBlueCircle, null, this);
        }

        update() {
            this.player.setVelocity(0);
            if (this.cursors.left.isDown) this.player.setVelocityX(-160);
            if (this.cursors.right.isDown) this.player.setVelocityX(160);
            if (this.cursors.up.isDown) this.player.setVelocityY(-160);
            if (this.cursors.down.isDown) this.player.setVelocityY(160);
        }

        spawnRedCircle() {
            let x = Phaser.Math.Between(0, 800), y = Phaser.Math.Between(0, 600);
            this.redCircles.create(x, y, 'redCircle');
        }

        spawnBlueCircle() {
            this.blueCircle.clear(true, true);
            let x = Phaser.Math.Between(0, 800), y = Phaser.Math.Between(0, 600);
            this.blueCircle.create(x, y, 'blueCircle');
        }

        hitRedCircle(player, circle) {
            circle.destroy();
            this.lives--;
            this.livesText.setText('Lives: ' + this.lives);
            if (this.lives <= 0) this.gameOver();
        }

        hitBlueCircle(player, circle) {
            this.score++;
            this.scoreText.setText('Score: ' + this.score);
            this.spawnBlueCircle();
        }

        gameOver() {
            this.physics.pause();
            this.player.setTint(0xff0000);
            this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Game Over. Tap to Restart', { fontSize: '32px', fill: '#fff' })
                .setOrigin(0.5)
                .setInteractive()
                .on('pointerdown', () => this.scene.restart());
        }
    }

    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'phaser-example',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
        scene: [BootScene, GameScene]
    };

    new Phaser.Game(config);
</script>
