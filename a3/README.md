## Assignment 3 - VANILLA HTML CSS UI

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
cd /v46ho/a3/
```

3. Install dependencies

```shell
npm install
```

4. Launch Assignment 3

```shell
npm run dev
```

5. Go to Assignment 3

> Assignment 3 should be running on `localhost:5173`, if not click the link provided in the terminal by `vite`.

### Explanations

Project root directory will be `a3/` as stated in requirements given.

#### Pre-Defined Categories & Items

As given in the requirement, sample shopping items have three properties: `name`, `quantity` & `category` and categories have three properties: `icon`, `name` & `color`. And it is given as per requirement below:

> _List of sample items_

```typescript
const sampleItems = [
  { name: "Milk", quantity: 4, category: "Dairy" },
  { name: "Yogurt", quantity: 1, category: "Dairy" },
  { name: "Pizza", quantity: 1, category: "Frozen" },
  { name: "Eggs", quantity: 12, category: "Other" },
  { name: "Olive Oil", quantity: 1, category: "Other" },
  { name: "Cheese", quantity: 1, category: "Dairy" },
  { name: "Burritos", quantity: 4, category: "Frozen" },
  { name: "Waffles", quantity: 2, category: "Frozen" },
  { name: "Bananas", quantity: 6, category: "Fruit" },
  { name: "Apples", quantity: 3, category: "Fruit" },
  { name: "Oranges", quantity: 3, category: "Fruit" },
];
```

> _A fixed set of categories_

```typescript
const categories = [
  { icon: "🥛", name: "Dairy", colour: `hsl(220, 75%, 75%)` },
  { icon: "🧊", name: "Frozen", colour: `hsl(220, 90%, 95%)` },
  { icon: "🍌", name: "Fruit", colour: `hsl(140, 75%, 75%)` },
  { icon: "🛒", name: "Other", colour: `hsl(0, 0%, 90%)` },
];
```

Some of the major challenges I have faced are included (but not all) as follows:

Initially, I was not able to achieve the result of getting 3 unique `sampleItems` and displaying them once the application has launched, in fact it did not show any `sampleItems` at all until I clicked the `undo` button. With a consult, I was able to figure out why I was unable to do so, it was because when I initialised my items, I did not get the `sampleItems` correctly, and with that I included the method `getRandomSampleItems` in my model so that it would do so and achieve the result.

Secondly, I also separated all my `css` styling onto `src/style.css`, however, some styling issues I ran into was that the result was not captured as desired and some would be overlooked due to the presedence of utilising it in `typescript` itself. Therefore, instead I only added `layouts` in my `css` script and all other `element` styling are inline with together with `typescript`.

Lastly, in `utils.ts` I created a function which would help create a `HTMLButtonElement` and return it with a given input of `text` and `width`, this helped me to reduce code since I would not be required to use `document.createElement` for every single `element` I would need and most of the required `buttons` would just be required to call the function `createButton` in `utils.py`.

Finally, I utilised co-pilot to help me structure, comment and document most of code in this project, so it would be easier for readibility and standardization.

### Credits

This assignment was done as part of Assignment 3 in the module [CS349 - User Interfaces](https://student.cs.uwaterloo.ca/~cs349/1251/index.html) during the Winter 2025 term under the **Mathematics & Computer (MC)** faculty at the **University of Waterloo**.

All contents of this assignment is credited to:  
Copyright &copy; 2025 &nbsp;|&nbsp; Vancence Ho &nbsp;|&nbsp; Mathematics & Computer &nbsp;|&nbsp; University of Waterloo
