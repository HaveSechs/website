class Example extends Phaser.Scene {
    preload () {
        this.load.image('background', 'assets/space.png');
        this.load.image('player', 'assets/spaceship.png');
        this.load.image('asteroid', 'assets/asteroid.png');
        this.load.image('boost', 'assets/boost.png')
    }

    create () {
        this.score = 0;
        this.boost_active = false;
        this.boosts = [];
        this.add.image(400, 300, 'background').setDisplaySize(800, 600);
        this.player = this.physics.add.sprite(0, 500, 'player');
        this.player.name = "rocket";
        this.sd = this.add.text(0, 0, this.score);
        this.sd.setColor("#00ff00");
        this.sd.setFontSize(64);
        this.player.body.onCollide = true;
        this.asteroids = []

        this.physics.world.on('collide', (body1, body2) => {
            if (body1.body.gameObject.name == "boost" || body2.body.gameObject.name == "boost") {
                this.boost_active = true;
                this.score += 2;
                if (body1.body.gameObject.name == "boost") {
                    body1.body.gameObject.destroy(true);
                } else {
                    body2.body.gameObject.destroy(true);
                }
                setTimeout(this.reset_boost.bind(this), 5000);
            } else {
                if (localStorage.getItem("high") < this.score) {
                    localStorage.setItem("high", this.score);
                }          
                this.shutdown();
                const seeDevsButton = document.createElement("button");
                seeDevsButton.textContent = "see devs";
                seeDevsButton.style.backgroundColor = "#999";
                seeDevsButton.style.color = "#fff";
                seeDevsButton.style.border = "none";
                seeDevsButton.style.padding = "10px 20px";
                seeDevsButton.style.position = 'absolute';
                seeDevsButton.style.bottom = '10px';
                seeDevsButton.style.right = '10px';
                seeDevsButton.style.cursor = 'pointer';
                seeDevsButton.style.zIndex = '9999';
                seeDevsButton.addEventListener("click", () => { 
                    window.open("https://pastebin.com/raw/a9DDPeAB");
                });
              
                document.body.appendChild(seeDevsButton);
                document.body.innerHTML += `<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;">
            you died bozo<br>
            <button onclick="window.location.reload();">try again</button><br>
            <br>
            high score: ${localStorage.getItem("high")}
        </div>`
        }});

        setInterval(this.new_asteroid.bind(this), 750);
        setInterval(this.new_boost.bind(this), 5000);
    }

    new_asteroid () {
        if (this.asteroids != null) {
            var asteroid = this.physics.add.sprite(Math.random() * 800, 0, 'asteroid');
            asteroid.name = "asteroid";
            this.asteroids.push(asteroid);
            this.physics.add.collider(this.player, this.asteroids[this.asteroids.length - 1]);
        }
    }

    new_boost () {
        if (this.boosts != null) {
            var boost = this.physics.add.sprite(Math.random() * 800, 0, 'boost');
            boost.name = "boost";
            this.boosts.push(boost);
            this.physics.add.collider(this.player, this.boosts[this.boosts.length - 1]);
        }
    }

    reset_boost () {
        this.boost_active = false;
    }

    shutdown () {
        this.asteroids = [];

        for (let a = 0; a < this.asteroids.length; a++) {
            this.asteroids[a].destroy(true);
            this.asteroids.splice(1, a)
        }
    }

    update () {
        var aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        var dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        var rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        var lKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    
        const minX = 0 + this.player.width / 2;
        const maxX = this.game.config.width - this.player.width / 2;

        for (let a = 0; a < this.asteroids.length; a++) {
            if (this.boost_active) {
                this.asteroids[a].y += 7;
            } else {
                this.asteroids[a].y += 3;
            }
            if (this.asteroids[a].y > 600) {
                this.asteroids[a].destroy(true);
                this.asteroids.splice(a, 1);
                this.score += 1;
                console.log(this.score);
                this.sd.setText(this.score);
            }
        }

        for (let b = 0; b < this.boosts.length; b++) {
            if (this.boost_active) {
                this.boosts[b].y += 7;
            } else {
                this.boosts[b].y += 3;
            }

            if (this.boosts[b].y > 600) {
                this.boosts[b].destroy(true);
                this.boosts.splice(b, 1);
            }
        }
        
        if (aKey.isDown && this.player.x > minX || lKey.isDown && this.player.x > minX) {
            this.player.x -= 5;
        }
    
        if (dKey.isDown && this.player.x < maxX || rKey.isDown && this.player.x < maxX) {
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

if (localStorage.getItem("high") == null) {
    localStorage.setItem("high", 0);
}

const game = new Phaser.Game(config);
