## Assignment 1 README

### Student Information

|    Name     | Student ID |  UWaterloo Email   |
| :---------: | :--------: | :----------------: |
| Vancence Ho |  21175167  | v46ho@uwaterloo.ca |

### Getting Started

#### Prerequisities

- npm
- Git

#### Installation

1. Clone the repository

```shell
git clone https://git.uwaterloo.ca/cs349-winter2025/v46ho.git

OR

git clone ist-git@git.uwaterloo.ca:cs349-winter2025/v46ho.git
```

2. Navigate to the project directory

```shell
cd /v46ho/a1/a1-canvas
```

3. Install dependencies

```shell
npm install
```

4. Launch Assignment 1

```shell
npm run dev
```

5. Go to Assignment 1

> Assignment 1 should be running on `localhost:5173`, if not click the link provided in the terminal by `vite`

### Explanations

Project root directory is labeled as a1-canvas since there was no specification given for the project name.

Some bugs that I encountered during the progress of this assignment would be the creation of the circles in a circular formation. I was able to solve this by defining an outer circle and therefore "planting" the circles on it in a circular formation with equi-distance from each other by calculating the arc and angle of the circle.

Another challenge that I encountered was the `longClickTranslator` object where it would log a `longclick`, I had to make use of `addSKEventTranslator` which was difficult to find references to it, hence I found it challenging to implement its functionality due to the `update` requirement that is needed to be implemented. However, with the help of a friend, we were able to resolve it together.

Animating the yellow circle was tough as well and I utilised GitHub CoPilot's help on this one. I was initially able to animate the click but the speed of the animation was rather slow and was inaccurate, therefore with the help of it, I was able to workaround this challenge.

### Credits

This assignment was done as part of Assignment 1 in the module [CS349 - User Interfaces](https://student.cs.uwaterloo.ca/~cs349/1251/index.html) during the Winter 2025 term under the **Mathematics & Computer (MC)** faculty at the **University of Waterloo**.

All contents of this assignment is credited to:  
Copyright &copy; 2025 &nbsp;|&nbsp; Vancence Ho &nbsp;|&nbsp; Mathematics & Computer &nbsp;|&nbsp; University of Waterloo
