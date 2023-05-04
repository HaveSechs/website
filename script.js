class Example extends Phaser.Scene {
    bunny;

    preload () {
        this.load.image('background', 'assets/space.png');
        this.load.image('player', 'assets/spaceship.png');
        this.load.image('asteroid', 'assets/asteroid.png');
    }

    create () {
        this.score = 0;
        this.add.image(400, 300, 'background').setDisplaySize(800, 600);
        this.player = this.physics.add.sprite(0, 500, 'player');
        this.sd = this.add.text(0, 0, this.score);
        this.sd.setColor("#00ff00");
        this.sd.setFontSize(64);
        this.player.body.onCollide = true;
        this.asteroids = [this.physics.add.sprite(Math.random() * 800, 0, 'asteroid')]
        this.physics.add.collider(this.player, this.asteroids[0]);

        this.physics.world.on('collide', () => {
            if (localStorage.getItem("high") < this.score) {
                localStorage.setItem("high", this.score);
            }          
            for (let a = 0; a < this.asteroids.length; a++) {
                this.asteroids[a].destroy(true);
                this.asteroids.splice(1, a)
            }
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
        });

        var kKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        kKey.on('down', () => {
            const seeDevsButton2 = document.createElement("button");
            seeDevsButton2.textContent = "see devs";
            seeDevsButton2.style.backgroundColor = "#999";
            seeDevsButton2.style.color = "#fff";
            seeDevsButton2.style.border = "none";
            seeDevsButton2.style.padding = "10px 20px";
            seeDevsButton2.style.position = 'absolute';
            seeDevsButton2.style.bottom = '10px';
            seeDevsButton2.style.right = '10px';
            seeDevsButton2.style.cursor = 'pointer';            
            seeDevsButton2.style.zIndex = '9999';
            seeDevsButton2.addEventListener("click", () => { 
                window.open("https://pastebin.com/raw/a9DDPeAB");
            });
          
            const suicideContainer = document.createElement("div");
            suicideContainer.style.position = 'absolute';
            suicideContainer.style.top = '50%';
            suicideContainer.style.left = '50%';
            suicideContainer.style.transform = 'translate(-50%, -50%)';
            suicideContainer.innerHTML = '<div style="color:#FFF">you committed suicide bozo</div><br><button style="margin-left:56px" onclick="window.location.reload();">try again</button>';
            suicideContainer.style.zIndex = '9999';

            document.body.appendChild(seeDevsButton2);
            document.body.appendChild(suicideContainer);
          
            this.scale.canvas.style.zIndex = '1';
            this.scene.start('bozo');
          });
        
        setInterval(this.new_asteroid.bind(this), 750)
    }

    new_asteroid () {
        this.asteroids.push(this.physics.add.sprite(Math.random() * 800, 0, 'asteroid'))
        this.physics.add.collider(this.player, this.asteroids[this.asteroids.length - 1]);
    }  // hello gm loli

    update () {
        var aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        var dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        var rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        var lKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    
        const minX = 0 + this.player.width / 2;
        const maxX = this.game.config.width - this.player.width / 2;

        for (let a = 0; a < this.asteroids.length; a++) {
            this.asteroids[a].y += 3;
            if (this.asteroids[a].y > 600) {
                this.asteroids[a].destroy(true);
                this.asteroids.splice(a, 1);
                this.score += 1;
                console.log(this.score);
                this.sd.setText(this.score);
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
