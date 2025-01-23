// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let offsetX = 0, offsetY = 0; // Offset for panning
let zoom = 1; // Zoom level
let startScreen = true; // Flag for start screen
let functions = []; // Array to hold FunctionGraph objects
let inputFunction; // Input field for function input
let sidebar; // Sidebar container
let isDragging = false; // Track if mouse is being dragged
let prevMouseX, prevMouseY; // Store previous mouse positions for panning

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  setupSidebar();
  noLoop();
}

function draw() {
  if (startScreen) {
    drawStartScreen();
    return;
  }

  background(255);
  translate(width / 2 + offsetX, height / 2 + offsetY);
  scale(zoom);

  drawGrid();
  drawAxes();

  for (let func of functions) {
    func.plot();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}

function drawStartScreen() {
  background(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0);
  text("Function Graphing Calculator", width / 2, height / 3);
  textSize(16);
  text("Plot linear, quadratic, and polynomial functions. Zoom and pan to explore.", width / 2, height / 2);

  fill(100, 150, 255);
  rectMode(CENTER);
  rect(width / 2, height * 2 / 3, 200, 50, 10);

  fill(255);
  textSize(20);
  text("Start Graphing", width / 2, height * 2 / 3);
  
  
  // "Tutorial" Button
  fill(150, 100, 255);
  rect(width / 2, height * 2 / 3 + 80, 200, 50, 10);
  fill(255);
  textSize(20);
  text("Tutorial", width / 2, height * 2 / 3 + 80);
}

function showTutorial() {
  alert(`
    Tutorial:
    1. Enter functions like "x^2", "3*x + 1", "sin(x)" in the input box., you can do quadratic, polynomial, linear, and trigonometric functions
    2. Zoom in and out using the buttons on the sidebar.
    3. Pan around by clicking and dragging.
    4. You can plot multiple functions by adding more equations.
  `);
}


function mousePressed() {
  if (startScreen) {
    let buttonX = width / 2;
    let buttonY = height * 2 / 3;
    let buttonW = 200;
    let buttonH = 50;

    if (
      mouseX > buttonX - buttonW / 2 &&
      mouseX < buttonX + buttonW / 2 &&
      mouseY > buttonY - buttonH / 2 &&
      mouseY < buttonY + buttonH / 2
    ) {
      startScreen = false;
      loop();
    }
      // "Tutorial" Button
    if (
      mouseX > buttonX - buttonW / 2 &&
      mouseX < buttonX + buttonW / 2 &&
      mouseY > buttonY + 80 - buttonH / 2 &&
      mouseY < buttonY + 80 + buttonH / 2
    ) {
      showTutorial();
    }
  } else {
    // Start panning
    isDragging = true;
    prevMouseX = mouseX;
    prevMouseY = mouseY;
  }
}

function mouseReleased() {
  isDragging = false; // Stop panning
}

function mouseDragged() {
  if (!startScreen && isDragging) {
    // Adjust offsets based on mouse movement
    offsetX += mouseX - prevMouseX;
    offsetY += mouseY - prevMouseY;

    // Update previous mouse positions
    prevMouseX = mouseX;
    prevMouseY = mouseY;

    redraw();
  }
}

function setupSidebar() {
  sidebar = createDiv();
  sidebar.style("position", "absolute");
  sidebar.style("top", "0px");
  sidebar.style("left", "0px");
  sidebar.style("width", "200px");
  sidebar.style("height", "100%");
  sidebar.style("background-color", "#f0f0f0");
  sidebar.style("padding", "20px");
  sidebar.style("box-shadow", "2px 0px 5px rgba(0, 0, 0, 0.2)");

  let title = createElement("h3", "Graphing Controls");
  title.parent(sidebar);

  inputFunction = createInput();
  inputFunction.attribute("placeholder", "Enter function, e.g., x^2");
  inputFunction.parent(sidebar);

  let addButton = createButton("Add Function");
  addButton.mousePressed(addFunction);
  addButton.parent(sidebar);

  let zoomInButton = createButton("Zoom In");
  zoomInButton.mousePressed(zoomIn);
  zoomInButton.parent(sidebar);

  let zoomOutButton = createButton("Zoom Out");
  zoomOutButton.mousePressed(zoomOut);
  zoomOutButton.parent(sidebar);
}

function addFunction() {
  let funcStr = inputFunction.value();
  if (funcStr.trim() !== "") {
    try {
      let func = new FunctionGraph(funcStr);
      functions.push(func);
      inputFunction.value(""); // Clear input
      redraw();
    } catch (err) {
      alert("Invalid function syntax.");
    }
  }
}

function zoomIn() {
  zoom *= 1.1; // Increase zoom level
  redraw();
}

function zoomOut() {
  zoom /= 1.1; // Decrease zoom level
  redraw();
}

function drawGrid() {
  stroke(220);
  strokeWeight(1);

  let step = 20; // Grid spacing in pixels

  for (let x = -width; x < width; x += step) {
    line(x, -height, x, height); // Vertical grid lines
  }

  for (let y = -height; y < height; y += step) {
    line(-width, y, width, y); // Horizontal grid lines
  }
}

function drawAxes() {
  stroke(0);
  strokeWeight(2);

  // Draw X-axis
  line(-width, 0, width, 0);

  // Draw Y-axis
  line(0, -height, 0, height);

  // Label axes
  noStroke();
  fill(0);
  textSize(14);
  text("X", width / (2 * zoom) - offsetX / zoom - 20, -5);
  text("Y", -15, -height / (2 * zoom) + offsetY / zoom + 20);
}

class FunctionGraph {
  constructor(funcStr) {
    this.func = math.compile(funcStr);
    this.funcStr = funcStr;
  }

  plot() {
    noFill();
    stroke(255, 0, 0);
    strokeWeight(2);
    beginShape();

    for (let x = -width / 2; x < width / 2; x++) {
      let graphX = x / zoom - offsetX / zoom; // Convert screen X to graph X
      let graphY;

      try {
        graphY = this.func.evaluate({ x: graphX });
      } catch (err) {
        continue;
      }

      let screenY = -graphY * zoom + offsetY; // Convert graph Y to screen Y

      vertex(x, screenY);
    }

    endShape();
  }
}

