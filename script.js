class Example extends Phaser.Scene {
    bunny;

    preload () {
        this.load.image('background', 'assets/space.png');
        this.load.image('player', 'assets/spaceship.png');
        this.load.image('asteroid', 'assets/asteroid.png');

    }

    create () {
        this.add.image(0, 0, 'background');
        this.player = this.physics.add.sprite(0, 500, 'player');
        this.player.body.onCollide = true;
        this.interval = 500
        this.asteroids = [this.physics.add.sprite(Math.random() * 800, 0, 'asteroid')]
        this.physics.add.collider(this.player, this.asteroids[0]);

        this.physics.world.on('collide', () => {
            document.body.innerHTML = "You lost bozo<br><button onclick=\"window.location.reload();\">try again</button>";
        });
        
        setInterval(this.new_asteroid.bind(this), 500)
    }

    new_asteroid () {
        this.asteroids.push(this.physics.add.sprite(Math.random() * 800, 0, 'asteroid'))
        this.physics.add.collider(this.player, this.asteroids[this.asteroids.length - 1]);
    }

    update () {
        var aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        var dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    
        const minX = 0 + this.player.width / 2;
        const maxX = this.game.config.width - this.player.width / 2;

        for (let a = 0; a < this.asteroids.length; a++) {
            this.asteroids[a].y += 3
        }
        
        if (aKey.isDown && this.player.x > minX) {
            this.player.x -= 5;
        }
    
        if (dKey.isDown && this.player.x < maxX) {
            this.player.x += 5;
        }
    }
}

const config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Example,
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    }
};

const game = new Phaser.Game(config);