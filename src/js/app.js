// Dom selectors
const $app = document.getElementById('app');

// Enemies our player must avoid
var Enemy = function(y= 100, x= -100, level= 100) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    //Setting the initial location
    this.x = x
    this.y = y

    //Setting the speed level
    this.level = level

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Reset Enemy position to start
    if(this.x > 520) this.x = -100;

    // Randomize enemies speed
    if(this.x === -100) this.speed = this.level + Math.random() * (3 * this.level)

    // Provide same speed for different clients
    this.x += this.speed * dt

    // Look for collisions with player // MOVED TO ENGINE.JS (line: 91)
    // if(Math.floor(this.x) - 60 < player.x &&
    //   Math.floor(this.x) + 80 > player.x &&
    //   this.y === player.y) {
    //   player.x = 200
    //   player.y = 380
    // }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor (x= 200, y= 380, speed= 80) {
    //Setting the initial location
    this.x = x
    this.y = y
    this.y = y

    // Player speed / single move length
    this.speed = speed

    // PLayer image
    this.sprite = 'images/char-boy.png';
  }

  /**
   * @description Select player image at the begining of the new game
   */
  handleSelect() {
    const val = document.getElementById('sprite').value
    this.sprite = `images/${val}.png`
  }
  /**
  * @description Change player image to bug when player reaches water and win the game
  */
  update() {
    if(this.y === -20) {
      this.sprite = 'images/enemy-bug.png';
    }
  }
  // Restart game and reset values on restart button click
  restart() {
    // Reset player position
    this.x=200;
    this.y=380;
    // Add fade on canvas
    canvas.classList.remove('fade')
    // Run handleSelect before removing popUp with select options
    this.handleSelect()
    const $popUp = document.getElementById('popUp');
    $app.removeChild($popUp)
  }

  // Draw the player on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  /**
   * @description This function is executed when player reach the water. It render a popup window within you can change player image and restart the game.
   */
  won() {
    const popUp = document.createElement('div')
    canvas.classList.add('fade')
    popUp.id = 'popUp';
    popUp.innerHTML = `
      <h1>You won, Bug!</h1>
      <button onclick="player.restart()">Restart</button>
      <select onchange="player.handleSelect()" name="select-player" id="sprite">
          <option value="char-boy">Boy</option>
          <option value="char-cat-girl">Cat girl</option>
          <option value="char-horn-girl">Horn girl</option>
          <option value="char-princess-girl">Princess girl</option>
      </select>
      
    `
    $app.appendChild(popUp)
  }
  /**
   * @description Detect and change player position on arrow key press.
   * @param keyPress
   */
  handleInput(keyPress) {
    // Block moves on popUp window (start game or win)
    if (document.getElementById('popUp')) keyPress = 'elo'
    switch(keyPress) {
      case 'left':
        // Handle player moves outside the playground
        if(this.x === 0) break
        // Change player position
        this.x -= this.speed + 20
        break
      case 'right':
        // Handle player moves outside the playground
        if(this.x === 400) break
        // Change player position
        this.x += this.speed + 20
        break
      case 'up':
        // Handle player moves outside the playground
        if(this.y === -20) break
        // If player reaches water this statement execute won function which ends the game
        if(this.y === 60) this.won()
        // Change player position
        this.y -= this.speed
        break
      case 'down':
        // Handle player moves outside the playground
        if(this.y === 380) break
        // Change player position
        this.y += this.speed
        break
    }
  }

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const enemyPosition = [60, 140, 220, 220]
let allEnemies = enemyPosition.map((val) => new Enemy(val));

// Place the player object in a variable called player
const player = new Player()



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});




