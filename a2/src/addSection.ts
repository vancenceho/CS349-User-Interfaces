import {
  SKButton,
  SKContainer,
  Layout,
  SKTextfield,
  SKKeyboardEvent,
  SKEvent,
} from "simplekit/imperative-mode";

import { Model } from "./model";
import { Observer } from "./observer";

/**
 * @class AddSection
 * @description Creates the "add" section which will be added to the vertical layout
 * @extends SKContainer
 * @implements Observer
 * @property {number} item - The default number of items to add
 * @property {SKTextfield} itemField - The textfield for the item name
 * @property {SKButton} itemNumberLabel - The label for the number of items to add
 * @property {SKButton} decrementButton - The button to decrement the number of items to add
 * @property {SKButton} incrementButton - The button to increment the number of items to add
 * @property {SKButton} addButton - The button to add the item to the shopping list
 * @method addItem - Add the item to the shopping list
 * @method setupEventListeners - Setup the event listeners for mouse and keyboard events
 * @method update - Update function from the Observer interface which refreshes the UI
 */
export class AddSection extends SKContainer implements Observer {
  private item: number = 1;

  itemField = new SKTextfield({});
  itemNumberLabel = new SKButton({ text: `${this.item}`, width: 30 });
  decrementButton = new SKButton({ text: "-", width: 30 });
  incrementButton = new SKButton({ text: "+", width: 30 });
  addButton = new SKButton({ text: "Add", width: 70 });

  /**
   * @description AddSection constructor
   * @param model - The model object
   */
  constructor(private model: Model) {
    super();
    this.layoutMethod = new Layout.FillRowLayout({ gap: 0 });
    this.itemField.width = 300;
    this.padding = 10;

    this.addChild(this.itemField);
    this.addChild(this.decrementButton);
    this.addChild(this.itemNumberLabel);
    this.addChild(this.incrementButton);
    this.addChild(this.addButton);

    // Add observer
    this.model.addObserver(this);

    this.setupEventListeners();

    // Event listeners
    this.decrementButton.addEventListener("action", () => {
      if (this.item > 1) {
        this.item = this.item - 1;
      }
      this.itemNumberLabel.text = `${this.item}`;
    });

    this.incrementButton.addEventListener("action", () => {
      if (this.item < 99) {
        this.item = this.item + 1;
        this.itemNumberLabel.text = `${this.item}`;
      }
    });

    this.addButton.addEventListener("action", () => {
      this.addItem();
    });
  }

  // Controller methods

  /**
   * @description Add the item to the shopping list
   * @method addItem
   * @param None
   * @returns {void}
   */
  private addItem(): void {
    const item = this.itemField.text.trim();
    if (item) {
      const categories = this.model.getCategories();
      let added = false;

      for (const category of categories) {
        if (this.model.getItems(category).includes(item)) {
          for (let i = 0; i < this.item; i++) {
            this.model.incrementItemCount(category, item);
          }
          added = true;
          break;
        }
      }

      if (!added) {
        this.model.addItem("Other", item);

        for (let j = 0; j < this.item; j++) {
          this.model.incrementItemCount("Other", item);
        }
      }
    }

    this.item = 1;
    this.itemNumberLabel.text = `${this.item}`;
    this.itemField.text = "";
  }

  /**
   * @description Setup the event listeners for mouse and keyboard events
   * @method setupEventListeners
   * @param None
   * @returns {void}
   */
  private setupEventListeners(): void {
    this.itemField.addEventListener("keydown", (event: SKEvent) => {
      const keyboardEvent = event as SKKeyboardEvent;
      if (this.itemField.textWidth >= 280) {
        this.itemField.width = this.itemField.textWidth + 20;
      } else {
        this.itemField.width = 300;
      }

      if (keyboardEvent.key === " " && this.itemField.textWidth == 0) {
        this.itemField.text = this.itemField.text.trim();
      }

      if (keyboardEvent.key === "Enter") {
        this.addItem();
      }
    });
  }

  /**
   * @description Update function from the Observer interface which refreshes the UI
   * @method update
   * @param None
   * @returns {void}
   */
  update(): void {
    this.itemNumberLabel.text = `${this.item}`;
    this.itemField.text = "";
  }
}
