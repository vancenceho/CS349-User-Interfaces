/**
 * @import Subject
 * @import UndoManager
 */
import { Subject } from "./observer";
import { UndoManager } from "./undo";

/**
 * @constant sampleItems
 * @description Sample items to populate the shopping list
 * @type {Object[]}
 * @property {string} name - Name of the item
 * @property {number} quantity - Quantity of the item
 * @property {string} category - Category of the item
 */
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

/**
 * @constant categories
 * @description Categories for the shopping list
 * @type {Object[]}
 * @property {string} icon - Icon for the category
 * @property {string} name - Name of the category
 * @property {string} colour - Colour of the category
 */
const categories = [
  { icon: "🥛", name: "Dairy", colour: `hsl(220, 75%, 75%)` },
  { icon: "🧊", name: "Frozen", colour: `hsl(220, 90%, 95%)` },
  { icon: "🍌", name: "Fruit", colour: `hsl(140, 75%, 75%)` },
  { icon: "🛒", name: "Other", colour: `hsl(0, 0%, 90%)` },
];

/**
 * @class Model
 * @description Create the model for the shopping list
 * @private {Object} items - Dictionary of categories, each containing a dictionary of items
 * @private {Object[]} categories - List of categories
 * @private {UndoManager} undoManager - Undo manager for the shopping list
 * @extends Subject
 * @method initialiseItems
 * @method getRandomSampleItems
 * @method cloneItems
 * @method setCount
 * @method resetCount
 * @method incrementItemCount
 * @method decrementItemCount
 * @method addItem
 * @method addItemCount
 * @method removeItem
 * @method toggleItemBought
 * @method updateCategory
 * @method undo
 * @method redo
 * @method canUndo
 * @method canRedo
 * @method setItemCountToOne
 * @method getItemCount
 * @method getItemBought
 * @method getCategories
 * @method getCategoryInfo
 * @method getItems
 * @method getSampleItems
 */
export class Model extends Subject {
  private items: {
    [category: string]: { [item: string]: { count: number; bought: boolean } };
  } = {};
  private categories: { icon: string; name: string; colour: string }[] =
    categories;
  private undoManager = new UndoManager();

  constructor() {
    super();
    this.initialiseItems();
  }

  /**
   * @privatemethod initialiseItems
   * @description Initialise the items in the shopping list
   * @param None
   * @returns {void}
   */
  private initialiseItems(): void {
    for (const category of this.categories) {
      this.items[category.name] = {};
    }

    const selectedItems = this.getRandomSampleItems(3); // Change: Selecting three random items
    for (const item of selectedItems) {
      this.addItem(item.category, item.name);
      for (let i = 0; i < item.quantity; i++) {
        this.incrementItemCount(item.category, item.name);
      }
    }
  }

  /**
   * @privatemethod getRandomSampleItems
   * @description Get a random sample of items from the sample items
   * @param count
   * @returns {Object[]} - Random sample of items
   */
  private getRandomSampleItems(count: number) {
    const shuffled = sampleItems.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  /**
   * @privatemethod cloneItems
   * @description Clone the items in the shopping list
   * @param None
   * @returns {Object} - Cloned items
   */
  private cloneItems(): any {
    return JSON.parse(JSON.stringify(this.items));
  }

  /**
   * @method setCount
   * @description Set the count of an item in the shopping list
   * @param category
   * @param item
   * @param count
   * @returns {void}
   */
  setCount(category: string, item: string, count: number): void {
    const beforeState = this.cloneItems();
    this.items[category][item].count = count;
    const afterState = this.cloneItems();
    this.undoManager.execute(beforeState, afterState);
    this.notifyObservers();
  }

  /**
   * @method resetCount
   * @description Reset the count of an item in the shopping list
   * @method resetCount
   * @param category
   * @param item
   * @returns {void}
   */
  resetCount(category: string, item: string): void {
    const beforeState = this.cloneItems();
    this.items[category][item].count = 0;
    const afterState = this.cloneItems();
    this.undoManager.execute(beforeState, afterState);
    this.notifyObservers();
  }

  /**
   * @method incrementItemCount
   * @description Increment the count of an item in the shopping list
   * @param category
   * @param item
   * @returns {void}
   */
  incrementItemCount(category: string, item: string): void {
    const beforeState = this.cloneItems();
    if (!this.items[category]?.[item] !== undefined) {
      this.items[category][item].count++;
      const afterState = this.cloneItems();
      this.undoManager.execute(beforeState, afterState);
      this.notifyObservers();
    }
  }

  /**
   * @method decrementItemCount
   * @description Decrement the count of an item in the shopping list
   * @param category
   * @param item
   * @returns {void}
   */
  decrementItemCount(category: string, item: string): void {
    const beforeState = this.cloneItems();
    if (this.items[category]?.[item]?.count > 0) {
      this.items[category][item].count--;
      const afterState = this.cloneItems();
      this.undoManager.execute(beforeState, afterState);
      this.notifyObservers();
    }
  }

  /**
   * @method addItem
   * @description Add item to the shopping list
   * @param category
   * @param item
   * @returns {void}
   */
  addItem(category: string, item: string): void {
    const beforeState = this.cloneItems();
    if (!this.items[category]) {
      this.items[category] = {};
    }
    if (!this.items[category][item]) {
      this.items[category][item] = { count: 0, bought: false };
      const afterState = this.cloneItems();
      this.undoManager.execute(beforeState, afterState);
      this.notifyObservers();
    }
  }

  /**
   * @method addItemCount
   * @description Add a count of an item to the shopping list
   * @param category
   * @param item
   * @param count
   * @returns {void}
   */
  addItemCount(category: string, item: string, count: number): void {
    const beforeState = this.cloneItems();
    if (!this.items[category]) {
      this.items[category] = {};
    }
    if (!this.items[category][item]) {
      this.items[category][item] = { count: 0, bought: false };
    }
    this.items[category][item].count += count;
    const afterState = this.cloneItems();
    this.undoManager.execute(beforeState, afterState);
    this.notifyObservers();
  }

  /**
   * @method removeItem
   * @description Remove item from the shopping list
   * @param category
   * @param item
   * @returns {void}
   */
  removeItem(category: string, item: string): void {
    const beforeState = this.cloneItems();
    this.items[category][item].count = 0;
    const afterState = this.cloneItems();
    this.undoManager.execute(beforeState, afterState);
    this.notifyObservers();
  }

  /**
   * @method toggleItemBought
   * @description Toggle the bought status of an item
   * @param category
   * @param item
   * @returns {void}
   */
  toggleItemBought(category: string, item: string): void {
    const beforeState = this.cloneItems();
    if (this.items[category]?.[item] !== undefined) {
      this.items[category][item].bought = !this.items[category][item].bought;
      const afterState = this.cloneItems();
      this.undoManager.execute(beforeState, afterState);
      this.notifyObservers();
    }
  }

  /**
   * @method updateCategory
   * @description Update the category of an item
   * @param category
   * @param newCategory
   * @param item
   * @returns {void}
   */
  updateCategory(category: string, newCategory: string, item: string): void {
    const beforeState = this.cloneItems();
    if (this.items[category]?.[item] !== undefined) {
      const itemData = this.items[category][item];
      delete this.items[category][item];
      if (!this.items[newCategory]) {
        this.items[newCategory] = {};
      }
      this.items[newCategory][item] = itemData;
      const afterState = this.cloneItems();
      this.undoManager.execute(beforeState, afterState);
      this.notifyObservers();
    }
  }

  /**
   * @method undo
   * @description Undo the last action
   * @param None
   * @returns {void}
   */
  undo(): void {
    const previousState = this.undoManager.undo();

    if (previousState) {
      this.items = previousState;
      this.notifyObservers();
    }
  }

  /**
   * @method redo
   * @description Redo the last action
   * @param None
   * @returns {void}
   */
  redo(): void {
    const nextState = this.undoManager.redo();

    if (nextState) {
      this.items = nextState;
      this.notifyObservers();
    }
  }

  /**
   * @method canUndo
   * @description Check if an action can be undone
   * @param None
   * @returns {boolean}
   */
  canUndo(): boolean {
    return this.undoManager.canUndo;
  }

  /**
   * @method canRedo
   * @description Check if an action can be redone
   * @param None
   * @returns {boolean}
   */
  canRedo(): boolean {
    return this.undoManager.canRedo;
  }

  /**
   * @method setItemCountToOne
   * @description Set the count of an item to one
   * @param category
   * @param item
   * @returns {void}
   */
  setItemCountToOne(category: string, item: string): void {
    if (this.items[category]?.[item] !== undefined) {
      this.items[category][item].count = 1;
      this.notifyObservers();
    }
  }

  /**
   * @method getItemCount
   * @description Get the count of an item
   * @param category
   * @param item
   * @returns {number} - Count of the item
   */
  getItemCount(category: string, item: string): number {
    return this.items[category]?.[item]?.count ?? 0;
  }

  /**
   * @method getItemBought
   * @description Get the bought status of an item
   * @param category
   * @param item
   * @returns {boolean} - Bought status of the item
   */
  getItemBought(category: string, item: string): boolean {
    return this.items[category]?.[item]?.bought ?? false;
  }

  /**
   * @method getCategories
   * @description Get a list of all categories
   * @param None
   * @returns {string[]} - List of categories
   */
  getCategories(): string[] {
    return Object.keys(this.items);
  }

  /**
   * @method getCategoryInfo
   * @description Get information about a category
   * @param categoryName
   * @returns {Object} - Information about the category
   * @returns {string} icon - Icon for the category
   * @returns {string} name - Name of the category
   * @returns {string} colour - Colour of the category
   * @returns {undefined} - If the category does not exist
   */
  getCategoryInfo(categoryName: string):
    | {
        icon: string;
        name: string;
        colour: string;
      }
    | undefined {
    return this.categories.find((category) => category.name === categoryName);
  }

  /**
   * @method getItems
   * @description Get a list of all items in a category
   * @param category
   * @returns {string[]} - List of items
   */
  getItems(category: string): string[] {
    return Object.keys(this.items[category] || {});
  }

  /**
   * @method getSampleItems
   * @description Get sample items to populate the shopping list
   * @param None
   * @returns {Object[]} - Sample items
   */
  getSampleItems(): { name: string; quantity: number; category: string }[] {
    return sampleItems;
  }
}
