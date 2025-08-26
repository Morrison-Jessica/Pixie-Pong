// === GAME START FUNCTION ===
async function startGame() {
    try {
      // ==== PIXI SETUP ====
      const app = new PIXI.Application();  // game object
      // asynch function pairs with await
      await app.init({ // creates canvas
        width: 600,
        height: 400,
        backgroundColor: 0x238ab6 // light blue color
      });
      document.body.appendChild(app.canvas);  // adds to page
      console.log("set up complete");
  
      // ==== CIRCLE GRAPHIC ====
      const circle = new PIXI.Graphics();
      circle.beginFill(0xf2f2f2); // soft white color
      circle.drawCircle(0, 0, 20); // radius 20
      circle.endFill();
      // position centered
      circle.x = app.renderer.width / 2;
      circle.y = app.renderer.height / 2;
      // adds to page
      app.stage.addChild(circle);
  
      // ==== VARIABLES FOR VELOCITY ====
      let vx = 2;  // horizontal speed
      let vy = 1;  // vertical speed
  
      // ==== BORDERS ====
      function createBorder(x, y, w, h) {
        const border = new PIXI.Graphics();
        border.beginFill(0x666666); // gray until hit
        border.drawRect(0, 0, w, h);  // draws rectangle to display border
        border.endFill();
        border.x = x;
        border.y = y;
        //  adds to page
        app.stage.addChild(border);
        return border;
      }
  
      const borders = {  // size & position
        top: createBorder(0, 0, app.renderer.width, 10),
        bottom: createBorder(0, app.renderer.height - 10, app.renderer.width, 10),
        left: createBorder(0, 0, 10, app.renderer.height),
        right: createBorder(app.renderer.width - 10, 0, 10, app.renderer.height)
      };
  
      // ==== BORDER COLORS ON HIT ====
      const borderColors = {
        top: 0xff3333,    // bright red
        bottom: 0x33ff33, // bright green
        left: 0x3399ff,   // bright blue
        right: 0xffe600   // bright yellow
      };
      
  
      // ==== BORDER HITS ====
      let hitBorders = new Set();  // using set vs array avoids duplicates
      let totalHits = 0;  // hit counter starts at 0
  
      function borderHit(name) {
        if (!hitBorders.has(name)) {
          hitBorders.add(name);

           // border changes to hit color
            borders[name].clear();
            borders[name].beginFill(borderColors[name]);
            if (name === "top" || name === "bottom") {
            borders[name].drawRect(0, 0, app.renderer.width, 10);
            } else {
            borders[name].drawRect(0, 0, 10, app.renderer.height);
            }
            borders[name].endFill();
        }   
        totalHits++;  // tracks each # of hits     
        if (hitBorders.size === 4) {
          gameEndPromiseResolve(); // trigger promise resolution
        }
      }
  
      // ==== CHECKS FOR CONTACT ====
      function borderContact() {
        // Top
        if (circle.y - 20 <= 0) {
          vy *= -1;
          borderHit("top");
        }
        // Bottom
        if (circle.y + 20 >= app.renderer.height) {
          vy *= -1;
          borderHit("bottom");
        }
        // Left
        if (circle.x - 20 <= 0) {
          vx *= -1;
          borderHit("left");
        }
        // Right
        if (circle.x + 20 >= app.renderer.width) {
          vx *= -1;
          borderHit("right");
        }
      }
  
      // === PROMISE FOR GAME END ===
      let gameEndPromiseResolve;
      const gameEndPromise = new Promise((resolve) => {
        gameEndPromiseResolve = resolve;
      });
  
      gameEndPromise
        .then(() => {
          alert("Game complete.");
          app.ticker.stop(); // stop the game loop
        })
        .catch((err) => {
          console.error("Error in gameEndPromise:", err);
        });
  
      // === GAME LOOP ===
      app.ticker.add(() => {
        try {
          circle.x += vx;
          circle.y += vy;
          borderContact();
        } catch (err) {
          console.error("Error in game loop:", err);
          app.ticker.stop();
        }
      });
    } catch (err) {
      console.error("Error setting up PIXI:", err);
      alert("Something went wrong loading the game.");
    }
  }
  
  // Runs game
  startGame();


  // NOTES FOR COMMIT
  // REFINED JS LOGIC, BEGUGGED WITH THEN/CATCH & TRY/CATCH, REMOVED CSS - NOT NEEDED

  // NEXT - CREATE DEMO VIDEO AND SUBMIT