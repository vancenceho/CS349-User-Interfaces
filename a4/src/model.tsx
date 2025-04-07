/**
 * @import signal
 */
import { signal } from "@preact/signals";

/**
 * @constant sampleItems
 * @description Sample items to populate the shopping list
 * @type {Object[]}
 * @property {string} name - Name of the item
 * @property {number} quantity - Quantity of the item
 * @property {string} category - Category of the item
 * @property {boolean} bought - Whether the item is bought or not
 */
export const sampleItems = [
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

/**
 * @constant categories
 * @description Categories for the shopping list
 * @type {Object[]}
 * @property {string} icon - Icon for the category
 * @property {string} name - Name of the category
 * @property {string} colour - Colour of the category
 */
export const categories = [
  { icon: "🥛", name: "Dairy", colour: `hsl(220, 75%, 75%)` },
  { icon: "🧊", name: "Frozen", colour: `hsl(220, 90%, 95%)` },
  { icon: "🍌", name: "Fruit", colour: `hsl(140, 75%, 75%)` },
  { icon: "🛒", name: "Other", colour: `hsl(0, 0%, 90%)` },
];

/**
 * @constant shoppingList
 * @description Shopping list signal
 * @type {Object[]}
 * @property {string} name - Name of the item
 * @property {number} quantity - Quantity of the item
 * @property {string} category - Category of the item
 * @property {boolean} bought - Whether the item is bought or not
 */
export const shoppingList = signal<
  { name: string; quantity: number; category: string; bought: boolean }[]
>([]);

/**
 * @function fetchShoppingList
 * @description Fetches the shopping list from the server and populates the shoppingList signal
 * @returns {Promise<void>}
 * @throws {Error} If the fetch fails
 */
export async function fetchShoppingList() {
  const response = await fetch(
    "https://student.cs.uwaterloo.ca/~cs349/resources/items.php"
  );
  const data = await response.json();
  shoppingList.value = data;
  console.log("Fetched items: ", shoppingList.value);
}
