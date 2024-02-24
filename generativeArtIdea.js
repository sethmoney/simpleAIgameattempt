let lines = []; // Array to hold the line objects
let maxLines = 100; // Maximum number of lines
let colorBlue;
let colorWhite;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorBlue = color(0, 0, 255); // Blue color
  colorWhite = color(255); // White color
  
  // Initialize lines with random starting points
  for (let i = 0; i < maxLines; i++) {
    lines.push(new Line(random(width), random(height)));
  }
}

function draw() {
  background(255); // White background for the duotone effect

  // Loop through each line object and call its grow and display methods
  lines.forEach(line => {
    line.grow();
    line.display();
  });
}

class Line {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xOff = random(1000); // Offset for Perlin noise
    this.yOff = random(1000);
    this.strokeColor = color(255);
    this.prevX = this.x;
    this.prevY = this.y;
  }

  grow() {
    // Calculate a Perlin noise value for angle to get a smooth random motion
    let angle = noise(this.xOff, this.yOff) * TWO_PI;
    this.xOff += 0.01; // Increment offset for noise
    this.yOff += 0.01;

    // Polar to Cartesian conversion to get a smooth random motion
    let v = p5.Vector.fromAngle(angle);
    v.setMag(3); // Move 3 pixels per frame

    // Save previous position
    this.prevX = this.x;
    this.prevY = this.y;

    // Update position
    this.x += v.x;
    this.y += v.y;

    // Wrap around edges
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height;

    // Check for intersection with other lines
    for (let i = 0; i < lines.length; i++) {
      if (lines[i] !== this) {
        let d = dist(this.x, this.y, lines[i].x, lines[i].y);
        if (d < 10) {
          noStroke();
          fill(colorBlue);
          rect(this.x - 5, this.y - 5, 10, 10);
          stroke(colorBlue);
          line(this.prevX, this.prevY, this.x, this.y);
          line(lines[i].prevX, lines[i].prevY, lines[i].x, lines[i].y);
        }
      }
    }
  }

  display() {
    // Draw the line from previous position to current position
    stroke(this.strokeColor);
    strokeWeight(1);
    line(this.prevX, this.prevY, this.x, this.y);
  }
}
