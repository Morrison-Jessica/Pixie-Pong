// ==== PIXIE SET UP ====
const app = new PIXI.Application ();
await app.init ({
    width: 600,
    height: 400,
    backgroundColor: 0x238ab6 // light blue color
});
document.body.appendChild(app.canvas);
console.log("set up");

// ==== CIRCLE GRAPHIC ====
const circle = new PIXI.Graphics ();
circle.beginFill(0xf2f2f2); // soft white color
circle.drawCircle(0,0,20); // sets radius
circle.endFill();
circle.x = app.renderer.width / 2;
circle.y = app.renderer.height / 2;
app.stage.addChild(circle);

// ==== VARIBLES FOR VELOCITY ====
let vx = 3;
let vy = 2;

// ==== BORDERS ====
const borders = {
    top: createBorder(0,0,10, app.renderer.width, 10, 0xff0000), // red
    bottom: createBorder(0, app.renderer.height - 10, app.renderer.width, 10, 0x00ff00), //green
    left: createBorder(0,0,10, app.renderer.height, 0xffff00), // yellow
    right: createBorder(app.renderer.width - 10,0,10, app.renderer.height, 0xff00ff) // magenta
    
};

function createBorder(x, y, w, h, color) {
    const border = new PIXI.Graphics ();
    border.beginFill(color);
    border.drawRect(0,0,w,h);
    border.endFill();
    border.x = x;
    border.y = y;
    app.storage.addChild(border);
    return border;
}

// ==== BORDER HITS ====
let hitBorders = new Set(); // keeps track of borders hit

function checkCollision() {
    // Top
    if (circle.y -20 <= 10) {
        vy *= -1;
        borderHit("top");
    }
    // Bottom 
    if (circle.y + 20>= app.view.height - 10) {
        vy*= -1;
        borderHit("bottom");
    }
    // Left
    if (circle.x - 20 <= 10) {
        vx*= -1;
        borderHit("left");
    }
    // Right 
    if (circle.x + 20 >= app.view.width - 10) {
        vx*= -1;
        borderHit("right");
    }
}

function borderHit(name) {
    if (!hitBorders.has(name)) {
      hitBorders.add(name);
  
      // Extra: Change color when hit
      borders[name].tint = 0xffffff; // turn border white
    }
    // If all 4 are hit, resolve game end
    if (hitBorders.size === 4) {
      gameEndPromiseResolve(); // trigger promise resolution
    }
  }
  
  // === PROMISE FOR GAME END ===
  let gameEndPromiseResolve;
  const gameEndPromise = new Promise((resolve) => {
    gameEndPromiseResolve = resolve;
  });
  
  gameEndPromise.then(() => {
    alert("All 4 borders hit! Game complete.");
    app.ticker.stop(); // stop the game loop
  });
  
  // === GAME LOOP ===
  app.ticker.add(() => {
    circle.x += vx;
    circle.y += vy;
    checkCollision();
  });