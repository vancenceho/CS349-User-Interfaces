/**
 * @import { Model } from "./model";
 * @import { Observer } from "./observer";
 * @import { createButton } from "./utils";
 */
import { Model } from "./model";
import { Observer } from "./observer";
import { createButton } from "./utils";

/**
 * @class AddView
 * @implements Observer
 * @description A class that represents the AddView section of the application
 * @private quantity: number
 * @private container: HTMLElement
 * @private itemField: HTMLInputElement
 * @private itemNumberInput: HTMLInputElement
 * @private resetButton: HTMLButtonElement
 * @private addButton: HTMLButtonElement
 * @method createTextField(width: number): HTMLInputElement
 * @method createStepper(width: number): HTMLInputElement
 * @method validateItemName(itemName: string): boolean
 * @method setUpEventListeners(): void
 * @method adjustItemFieldWidth(): void
 * @method addItem(): void
 * @method update(): void
 * @method getElement(): HTMLElement
 */
export class AddView implements Observer {
  private quantity: number = 1;
  private container: HTMLElement;
  private itemField: HTMLInputElement;
  private itemNumberInput: HTMLInputElement;
  private resetButton: HTMLButtonElement;
  private addButton: HTMLButtonElement;

  constructor(private model: Model) {
    this.container = document.createElement("div");
    this.container.classList.add("fill-row-layout");
    this.container.style.padding = "8px";
    this.container.style.borderTop = "1px solid #c0c0c0";
    this.container.style.borderBottom = "1px solid #c0c0c0";
    this.container.style.display = "flex";
    this.container.style.gap = "8px";
    this.container.style.fontFamily = "Arial, Helvetica, sans-serif";

    this.itemField = this.createTextField(160);
    this.itemField.placeholder = "Item Name";

    this.itemNumberInput = this.createStepper(30);
    this.itemNumberInput.value = `${this.quantity}`;

    this.addButton = createButton("➕", 50);
    this.addButton.disabled = true;
    if (this.addButton.disabled) {
      this.addButton.style.backgroundColor = "#e0e0e0";
      this.addButton.style.borderColor = "#e0e0e0";
    }

    this.resetButton = createButton("🔄", 50);
    this.resetButton.disabled = true;
    if (this.resetButton.disabled) {
      this.resetButton.style.backgroundColor = "#e0e0e0";
      this.resetButton.style.borderColor = "#e0e0e0";
    }

    this.container.appendChild(this.itemField);
    this.container.appendChild(this.itemNumberInput);
    this.container.appendChild(this.resetButton);
    this.container.appendChild(this.addButton);

    // Add observer
    this.model.addObserver(this);

    // Event listeners
    this.setUpEventListeners();

    this.addButton.addEventListener("click", () => {
      this.addItem();
    });

    this.resetButton.addEventListener("click", () => {
      this.quantity = 1;
      this.itemNumberInput.value = `${this.quantity}`;
      this.resetButton.style.backgroundColor = "#e0e0e0";
      this.resetButton.style.borderColor = "#e0e0e0";
      this.resetButton.disabled = true;
    });

    this.itemNumberInput.addEventListener("input", () => {
      this.quantity = parseInt(this.itemNumberInput.value);
      this.resetButton.disabled = this.quantity === 1;
      if (this.resetButton.disabled) {
        this.resetButton.style.backgroundColor = "#e0e0e0";
        this.resetButton.style.borderColor = "#e0e0e0";
      } else {
        this.resetButton.style.backgroundColor = "";
        this.resetButton.style.borderColor = "";
      }
    });

    this.itemField.addEventListener("input", () => {
      const isValid = this.validateItemName(this.itemField.value);
      this.addButton.disabled = !isValid;
    });

    this.itemField.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !this.addButton.disabled) {
        this.addButton.click();
      }
    });

    window.addEventListener("resize", () => {
      this.adjustItemFieldWidth();
    });
    this.adjustItemFieldWidth();
  }

  /**
   * @privatemethod createTextField
   * @description Creates a text field with the specified width
   * @param width
   * @returns {HTMLInputElement}
   */
  private createTextField(width: number): HTMLInputElement {
    const input = document.createElement("input");
    input.type = "text";
    input.style.width = `${width}px`;
    input.placeholder = "Item Name";
    return input;
  }

  /**
   * @privatemethod createStepper
   * @description Creates a number input field with the specified width
   * @param width
   * @returns {HTMLInputElement}
   */
  private createStepper(width: number): HTMLInputElement {
    const input = document.createElement("input");
    input.type = "number";
    input.style.width = `${width}px`;
    input.min = "1";
    input.max = "24";
    input.value = "1";
    return input;
  }

  /**
   * @privatemethod validateItemName
   * @description Validates the item name
   * @param itemName
   * @returns {boolean}
   */
  private validateItemName(itemName: string): boolean {
    const trimmedName = itemName.trim();
    const regex = /^[A-Za-z\s]+$/;
    return (
      regex.test(trimmedName) && trimmedName.length > 0 && itemName[0] != " "
    );
  }

  /**
   * @privatemethod setUpEventListeners
   * @description Sets up event listeners for the AddView section
   * @param none
   * @returns {void}
   */
  private setUpEventListeners(): void {
    this.itemField.addEventListener("input", () => {
      this.validateItemName(this.itemField.value);
    });

    this.itemField.addEventListener("keydown", (event: KeyboardEvent) => {
      this.adjustItemFieldWidth();
      if (event.key === "Enter") {
        this.addItem();
        event.preventDefault();
      }
    });

    this.itemField.addEventListener("keyup", () => {
      this.adjustItemFieldWidth();
    });
  }

  /**
   * @privatemethod adjustItemFieldWidth
   * @description Adjusts the width of the item field
   * @param none
   * @returns {void}
   */
  private adjustItemFieldWidth(): void {
    const minWidth = 160;
    let availableWidth =
      this.container.offsetWidth -
      this.itemNumberInput.offsetWidth -
      this.resetButton.offsetWidth -
      this.addButton.offsetWidth -
      24; // accounting for gaps
    availableWidth = Math.max(minWidth, availableWidth);
    this.itemField.style.width = `${availableWidth}px`;
  }

  /**
   * @privatemethod addItem
   * @description Adds an item to the list
   * @param itemName
   * @param quantity
   * @returns {void}
   */
  private addItem(): void {
    const itemName = this.itemField.value;
    if (itemName) {
      const categories = this.model.getCategories();
      let added = false;

      for (const category of categories) {
        if (this.model.getItems(category).includes(itemName)) {
          this.model.addItemCount(category, itemName, this.quantity);
          added = true;
          break;
        }
      }
      if (!added) {
        this.model.addItemCount("Other", itemName, this.quantity);
      }
    }

    this.quantity = 1;
    this.itemNumberInput.value = `${this.quantity}`;
    this.resetButton.disabled = true;
    this.itemField.value = "";
    this.itemField.placeholder = "Item Name";
  }

  /**
   * @todo: Implement the update function if necessary
   * @method update
   * @description Updates the AddView section
   * @param none
   * @returns {void}
   */
  update(): void {
    console.log("Section updated");
  }

  /**
   * @method getElement
   * @description Returns the container element
   * @param none
   * @returns {HTMLElement}
   */
  getElement(): HTMLElement {
    return this.container;
  }
}
