import {
  SKContainer,
  SKButton,
  Layout,
  SKLabel,
} from "simplekit/imperative-mode";

import { Main } from "./main";
import { Model } from "./model";
import { StackLayout } from "./layout";
import { SKRadioButton } from "./radioButton";

/**
 * @class SettingsView
 * @description Creates the "settings" view which will be added to the vertical layout
 * @extends SKContainer
 * @property {Model} model - The model object
 * @property {number} defaultColumns - The default number of columns
 * @property {SKButton} column - The label for the number of columns
 * @property {SKButton} decrementButton - The button to decrement the number of columns
 * @property {SKButton} incrementButton - The button to increment the number of columns
 * @property {SKButton} returnButton - The button to return to the main view
 * @method updateItems - Update the items in the settings view
 * @returns {SettingsView}
 */
export class SettingsView extends SKContainer {
  private model: Model;
  private defaultColumns: number = 3;

  column = new SKButton({
    text: `${this.defaultColumns}`,
    width: 25,
    margin: 0,
  });
  decrementButton = new SKButton({ text: "-", width: 30 });
  incrementButton = new SKButton({ text: "+", width: 30 });
  returnButton = new SKButton({ text: "Return", width: 150 });

  /**
   * @description SettingsView constructor
   * @param model - The model object
   */
  constructor(model: Model) {
    super();
    this.model = model;
    this.layoutMethod = new StackLayout();

    const topContainer = new SKContainer();
    topContainer.layoutMethod = new Layout.FillRowLayout({ gap: 0 });
    topContainer.margin = 10;

    topContainer.addChild(this.returnButton);
    topContainer.addChild(this.decrementButton);
    topContainer.addChild(this.column);
    topContainer.addChild(this.incrementButton);

    this.addChild(topContainer);

    // Event Listeners

    // returnButton event listener
    this.returnButton.addEventListener("action", () => {
      const main = new Main(this.model);
      this.clearChildren();
      this.addChild(main);
    });

    // incrementButton event listener
    this.incrementButton.addEventListener("action", () => {
      const totalItems = this.model
        .getCategories()
        .reduce(
          (count, category) => count + this.model.getItems(category).length,
          0
        );
      if (this.defaultColumns < totalItems) {
        this.defaultColumns = this.defaultColumns + 1;
      }
      this.column.text = `${this.defaultColumns}`;
      this.updateItems();
    });

    // decrementButton event listener
    this.decrementButton.addEventListener("action", () => {
      if (this.defaultColumns > 1) {
        this.defaultColumns = this.defaultColumns - 1;
      }
      this.column.text = `${this.defaultColumns}`;
      this.updateItems();
    });

    // Update the items
    this.updateItems();
  }

  /**
   * @description Update the items in the settings view
   * @method updateItems
   * @param None
   * @returns {void}
   */
  private updateItems(): void {
    this.clearChildren();

    // Construct the top container for the buttons
    const topContainer = new SKContainer();
    topContainer.layoutMethod = new Layout.FillRowLayout({ gap: 0 });
    topContainer.margin = 10;

    topContainer.addChild(this.returnButton);
    topContainer.addChild(this.decrementButton);
    topContainer.addChild(this.column);
    topContainer.addChild(this.incrementButton);

    this.addChild(topContainer);

    // Construct the items row container
    const itemsRowContainer = new SKContainer();
    itemsRowContainer.layoutMethod = new Layout.WrapRowLayout({ gap: 10 });

    this.addChild(itemsRowContainer);

    // Populate the items row container
    const itemsContainer: SKContainer[] = [];
    for (let i = 0; i < this.defaultColumns; i++) {
      const itemContainer = new SKContainer();
      itemContainer.layoutMethod = new Layout.FillRowLayout();
      itemsRowContainer.addChild(itemContainer);
      itemsContainer.push(itemContainer);
    }

    const items: { category: string; item: string }[] = [];
    for (const category of this.model.getCategories()) {
      for (const item of this.model.getItems(category)) {
        items.push({ category, item });
      }
    }

    items.sort((a, b) => a.item.localeCompare(b.item));

    // Add items to the containers
    const addItemsToContainer = (
      items: { category: string; item: string }[],
      container: SKContainer
    ) => {
      for (const { category, item } of items) {
        const itemContainer = new SKContainer();
        itemContainer.layoutMethod = new Layout.FillRowLayout({ gap: 5 });
        itemContainer.margin = 10;

        const itemLabelContainer = new SKContainer();
        itemLabelContainer.layoutMethod = new Layout.FillRowLayout({ gap: 5 });

        const truncatedLabel =
          item.length > 20 ? item.substring(0, 17) + "..." : item;
        const itemLabel = new SKLabel({
          text: truncatedLabel,
          width: 150,
          align: "centre",
        });

        // Construct the radiobox container
        const radioboxContainer = new SKContainer();
        radioboxContainer.layoutMethod = new StackLayout();
        radioboxContainer.border = "1px solid black";
        radioboxContainer.padding = 5;

        for (const cat of this.model.getCategories()) {
          const categoryContainer = new SKContainer();
          categoryContainer.layoutMethod = new Layout.FillRowLayout({ gap: 5 });
          categoryContainer.margin = 5;

          const radiobox = new SKRadioButton({
            checked: cat === category,
          });
          const categoryLabel = new SKLabel({
            text: cat,
            width: 100,
            align: "left",
          });

          // Event listener for radiobox
          radiobox.addEventListener("action", () => {
            this.model.updateCategory(category, cat, item);
            this.updateItems();
          });

          categoryContainer.addChild(radiobox);
          categoryContainer.addChild(categoryLabel);
          radioboxContainer.addChild(categoryContainer);
        }

        itemLabelContainer.addChild(itemLabel);
        itemLabelContainer.addChild(radioboxContainer);

        itemContainer.addChild(itemLabelContainer);
        container.addChild(itemContainer);
      }
    };

    let containerIndex = 0;

    // Add items to the containers
    for (const item of items) {
      addItemsToContainer([item], itemsContainer[containerIndex]);
      containerIndex = (containerIndex + 1) % this.defaultColumns;
    }
  }
}
