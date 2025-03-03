## Assignment 2 - Imperative UI

### Student Information

|    Name     | Student ID |  UWaterloo Email   |
| :---------: | :--------: | :----------------: |
| Vancence Ho |  21175167  | v46ho@uwaterloo.ca |

### Getting Started

### Prerequisities

- npm
- Git

### Installation

1. Clone the repository

```shell
git clone https://git.uwaterloo.ca/cs349-winter2025/v46ho.git

OR

git clone ist-git@git.uwaterloo.ca:cs349-winter2025/v46ho.git
```

2. Navigate to the project directory

```shell
cd /v46ho/a2/
```

3. Install dependencies

```shell
npm install
```

4. Launch Assignment 2

```shell
npm run dev
```

5. Go to Assignment 2

> Assignment 2 should be running on `localhost:5173`, if not click the link provided in the terminal by `vite`.

### Explanations

Project root directory will be `a2/` as stated in requirements given.

#### Pre-Defined Categories & Items

As given in the requirement, it is recommended that there should 4\~6 pre-defined categories and each category should have another 4\~6 pre-defined items, below is a table showing the pre-defined categories and items, I have defined in my model.

| Dairy  |  Frozen  | Fruits  | Other        |
| :----: | :------: | :-----: | ------------ |
| Cheese | IceCream | Apples  | Cherries     |
|  Milk  |  Pizza   | Bananas | Eggs         |
| Yogurt |  Fries   | Oranges | Kiwi         |
| Butter | Nuggets  | Grapes  | Strawberries |

&nbsp;
A challenge I encountered during this assignment would be the creation of the `SKRadioButton` which I created using `SKElement` and `SKElementProps`, `simplekit` does not have any default `radiobutton` properties or widget which I could utilise, therefore I had to create it on my own by drawing it and using the `SKEvent` for the event listeners for my radio button. Coding the event listeners was not much of a challenge, however, drawing it as well as incorporting it with the functions where it would update the item category immediately was kind of an obstacle, which I utilise co-pilot's assistance.

The `List-Section` is also one of the portions which happens to be code intensive. To ensure the event listeners work as they should require a lot of brainstorming. However, the most amount of time which I spent on eventually was still the `Settings-Section` since it utilises different layouts as well as different functionalities, it was difficult to incorporate all of it together. Much of my time spent was on experimenting on the layouts and different properties it had as well as adjusting the different properties like `margin` and `padding` to fit the components and make it visually appealing for the user.

### Credits

This assignment was done as part of Assignment 2 in the module [CS349 - User Interfaces](https://student.cs.uwaterloo.ca/~cs349/1251/index.html) during the Winter 2025 term under the **Mathematics & Computer (MC)** faculty at the **University of Waterloo**.

All contents of this assignment is credited to:  
Copyright &copy; 2025 &nbsp;|&nbsp; Vancence Ho &nbsp;|&nbsp; Mathematics & Computer &nbsp;|&nbsp; University of Waterloo
