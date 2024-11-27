// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let openingScreen = true;
let graphingScreen = false;
let tutorial = false;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}