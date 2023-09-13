// Select the canvas element from the HTML document
var canvas = document.querySelector("canvas");

// Set the canvas width and height to match the browser window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create a 2D rendering context for the canvas
var c = canvas.getContext("2d");

var mouse = {
  x: undefined,
  y: undefined,
};

var maxRadius = 40;
var minRadius = 2;
var colorArray = ["#102542", "#F87060", "#CDD7D6", "#B3A394", "#FFFFFF"];

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Define a constructor function for creating circle objects
function Circle(x, y, dx, dy, radius) {
  // Circle properties
  this.x = x; // x-coordinate
  this.y = y; // y-coordinate
  this.dx = dx; // x-velocity
  this.dy = dy; // y-velocity
  this.radius = radius; // radius of the circle
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  // Method to draw the circle
  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // c.strokeStyle = "black";
    // c.stroke();
    c.fillStyle = this.color;
    c.fill();
  };

  // Method to update the circle's position and draw it
  this.update = function () {
    // Check if the circle hits the canvas boundaries and change its velocity accordingly
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    // Update the circle's position
    this.x += this.dx;
    this.y += this.dy;

    //Interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }
    // Draw the updated circle
    this.draw();
  };
}

// Create an array to hold multiple circle objects
var circleArray = [];

// Create 400 circles with random properties and add them to the array
for (let i = 0; i < 700; i++) {
  var radius = Math.random() * 3 + 1;
  var x = Math.random() * (innerWidth - radius * 2) + radius;
  var dx = (Math.random() - 0.5) * 2; // Random x-velocity
  var y = Math.random() * (innerHeight - radius * 2) + radius;
  var dy = (Math.random() - 0.5) * 2; // Random y-velocity

  // Create a new circle and add it to the array
  circleArray.push(new Circle(x, y, dx, dy, radius));
}

// Create a single circle (commented out for now)
// var circle = new Circle(200, 200, 3, 3, 30);

// Animation loop function
function animate() {
  // Request the next animation frame
  requestAnimationFrame(animate);

  // Clear the entire canvas
  c.clearRect(0, 0, innerWidth, innerHeight);

  // Update and draw each circle in the array
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }

  // Uncomment this line to see a single circle
  // circle.update();
}

// init();

// Start the animation loop
animate();
