// Import necessary functions from simplekit/canvas-mode
import {
  startSimpleKit,
  setSKDrawCallback,
  SKResizeEvent,
  EventTranslator,
  SKKeyboardEvent,
  SKMouseEvent,
  addSKEventTranslator,
  setSKEventListener,
  FundamentalEvent,
} from "simplekit/canvas-mode";

// Define type of circle
type Circle = {
  x: number;
  y: number;
  radius: number;
  color: string;
  angle: number;
  number: number | null;
  timeOffset: number;
};

// Defining parameters for outer circle
const outerCircle = {
  x: 0,
  y: 0,
  radius: 0,
};

// Defining parameters for animated yellow circle
let yellowCircle: {
  x: number;
  y: number;
  radius: number;
  isAnimating: boolean;
  startTime: number | null;
} | null = null;

// Defining duration for the yellow circle animation
const yellowCircleDuration = 333; // 333ms = 1/3s

// Reposition outer circle
const resizeOuterCircle = (height: number, width: number): void => {
  outerCircle.x = width / 2;
  outerCircle.y = height / 2;
  outerCircle.radius = Math.min(width, height) * 0.3;

  circles.forEach((circle, i) => {
    const angle = (Math.PI * 2 * i) / numberOfCircles;
    const { x, y } = getCirclePosition(angle);
    circle.x = x;
    circle.y = y;
  });
};

// Initialise game variables
let gameMode: "setup" | "play" | "end" = "setup"; // to store the game mode
let numberOfCircles = 6; // to store the number of circles
let message = ""; // to store the message to be displayed
let startTime = 0; // to store the start time of the game
let endElapseTime: number | null = null; // to store the time taken to complete the game
let bestTime = 10000; // to store the best time taken to complete the game
let error = false; // to check if the user clicked the wrong circle
let rotation = 3; // to store the rotation speed of the circles
let circleTime = 0; // to store to create a dynamic effect for the circle radii and rotation
let hovered: Circle | null = null; // to store the hovered circle

// Initialise long click event variables
let longClickStart: number | null = null;
let longClickPosition: { x: number; y: number } | null = null;

// Long click translator object
const longClickTranslator: EventTranslator = {
  update(event: FundamentalEvent): SKMouseEvent | undefined {
    // Check if the event is a mouse down event
    if (event.type === "mousedown") {
      longClickStart = Date.now();
      if (event.x !== undefined && event.y !== undefined) {
        longClickPosition = { x: event.x, y: event.y };
      }
    }
    // Check if the event is a mouse up event
    if (
      event.type === "mouseup" &&
      longClickStart != null &&
      longClickPosition != null
    ) {
      const longClickDistance = Math.sqrt(
        (event.x! - longClickPosition.x) ** 2 +
          (event.y! - longClickPosition.y) ** 2
      );
      if (Date.now() - longClickStart >= 1000 && longClickDistance <= 10) {
        return new SKMouseEvent(
          "longclick",
          event.timeStamp,
          longClickPosition.x,
          longClickPosition.y
        );
      }
    }
  },
};

// Add long click translator to the event listeners
addSKEventTranslator(longClickTranslator);

// helper: to check if the mouse is inside a circle
const isInsideCircle = (c: Circle, x: number, y: number): boolean =>
  (x - c.x) ** 2 + (y - c.y) ** 2 <= c.radius ** 2;

// helper: to calculate the small circles position
const getCirclePosition = (angle: number): { x: number; y: number } => {
  const x = outerCircle.x + outerCircle.radius * Math.cos(angle);
  const y = outerCircle.y + outerCircle.radius * Math.sin(angle);
  return { x, y };
};

// helper: to update the circle
const changeCircle = (c: Circle): void => {
  c.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  if (c.number !== null) {
    const nextCircle = c.number + 1;
    const freeCircles = circles.filter((c) => c.number === null);
    if (freeCircles.length > 0) {
      const nextCircleIndex =
        freeCircles[Math.floor(Math.random() * freeCircles.length)];
      nextCircleIndex.number = nextCircle;
      nextCircleIndex.color = "white";
    }
  }
};

// helper: to resize the circles
const resizeCircles = (): void => {
  circles = createCircles();
};

// Create circles
const createCircles = (): Circle[] =>
  new Array(numberOfCircles).fill(null).map((_, i) => {
    const angle = (Math.PI * 2 * i) / numberOfCircles;
    const { x, y } = getCirclePosition(angle);
    return {
      x,
      y,
      radius: Math.random() * (45 - 15) + 15,
      color: i === 0 ? "white" : "darkgrey",
      angle,
      number: i === 0 ? 1 : null,
      timeOffset: Math.random() * Math.PI * 2,
    };
  });
let circles = createCircles();

// Draw circles
const drawCircles = (gc: CanvasRenderingContext2D, c: Circle) => {
  if (hovered === c) {
    gc.strokeStyle = "lightblue";
    gc.lineWidth = 3;
    gc.beginPath();
    gc.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
    gc.stroke();
  }

  gc.beginPath();
  gc.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
  gc.fillStyle = c.color;
  gc.fill();

  if (c.number) {
    gc.font = "20px sans-serif";
    gc.fillStyle = "black";
    const textWidth = gc.measureText(c.number.toString()).width;
    gc.fillText(c.number.toString(), c.x - textWidth / 2, c.y + 20 / 2 - 1);
  }
};

// Event listener
setSKEventListener((event) => {
  // handle the longclick event translator which is defined above
  if (event instanceof SKMouseEvent && event.type === "longclick") {
    console.log("Long click event:", event);
    gameMode = "setup";
    startTime = 0;
    endElapseTime = null;
    error = false;
    circles = createCircles();
  }
  // handle the resize event
  if (event instanceof SKResizeEvent) {
    console.log("Resize event:", event);
    resizeOuterCircle(event.height, event.width);
  }
  // handle the keyoard event
  if (event instanceof SKKeyboardEvent) {
    console.log("Keyboard event:", event);
    // if the space key is pressed, update the circles
    if (event.key === " " && event.type === "keydown" && gameMode === "setup") {
      resizeCircles();
    }
    // if the space key is pressed in the end mode reset the game
    if (event.key === " " && event.type === "keydown" && gameMode === "end") {
      gameMode = "setup";
      startTime = 0;
      endElapseTime = null;
      error = false;
      circles = createCircles();
    }
    // if the [ key is pressed in setup mode, decrease the number of circles - minimum 3
    if (event.key === "[" && event.type === "keydown") {
      numberOfCircles = Math.max(3, numberOfCircles - 1);
      resizeCircles();
    }
    // if the ] key is pressed in setup mode, increase the number of circles - maximum 8
    if (event.key === "]" && event.type === "keydown") {
      numberOfCircles = Math.min(8, numberOfCircles + 1);
      resizeCircles();
    }
    // if the { is pressed in setup mode, decrease the rotation speed by 1 degree per second - minimum 1
    if (event.key === "{" && event.type === "keydown") {
      rotation = Math.max(1, rotation - 1);
    }
    // if the } is pressed in setup mode, increase the rotation speed by 1 degree per second - maximum 10
    if (event.key === "}" && event.type === "keydown") {
      rotation = Math.min(10, rotation + 1);
    }
    // if the c key is pressed in setup and play mode, automatically "click" the next circle --> cheat mode
    if (event.key === "c" && event.type === "keydown") {
      if (gameMode === "setup") {
        gameMode = "play";
        startTime = Date.now();
      }

      const nextTarget = circles.find(
        (circle) => circle.number !== null && circle.color === "white"
      );
      if (nextTarget) {
        nextTarget.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        const nextNumber =
          nextTarget.number !== null ? nextTarget.number + 1 : 1;
        const freeCircles = circles.filter((c) => c.number === null);
        if (freeCircles.length > 0) {
          const nextCircleIndex =
            freeCircles[Math.floor(Math.random() * freeCircles.length)];
          nextCircleIndex.number = nextNumber;
          nextCircleIndex.color = "white";
        }

        if (nextTarget.number === numberOfCircles) {
          gameMode = "end";
          endElapseTime = parseFloat(
            ((Date.now() - startTime) / 1000).toFixed(1)
          );

          if (endElapseTime < bestTime) {
            bestTime = endElapseTime;
            message = `${bestTime}s (New Best Time!)`;
          } else {
            message = `${endElapseTime}s (Best Time: ${bestTime}s)`;
          }
        }
      }
    }
  }
  // handle the mousemove event where the hovered circle is updated
  if (event instanceof SKMouseEvent && event.type === "mousemove") {
    const { x, y } = event;
    hovered = circles.find((circle) => isInsideCircle(circle, x, y)) || null;
  }
  // handle the mousedown event where the yellow circle is animated
  if (event instanceof SKMouseEvent && event.type === "mousedown") {
    const { x, y } = event;
    const valid = circles.some(
      (circle) =>
        isInsideCircle(circle, x, y) &&
        circle.number != null &&
        circle.color === "white"
    );

    if (valid) {
      yellowCircle = {
        x,
        y,
        radius: 15,
        isAnimating: true,
        startTime: Date.now(),
      };
    }

    if (!valid) {
      error = true;
    }
  }
  // reset the error flag when the mouse is released
  if (event instanceof SKMouseEvent && event.type === "mouseup") {
    error = false;
  }
  // handle the mouse click event when the game is played
  if (event instanceof SKMouseEvent && event.type === "click") {
    console.log("Mouse click event:", event);
    const { x, y } = event;
    circles.forEach((circle) => {
      if (isInsideCircle(circle, x, y) && circle.number) {
        if (gameMode === "setup" && circle.number === 1) {
          gameMode = "play";
          startTime = Date.now();
          circle.color = `hsl(${Math.random() * 360}, 100%, 50%)`;

          const nextCircle = circle.number + 1;
          const freeCircles = circles.filter((c) => c.number === null);
          if (freeCircles.length > 0) {
            const nextCircleIndex =
              freeCircles[Math.floor(Math.random() * freeCircles.length)];
            nextCircleIndex.number = nextCircle;
            nextCircleIndex.color = "white";
          }
        } else if (
          gameMode === "play" &&
          circle.number != null &&
          circle.color === "white"
        ) {
          changeCircle(circle);

          if (circle.number === numberOfCircles) {
            gameMode = "end";
            endElapseTime = parseFloat(
              ((Date.now() - startTime) / 1000).toFixed(1)
            );

            if (endElapseTime < bestTime) {
              bestTime = endElapseTime;
              message = `${bestTime}s (New Best Time!)`;
            } else {
              message = `${endElapseTime}s (Best Time: ${bestTime}s)`;
            }
          }
        }
      }
    });
  }
});

// Draw callback
setSKDrawCallback((gc: CanvasRenderingContext2D) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  gc.fillStyle = error ? "darkred" : "black";
  gc.fillRect(0, 0, gc.canvas.width, gc.canvas.height);

  gc.strokeStyle = "white";
  gc.lineWidth = 2;
  gc.beginPath();
  gc.moveTo(0, 50);
  gc.lineTo(gc.canvas.width, 50);
  gc.stroke();

  gc.font = "24px sans-serif";
  gc.fillStyle = "white";

  if (gameMode === "setup") {
    message = "Click target 1 to begin";
    gc.fillText(
      message,
      gc.canvas.width / 2 - gc.measureText(message).width / 2,
      30
    );
  }

  if (gameMode === "play") {
    const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(1);
    message = "Time: " + elapsedTime + "s";

    circles.forEach((circle) => {
      circle.angle += (rotation * Math.PI) / 180 / 60;
      const { x, y } = getCirclePosition(circle.angle);
      circle.x = x;
      circle.y = y;
      circle.radius = 30 + 15 * Math.sin(circleTime + circle.timeOffset);
    });
    circleTime += 1 / 60;

    gc.fillText(
      message,
      (gc.canvas.width - gc.measureText(message).width) / 2,
      30
    );
  }

  if (gameMode === "end") {
    gc.fillText(
      message,
      gc.canvas.width / 2 - gc.measureText(message).width / 2,
      30
    );
  }

  // Draw the circles on the outer circle for each circle in the circles array
  circles.forEach((circle) => {
    drawCircles(gc, circle);
  });

  // Draw the yellow circle if it is animating
  if (yellowCircle && yellowCircle.isAnimating) {
    const elapsedTime = Date.now() - (yellowCircle.startTime || 0);

    if (elapsedTime < yellowCircleDuration) {
      const timeOfAnimation = elapsedTime / yellowCircleDuration;
      yellowCircle.radius = 15 + timeOfAnimation * (45 - 15);

      gc.beginPath();
      gc.arc(
        yellowCircle.x,
        yellowCircle.y,
        yellowCircle.radius,
        0,
        Math.PI * 2
      );
      gc.strokeStyle = "yellow";
      gc.lineWidth = 3;
      gc.stroke();
    } else {
      yellowCircle.isAnimating = false;
    }
  }
});

// Start Simplekit
startSimpleKit();
