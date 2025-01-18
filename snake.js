let snake;
let scale = 10;
let food;
let score=0;

function setup() {
    createCanvas(windowWidth, 500);
    snake = new Snake();
    food = new Food();

    pickLocation(); // Place the food
    frameRate(10)
}

function draw() {
    background(0);
    snake.show();
    snake.update();
    food.show();
    
    

    // Check if the snake eats the food
    if (snake.eat(createVector(food.x, food.y))) {
        pickLocation();
        score++;
    };
    
   
    document.getElementById("score-display").textContent = "Score: " + score;
    snake.bite()
}



function Snake() {
    this.x = 0;
    this.y = 0;

    this.yspeed = 0;
    this.xspeed = 1;

    

    
    this.dir = function (x, y) {
    // Prevent reversing direction
    if (this.xspeed !== -x && this.yspeed !== -y) {
        this.xspeed = x;
        this.yspeed = y;
    }
};


    this.body = [];
this.body.push(createVector(this.x, this.y));

// Update the body in the update function:
this.update = function () {
    if (this.body.length > 0) {
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i] = this.body[i - 1].copy();
        }
        this.body[0] = createVector(this.x, this.y);
    }

    // Move the head
    this.x = this.x + this.xspeed * scale;
    this.y = this.y + this.yspeed * scale;

    // Wrap around the edges
    if (this.x >= width) {
        this.x = 0; // Wrap to the left side
    } else if (this.x < 0) {
        this.x = width - scale; // Wrap to the right side
    }

    if (this.y >= height) {
        this.y = 0; // Wrap to the top
    } else if (this.y < 0) {
        this.y = height - scale; // Wrap to the bottom
    }
};
 



this.show = function() {
    fill(255);
    for (let i = 0; i < this.body.length; i++) {
        rect(this.body[i].x, this.body[i].y, scale, scale);
    }
    rect(this.x, this.y, scale, scale);
   noStroke() 
    
};

this.bite = function() {
    for (let i = 1; i < this.body.length; i++) {
        // Check if the head touches the body
        if (dist(this.x, this.y, this.body[i].x, this.body[i].y) < 1) {
            
            noLoop(); // Stop the game loop
                   
                 
 document.getElementById("game-over").style.display = "flex";
            document.getElementById("final-score").textContent = score;
        
        }
    }
};


this.eat = function(pos) {
    if (dist(this.x, this.y, pos.x, pos.y) < 1) {
        this.body.push(this.body[this.body.length - 1].copy());
        return true;
    }
    return false;
};







    this.move = function (direction) {
        if (direction === 'down') {
            snake.dir(0, +1);
        } else if (direction === 'up') {
            snake.dir(0, -1);
        } else if (direction === 'left') {
            snake.dir(-1, 0);
        } else if (direction === 'right') {
            snake.dir(+1, 0);
        } 
    };
    
    
};
function Food() {
    this.x = 0;
    this.y = 0;

    this.show = function () {
        fill(0, 255, 0);
        rect(this.x, this.y, scale, scale);
    };
}

function pickLocation() {
    let cols = floor(width / scale);
    let rows = floor(height / scale);
    food.x = floor(random(cols)) * scale;
    food.y = floor(random(rows)) * scale;
}


document.getElementById("restart-btn").addEventListener("click", function() {
    // Reset the game state
    score = 0;
    document.getElementById("score-display").textContent = "Score: 0";
    snake = new Snake(); // Reset snake
    pickLocation(); // Reset food location
    document.getElementById("game-over").style.display = "none"; // Hide overlay
    loop(); // Restart the game loop
});


function moveSnake(direction) {
    snake.move(direction);
};

