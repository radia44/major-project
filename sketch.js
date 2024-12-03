// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let state = "start";

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  if (state === "start"){
    displayStartScreen();
  }
  button = createButton("graph");
  button.size(50, 20);
  button.position(width/2, height/2 + 100);
  button.style("font-size", "12px");
}

function displayGrid() {
  let cellSize = 5;
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function displayStartScreen(){
  textAlign(CENTER, CENTER);
  textSize(24);
  fill("white");
  text("Function Graphing Calculator", width / 2, height / 2 - 40);
  textSize(16);
}
