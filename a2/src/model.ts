import { Subject } from "./observer";

// Define the types for the shopping list
type Item = { count: number; bought: boolean };
type Category = { [item: string]: Item };

/**
 * @class Model
 * @description Create the model for the shopping list
 * @extends Subject
 * @method incrementItemCount
 * @method decrementItemCount
 * @method addItem
 * @method removeItem
 * @method toggleItemBought
 * @method updateCategory
 * @method setItemCountToOne
 * @method getItemCount
 * @method getItemBought
 * @method getCategories
 * @method getItems
 * @property {Object} items - Dictionary of categories, each containing a dictionary of items
 * acting as a shopping list
 */
export class Model extends Subject {
  // Dictionary of categories, each containing a dictionary of items
  // acting as a shopping list
  private items: {
    [category: string]: Category;
  } = {
    Dairy: {
      Cheese: { count: 0, bought: false },
      Milk: { count: 0, bought: false },
      Yogurt: { count: 0, bought: false },
      Butter: { count: 0, bought: false },
    },
    Frozen: {
      IceCream: { count: 0, bought: false },
      Pizza: { count: 0, bought: false },
      Fries: { count: 0, bought: false },
      Nuggets: { count: 0, bought: false },
    },
    Fruits: {
      Apples: { count: 0, bought: false },
      Bananas: { count: 0, bought: false },
      Oranges: { count: 0, bought: false },
      Grapes: { count: 0, bought: false },
    },
    Other: {
      Cherries: { count: 0, bought: false },
      Eggs: { count: 0, bought: false },
      Kiwi: { count: 0, bought: false },
      Strawberries: { count: 0, bought: false },
    },
  };

  /**
   * @description Increment the count of an item in the shopping list
   * @method incrementItemCount
   * @param category
   * @param item
   * @returns {void}
   */
  incrementItemCount(category: string, item: string): void {
    if (!this.items[category]?.[item] !== undefined) {
      this.items[category][item].count++;
      this.notifyObservers();
    }
  }

  /**
   * @description Decrement the count of an item in the shopping list
   * @method decrementItemCount
   * @param category
   * @param item
   * @returns {void}
   */
  decrementItemCount(category: string, item: string): void {
    if (this.items[category]?.[item]?.count > 0) {
      this.items[category][item].count--;
      this.notifyObservers();
    }
  }

  /**
   * @description Add item to the shopping list
   * @method addItem
   * @param category
   * @param item
   * @returns {void}
   */
  addItem(category: string, item: string): void {
    if (!this.items[category]) {
      this.items[category] = {};
    }
    if (!this.items[category][item]) {
      this.items[category][item] = { count: 0, bought: false };
      this.notifyObservers();
    }
  }

  /**
   * @description Remove item from the shopping list
   * @method removeItem
   * @param category
   * @param item
   * @returns {void}
   */
  removeItem(category: string, item: string): void {
    this.items[category][item].count = 0;
    this.notifyObservers();
  }

  /**
   * @description Toggle the bought status of an item
   * @method toggleItemBought
   * @param category
   * @param item
   * @returns {void}
   */
  toggleItemBought(category: string, item: string): void {
    if (this.items[category]?.[item] !== undefined) {
      this.items[category][item].bought = !this.items[category][item].bought;
      this.notifyObservers();
    }
  }

  /**
   * @description Update the category of an item
   * @method updateCategory
   * @param category
   * @param newCategory
   * @param item
   * @returns {void}
   */
  updateCategory(category: string, newCategory: string, item: string): void {
    if (this.items[category]?.[item] !== undefined) {
      const itemData = this.items[category][item];
      delete this.items[category][item];
      if (!this.items[newCategory]) {
        this.items[newCategory] = {};
      }
      this.items[newCategory][item] = itemData;
      this.notifyObservers();
    }
  }

  /**
   * @description Set the count of an item to one
   * @method setItemCountToOne
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
   * @description Get the count of an item
   * @method getItemCount
   * @param category
   * @param item
   * @returns {number} - Count of the item
   */
  getItemCount(category: string, item: string): number {
    return this.items[category]?.[item]?.count ?? 0;
  }

  /**
   * @description Get the bought status of an item
   * @method getItemBought
   * @param category
   * @param item
   * @returns {boolean} - Bought status of the item
   */
  getItemBought(category: string, item: string): boolean {
    return this.items[category]?.[item]?.bought ?? false;
  }

  /**
   * @description Get a list of all categories
   * @method getCategories
   * @param None
   * @returns {string[]} - List of categories
   */
  getCategories(): string[] {
    return Object.keys(this.items);
  }

  /**
   * @description Get a list of all items in a category
   * @method getItems
   * @param category
   * @returns {string[]} - List of items
   */
  getItems(category: string): string[] {
    return Object.keys(this.items[category] || {});
  }
}
