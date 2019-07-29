// Enemies
let Enemy = function(x, y, speed) {
    // Set initail
    this.x = x;
    this.y = y;
    this.speed = speed;
    // Load image
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    if (this.x > 500) {
        this.x = -50;
    }

    // When collide player with enemy the reset called.
    if (player.x > (this.x - 50) && player.x < (this.x + 50)){
        if (player.y > (this.y - 50) && player.y < (this.y + 50)) {
            player.reset();
        }
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Initial value for player
const xPlayer = 200;
const yPlayer = 400;

// Player
let Player = function(x, y) {
    // Set initial
    this.x = x;
    this.y = y;
    // Load image
    this.sprite = 'images/char-cat-girl.png';
};

// When player reach water the alert message after that reset callded
Player.prototype.update = function() {
    if (this.x > 400) {
        this.x = 400;
    }
    else if (this.x < 0) {
        this.x = 0;
    }
    else if (this.y > 400) {
        this.y = 400;
    }
    else if (this.y < 0) {
        this.y = 0;
        alert("Okkkkkky, you win..");
        this.reset();
    }

};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Control the transition of the player
Player.prototype.handleInput = function(keysArrow) {
    // Check what arrow keys pressed
    if(keysArrow == 'right') {
        this.x += 100;
   }
   else if(keysArrow == 'left') {
        this.x -= 100;
   }
   else if(keysArrow == 'up') {
        this.y -= 90;
   }
   else if(keysArrow == 'down') {
        this.y += 90;
   }
};

// Reset player
Player.prototype.reset = function() {
    this.x = xPlayer;
    this.y = yPlayer;
};


// All enemy objects in an array called allEnemies
let allEnemies = [];

// Random speed for each enemy and each two enemies in one row for three rows.
for (let i = 0; i < 3; i++) {
    let varitySpeedsFirst = Math.floor(Math.random() * 3 + Math.random() * 3) * 100;
    let varitySpeedsSec = Math.floor(Math.random() * 5 + Math.random() * 5) * 100;
    let temp = new Enemy(-100, (75 * i) + 65, varitySpeedsFirst);
    // Push first enemies to allEnemies
    allEnemies.push(temp);
    temp = new Enemy(-100, (75 * i) + 65, varitySpeedsSec);
    // Push sec enemies to allEnemies
    allEnemies.push(temp);
}

// Player object
let player = new Player(xPlayer, yPlayer);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
