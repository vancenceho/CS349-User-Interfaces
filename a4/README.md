## Assignment 4 - PREACT

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
cd /v46ho/a4/
```

3. Install dependencies

```shell
npm install
```

4. Launch Assignment 4

```shell
npm run dev
```

5. Go to Assignment 4

> Assignment 3 should be running on `localhost:5173`, if not click the link provided in the terminal by `vite`.

### Explanations

Project root directory will be `a4/` as stated in requirements given.

#### Pre-Defined Categories & Items

As given in the requirement, sample shopping items have four properties: `name`, `quantity`,`category` & `bought` and categories have three properties: `icon`, `name` & `color`. And it is given as per requirement below:

> _List of sample items_

```typescript
const sampleItems = [
  { name: "Apples", quantity: 3, category: "Fruit", bought: false },
  { name: "Bananas", quantity: 6, category: "Fruit", bought: true },
  { name: "Burritos", quantity: 0, category: "Frozen", bought: false },
  { name: "Cheese", quantity: 1, category: "Dairy", bought: false },
  { name: "Eggs", quantity: 12, category: "Other", bought: false },
  { name: "Milk", quantity: 4, category: "Dairy", bought: false },
  { name: "Olive Oil", quantity: 0, category: "Other", bought: false },
  { name: "Oranges", quantity: 0, category: "Fruit", bought: false },
  { name: "Pizza", quantity: 0, category: "Frozen", bought: false },
  { name: "Waffles", quantity: 2, category: "Frozen", bought: false },
  { name: "Yogurt", quantity: 1, category: "Dairy", bought: true },
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

However in the later part of the assignment `sampleItems` would not be needed as an `API` call to `https://student.cs.uwaterloo.ca/~cs349/resources/items.php` would help to retrieve items needed as a `JSON` object.

Some of the major challenges I have faced are included (but not all) as follows:

1. One setback I encountered was the `regex` implementation for the text field input of item names. I was able to achieve a workaround result as compared to `a3/`. In this assignment the text field input would allow the user to type leading spaces for the item name, however, when the user presses `enter` or `click` the `+` button, when adding the item into shopping list, the `app` would automatically remove the leading whitespaces and thereafter just insert the name without the leading whitespace after putting it through the `regex` test and removing all unecessary characters.

2. Another challenge was the `css` implementations of animations, I had to search up how would I able to animate as well as the usage of `@keyframes` to animate certain features that are required in this assignment. Overall, I believe it was fun and I was able to learn more about `css` implementation.

3. Lastly, I separated the different sections into multiple components as shown the project structure. I realise that it would be rather confusing, however the separation of components allow for better structure and clear separation of functions, in my opinion.

Finally, I utilized co-pilot to help me structure, comment and document most of code in this project, so it would be easier for readibility and standardization.

### Credits

This assignment was done as part of Assignment 4 in the module [CS349 - User Interfaces](https://student.cs.uwaterloo.ca/~cs349/1251/index.html) during the Winter 2025 term under the **Mathematics & Computer (MC)** faculty at the **University of Waterloo**.

All contents of this assignment is credited to:  
Copyright &copy; 2025 &nbsp;|&nbsp; Vancence Ho &nbsp;|&nbsp; Mathematics & Computer &nbsp;|&nbsp; University of Waterloo
