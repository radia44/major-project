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
  createStartScreen(); // Draw startscreen
}

function draw() {
  if (state === "start") {
    drawStartScreen();
  }
  else if (state === "graphing") {
    drawGraphingScreen();
    drawSidebar();
  }
}

function createStartScreen() {
  //Draw "Graphing" button
  graphingButton = createButton("Graphing");
  graphingButton.size(120, 40);
  graphingButton.position(width / 2 - 60, height / 2 - 20); 
  graphingButton.style("font-family", "sans-serif");
  graphingButton.style("font-size", "16px");
  graphingButton.style("background-color", "blue");
  graphingButton.style("color", "white");
  graphingButton.style("border", "none");
  graphingButton.style("border-radius", "5px");
  graphingButton.mousePressed(stateNowGraphing); // Attach event listener function
}

function drawStartScreen() {
  background(0);
  textAlign(CENTER, CENTER);
  fill("white");
  textSize(30);
  text("Function Graphing Calculator", width / 2, height / 2 - 100);
  textSize(18);
  text("Options", width / 2, height / 2 - 50);
}

function stateNowGraphing() {
  state = "graphing";
  graphingButton.hide(); // Hide the button when state is graphing
}

function drawGraphingScreen() {
  background(255);

  // Draw Cartesian axes
  stroke("black");
  // X-axis starts after the sidebar
  line(210, height / 2, width, height / 2); 
  // Y-axis
  line((width + 210) / 2, 0, (width + 210) / 2, height); 
}

function drawSidebar() {
  // Draw the sidebar background
  fill(240);
  noStroke();
  rect(0, 0, 210, height);

  // Add sidebar title
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  textStyle("bold");
  text("Function Input", 20, 20); 

  // Add input
  input = createInput('');
  input.position(20, 50); 
}
