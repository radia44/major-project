let functions = [];
let inputFunction;
let zoom = 1; 
let offsetX = 0;
let offsetY = 0;
let graphing = false;
let startScreen = true;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Sidebar
  createSidebar();

  noLoop(); // To update the canvas only when necessary
}

function createSidebar() {
  // Sidebar background
  let sidebarDiv = createDiv();
  sidebarDiv.style('width', '300px');
  sidebarDiv.style('height', '100%');
  sidebarDiv.style('background', '#f4f4f4');
  sidebarDiv.style('position', 'absolute');
  sidebarDiv.style('left', '0');
  sidebarDiv.style('top', '0');
  sidebarDiv.style('padding', '20px');
  sidebarDiv.style('box-shadow', '2px 0px 5px rgba(0,0,0,0.1)');

  // Title
  let title = createElement('h2', 'Graphing Calculator');
  title.parent(sidebarDiv);

  // Input field for function
  inputFunction = createInput();
  inputFunction.attribute('placeholder', 'Enter a function');
  inputFunction.style('width', '90%');
  inputFunction.parent(sidebarDiv);

  // Add function button
  let addButton = createButton('Add Function');
  addButton.style('margin', '10px 0');
  addButton.parent(sidebarDiv);
  addButton.mousePressed(addFunction);

  // Zoom In button
  let zoomInButton = createButton('Zoom In');
  zoomInButton.style('margin-right', '10px');
  zoomInButton.parent(sidebarDiv);
  zoomInButton.mousePressed(zoomIn);

  // Zoom Out button
  let zoomOutButton = createButton('Zoom Out');
  zoomOutButton.parent(sidebarDiv);
  zoomOutButton.mousePressed(zoomOut);

  // Start Graphing button
  let startButton = createButton('Start Graphing');
  startButton.style('margin', '20px 0');
  startButton.parent(sidebarDiv);
  startButton.mousePressed(startGraphing);

  // Instructions
  let instructions = createElement('p', `
    Instructions:
    <br>1. Enter a function (e.g., x^2, sin(x)).
    <br>2. Press "Add Function" to add it.
    <br>3. Use "Zoom In" and "Zoom Out" for navigation.
    <br>4. Press "Start Graphing" to view the graph.
  `);
  instructions.parent(sidebarDiv);
}
function startGraphing() {
  startScreen = false;
  graphing = true;
  loop(); // Start the drawing loop
}

function draw() {
  if (startScreen) {
    drawStartScreen();
  } 
  else {
    drawGraph();
  }
}

function drawStartScreen() {
  background(255);
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text('Welcome to the Graphing Calculator!', width / 2, height / 3);
  textSize(18);
  text('Press "Start Graphing" to begin.', width / 2, height / 3 + 40);
}

function drawGraph() {
  background(255);
  translate(width / 2 + offsetX, height / 2 + offsetY);
  scale(zoom);

  // Draw grid and axes
  drawGrid();
  drawAxes();

  // Plot each function
  functions.forEach(f => f.plot());
}

function drawGrid() {
  stroke(220);
  for (let x = -width; x <= width; x += 20) {
    line(x, -height, x, height); // Vertical lines
    line(-width, x, width, x); // Horizontal lines
  }
}

function drawAxes() {
  stroke(0);
  strokeWeight(2);
  line(-width, 0, width, 0); // X-axis
  line(0, -height, 0, height); // Y-axis

  // Labels
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text('X', width / 2 - 10, -10);
  text('Y', 10, -height / 2 + 10);
}

function addFunction() {
  let funcStr = inputFunction.value();
  try {
    let newFunction = new FunctionGraph(funcStr);
    functions.push(newFunction);
    inputFunction.value('');
  } 
  catch (e) {
    alert('Invalid function!');
  }
}

function zoomIn() {
  zoom *= 1.1;
}

function zoomOut() {
  zoom /= 1.1;
}

class FunctionGraph {
  constructor(funcStr) {
    this.funcStr = funcStr;
    this.f = math.compile(funcStr);
  }

  plot() {
    stroke(50, 100, 200);
    noFill();
    beginShape();
    for (let x = -width / 2; x < width / 2; x += 1) {
      let worldX = x / zoom - offsetX / zoom;
      let y = this.evaluate(worldX);
      vertex(x, -y * zoom); // Invert y for the canvas
    }
    endShape();
  }

  evaluate(x) {
    try {
      return this.f.evaluate({ x });
    } 
    catch (e) {
      console.error('Error evaluating function:', e);
      return 0;
    }
  }
}

