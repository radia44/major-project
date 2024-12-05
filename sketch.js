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
    drawStartScreen();
    drawGraphingButton();
  }
}

function drawStartScreen() {
  fill("white");
  textSize(30);
  text("Function Graphing Calculator", width/2, height/2 - 100);
  textSize(18);
  text("Options", width/2, height/2 - 50);
}

function drawGraphingButton() {
  fill("blue");
  rectMode(CENTER);
  rect(width/2, height/2, 120, 40);
  fill("white");
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Start Graphing", width/2, height/2);
}

function drawGraphingScreen() {
  let animationProgress = 0;
  let animationSpeed = 5;
}