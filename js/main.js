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

