# CS349-User-Interfaces

This repository consists of readings and assignments from **CS349 - User Interfaces** a module I took during the Winter 2025 term, from the faculty of **Mathematics & Computer (MC)** at the
**_University of Waterloo_ (UWaterloo)**.

## Assignments

### General Restrictions

1. Your development environment must conform to the setup and versions specified in A0 and it must use the standard Vite folder structure (see A0 and examples in lecture).

2. You must use TypeScript. Your code must be set up to run with Vite using its default settings in `tsconfig.json`.

3. You must provide your TypeScript source code under `src/`. Do not submit a build/ directory with the transpiled and bundled files (if you do, the TAs will ignore it).

4. Your index.html file must only have a single element in the body, the `script` element to load your module for Vite to run.

5. You cannot include or import modules or packages other than Vite, SimpleKit, and your own modules.

> There should only be one `script` tag in your index.html to load your main.ts module.

> You may not run `npm install <something>` to add any other npm packages.

6. You can only draw into the single graphics context and canvas provided by SimpleKit.

7. You may not use any `style` tags, CSS files, or CSS features like gradients or animations.

8. You may not add any HTML elements to the DOM (either directly in your `index.HTML`, or added through code), and you cannot modify any elements in the DOM. For example, you cannot use DOM methods like `createElement`, `getElementById`, `querySelector`, `appendChild`, `setProperty`, etc.

9. You can not use any method on these DOM objects: `document`, `window`, or `screen`. SimpleKit provides the canvas size in a `resize` event and in the graphics context.

10. You may only use SimpleKit generated events (ie: `setSKEventListener`, `addSKEventTranslator`, `SKKeyboardEvent`, `SKMouseEvent`, `SKResizeEvent`, `SKEvent`). You may not use any DOM events like `MouseEvent` or event related DOM methods like `addEventListener`.

11. You may not use the `Path2D` interface in the Canvas API

12. You may not use the `isPointInPath` or `isPointInStroke` methods of the CanvasRenderingContext2D

13. You may not use JavaScript or HTML/DOM timers like `setInterval`, `setTimeout`, or `requestAnimationFrame`.

### A1 - CANVAS

#### Synopsis

> You’ll implement an carnival-inspired aim training game. Numbered targets placed in random order around a circle rotate and dilate in size. You click on them in order as fast as you can, and try to beat your best time. You can adjust the number and size of targets using keyboard shortcuts. Pressing “c” is a cheat to automatically click on the next target. Finally, there are some animated effects for click feedback.

![A1 example](./assets/a1-canvas.png)

#### Required Functionality

Each item is worth 2 marks, and they are roughly ordered by difficulty. The final items are more challenging. Study the video to see these requirements demonstrated.

You are to implement a game in which players must click on a series of spinning circles as quickly as possible. Oftentimes, games consist of several modes, such as, setup play, or end, with clear actions for transitioning between these modes. This game here is no different, so make sure to incorporate modes into your implementation.

> Assume the browser canvas size is at least 450 px (w) x 400px (h). (previously this was ambiguous as to which dimension was width and height)

| Point | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :---: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  1.   | When the app starts, that game is in `setup` mode. The background is `black`. There is `2px` thick horizontal white line `50px` below the top of the canvas. The line fully spans the width of the canvas.                                                                                                                                                                                                                                                                                                                                                      |
|  2.   | There is a text message, initially `click target 1 to begin`. The message font is white and `24px sans-serif`.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|  3.   | The text message is horizontally centred in the canvas, and vertically centred in the space between the top of the canvas and the horizontal line.                                                                                                                                                                                                                                                                                                                                                                                                              |
|  4.   | When the browser is resized, the location of the text message adjusts to maintain this horizontal and vertical alignment.                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|  5.   | In the area below the white line, there are six circular targets, each having a random radius between `15px` and `45px`.                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|  6.   | The six circular targets are themselves arranged in a circular pattern, with equal distances (i.e., angles) between them. The centre of this circular pattern of targets is itself horizontally and vertically centred in the space below the white line.                                                                                                                                                                                                                                                                                                       |
|  7.   | Targets will be labelled sequentially from 1 to 6 (see #12), with labels centred in the target. The label font is black and `20px sans-serif`. At the beginning, however, only the label of Target 1 is visible.                                                                                                                                                                                                                                                                                                                                                |
|  8.   | The fill colour of Target 1 is `white`, which indicates that it is the next target to click on. All other targets are filled with `darkgrey`.                                                                                                                                                                                                                                                                                                                                                                                                                   |
|  9.   | When the browser is resized, the pattern of targets remains as large as possible and centred as described in #6 (see video). This means that the target location might shift, but all other features (overall target order and layout) remain the same.                                                                                                                                                                                                                                                                                                         |
|  10.  | Pressing the space key in `setup` mode randomizes the order of targets within the circular pattern.                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|  11.  | When in `setup` mode, clicking on Target 1 changes the mode to `play`. The text message at the top (see #2) changes to display a stopwatch timer. The timer displays seconds to 1 decimal place, such as `1.2`. It starts from 0.0, then continually counts up the time since Target 1 was clicked.                                                                                                                                                                                                                                                             |
|  12.  | When Target 1 is clicked, its fill colour changes such that it is assigned a random hue value (see #24). Target 2’s label is revealed and its fill colour turns `white`, indicating that it is the next target to be clicked. Then clicking on Target 2 changes its fill colour, Target 3’s label is revealed, and its fill colour turns `white`. This continues until all targets have been clicked on. The targets must be clicked in order. Clicking on the wrong target or clicking on no target (e.g., the background) does not change the current target. |
|  13.  | Clicking on the wrong target or on no target causes an error. An error is shown by turning the app background `darkred` from `mousedown` to the next `mouseup`.                                                                                                                                                                                                                                                                                                                                                                                                 |
|  14.  | In `play` mode, the targets slowly rotate in a clockwise direction. The initial rate of rotation is 5 degrees per second.                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|  15.  | In `play` mode, the target radii periodically dilate between `15px` and `45px`. The dilation phase length is 3.6 s, i.e., it takes 3.6 for a target to transition from `15px` to `45px` and back to `15px`. The target dilations are not in phase with one another (see video).                                                                                                                                                                                                                                                                                 |
|  16.  | When the last target has been clicked, the timer stops with the final time displayed. The mode changes to `end`.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|  17.  | If the final time is faster than the previous best time, the message displays `(new best!)` to the right of the time. Otherwise the best time is shown to the right of the final time, for example, `(best: 1.2)`.                                                                                                                                                                                                                                                                                                                                              |
|  18.  | When in end mode, pressing the space key changes back to `setup` mode.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|  19.  | When in `setup mode`, the number of targets can be increased by 1 by pressing the `]` key and decreased by 1 by pressing `[`. The minimum and maximum number of targets are 3 and 8 respectively. The pattern of targets updates immediately, revealing the new first target position.                                                                                                                                                                                                                                                                          |
|  20.  | When in `setup` mode, the rotation speed can be decreased by 1 degree / second by pressing the `{` key (i.e., “shift” + `[`) and increased by 1 degree / second by pressing `}`. The minimum and maximum rotation speeds are 1 degree / second and 10 degrees / second respectively. The target order and orientation along the circular pattern does not change.                                                                                                                                                                                               |
|  21.  | When the mouse cursor is over any target, the target is outlined with a 3px `lightblue` stroke.                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|  22.  | In `play` mode, when the mouse cursor is over the correct target and the mouse button is pressed down, a `3px yellow` circle with a radius of `15px` appears at the cursor location.                                                                                                                                                                                                                                                                                                                                                                            |
|  23.  | The yellow circle from #22 is smoothly animated outward over about one-third of a second from a radius of `15px` to a radius of `45px`. The circle is in front of other targets.                                                                                                                                                                                                                                                                                                                                                                                |
|  24.  | The fill color of each target, once clicked, consists of a randomly assigned hue (0 – 360), 100% saturation, and 50% lightness.                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|  25.  | If the mouse button is held down without moving more than 10 px for at least 1 second, a SimpleKit `SKMouseEvent` with type `longclick` is triggered when the mouse button is released. In your global event listener callback function, log the `SKMouseEvent` object for the `longclick` to the console to show that it is working. You need to create a `longClickTranslator` object and add it to SimpleKit using `addSKEventTranslator`.                                                                                                                   |
|  26.  | When in `play` mode, a `longclick` event resets all targets and returns to `setup` mode. The `longclick` can be performed anywhere in the canvas.                                                                                                                                                                                                                                                                                                                                                                                                               |
|  27.  | When in `setup` or `play` mode, pressing the `c` key is a cheat to automatically “click” the next target.                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|  28.  | Upon pressing the `c` to advance targets, there is no mouseover lightblue ring (#21) and no mousedown yellow circle (#22-23), but all other behaviour is the same as a mouse click.                                                                                                                                                                                                                                                                                                                                                                             |

#### Submission

The `a1/` folder should have the following directory:

```shell
a1/
├── a1-canvas/
│ ├── node_modules
│ ├── public
│ ├── src/
│ │ └── main.ts          // main logic of where A1 is at
│ ├── .gitignore
│ ├── index.html
│ ├── package-lock.json
│ ├── package.json
│ └── tsconfig.json
├── .gitignore
└── README.md
```

Inside the folder `a1/` there includes a `README.md` which states how to launch the assignment, it also includes the following points:

- known bugs and workarounds
- describing use of AI tools like CoPilot or code from other sources
- assumptions you made after clarifying something on Piazza (provide a link to the Piazza post)

### A2 - Imperative UI

### A3

### A4

## Acknowledgements

These materials are an undertaking of [CS349 - User Interfaces](https://student.cs.uwaterloo.ca/~cs349/1251/index.html) course during Winter 2025 under the **MC** faculty at **UWaterloo**.

All contents of assignment solutions are credited to:  
Copyright &copy; 2025 _Vancence Ho_ &nbsp;|&nbsp; MC Exchange Student &nbsp;|&nbsp; UWaterloo

All contents of the readings and the course are credited to:  
Copyright &copy; 2025 _CS349_ &nbsp;|&nbsp; MC &nbsp;|&nbsp; UWaterloo
