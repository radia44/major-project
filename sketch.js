let functions = [];
let inputFunction;
let zoom = 1;
let offsetX = 0;
let offsetY = 0;
let graphing = false;
let startScreen = true;

function setup() {
<<<<<<< HEAD
  createCanvas(windowWidth, windowHeight);
  createStartScreen(); // Draw start screen
=======
  createCanvas(800, 600);
  
  // Input field for function
  inputFunction = createInput();
  inputFunction.position(20, 60);
  inputFunction.size(200);
  
  // Add function button
  let addButton = createButton('Add Function');
  addButton.position(inputFunction.x + inputFunction.width + 10, inputFunction.y);
  addButton.mousePressed(addFunction);
  
  // Zoom In button
  let zoomInButton = createButton('Zoom In');
  zoomInButton.position(20, height - 50);
  zoomInButton.mousePressed(zoomIn);

  // Zoom Out button
  let zoomOutButton = createButton('Zoom Out');
  zoomOutButton.position(100, height - 50);
  zoomOutButton.mousePressed(zoomOut);

  // Start Graphing button
  let startButton = createButton('Start Graphing');
  startButton.position(20, 20);
  startButton.mousePressed(startGraphing);

  noLoop(); // To update the canvas only when necessary
}

function startGraphing() {
  startScreen = false;
  graphing = true;
  loop(); // Start the drawing loop
>>>>>>> e8045732a02677defc356537e60292fa322fb64b
}

function draw() {
  background(255);
  
  if (startScreen) {
    drawStartScreen();
  } 
  else {
    drawGraph();
  }
<<<<<<< HEAD
  else if (state === "graphing") {
    drawGraphingScreen();
    drawSidebar();
  }
}

function createStartScreen() {
  // Draw "Graphing" button
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
  createGraphingUI(); // Set up graphing UI
}

function createGraphingUI() {
  // Create the input field for the sidebar
  input = createInput();
  input.position(20, 50); // Place it inside the sidebar area
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
=======
}

function drawStartScreen() {
>>>>>>> e8045732a02677defc356537e60292fa322fb64b
  fill(0);
  textSize(20);
  textAlign(CENTER);
  text("Graphing Calculator", width / 2, height / 4);
  
  textSize(16);
<<<<<<< HEAD
  textAlign(LEFT, TOP);
  textStyle("bold");
  text("Function Input", 20, 20);
}
=======
  textAlign(LEFT);
  text("1. Input a function in the sidebar.", 20, height / 2);
  text("2. Press 'Add Function' to add it to the graph.", 20, height / 2 + 20);
  text("3. Zoom In/Out to adjust the view.", 20, height / 2 + 40);
  text("4. Press 'Start Graphing' to begin.", 20, height / 2 + 60);
}

function drawGraph() {
  // Center the graph and apply zooming
  translate(width / 2 + offsetX, height / 2 + offsetY);
  scale(zoom);

  // Draw Cartesian Plane
  drawGrid();
  drawAxes();
  
  // Draw each function
  functions.forEach(f => f.plot());
}

function drawGrid() {
  stroke(200);
  for (let i = -width / 2; i <= width / 2; i += 20) {
    line(i, -height / 2, i, height / 2);  // Vertical grid lines
    line(-width / 2, i, width / 2, i);  // Horizontal grid lines
  }
}

function drawAxes() {
  strokeWeight(2);
  stroke(0);
  line(-width / 2, 0, width / 2, 0);  // X-axis
  line(0, -height / 2, 0, height / 2);  // Y-axis

  // Axis labels
  fill(0);
  textAlign(CENTER);
  text("X", width / 2 - 20, 10);
  text("Y", 10, -height / 2 + 20);
}

function addFunction() {
  let funcStr = inputFunction.value();
  try {
    let newFunction = new FunctionGraph(funcStr);
    functions.push(newFunction);
    inputFunction.value(''); // Clear input field
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
    this.f = math.compile(funcStr);  // Using math.js for parsing
  }

  plot() {
    beginShape();
    for (let x = -width / 2; x < width / 2; x++) {
      let y = this.evaluate(x);
      vertex(x, -y); // Flip y to match p5.js coordinate system
    }
    endShape();
  }

  evaluate(x) {
    let scope = {x: x};
    try {
      return this.f.evaluate(scope);  // Evaluate the function at the given x
    } 
    catch (e) {
      console.error('Error evaluating function:', e);
      return 0; // Return a default value on error
    }
  }
}
>>>>>>> e8045732a02677defc356537e60292fa322fb64b
