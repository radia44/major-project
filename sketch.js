// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let state = "start";
let graphingButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  if (state === "start") {
    drawStartScreen();
    drawGraphingButton();
    graphingButton.mouseClicked(stateNowGraphing);
  }
  if (state === "graphing"){
    drawGraphingScreen();
  }
}

function drawStartScreen() {
  background(0);
  textAlign(CENTER, CENTER);
  fill("white");
  textSize(30);
  text("Function Graphing Calculator", width/2, height/2 - 100);
  textSize(18);
  text("Options", width/2, height/2 - 50);
}

function drawGraphingButton() {
  graphingButton = createButton("Graphing");
  graphingButton.size(120, 40);
  graphingButton.position(width/2, height/2);
  graphingButton.style("font-family", "sans-serif");
  graphingButton.style("font-size", "12px");
  graphingButton.color("blue");
}

function stateNowGraphing() {
  state = "graphing";
}

function drawGraphingScreen() {
  background(255);

  stroke("black");
  line(width/2, 0, width/2, height);
  line(0, height/2, width, height/2);
}