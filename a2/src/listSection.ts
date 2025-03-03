import {
  SKButton,
  SKContainer,
  Layout,
  SKLabel,
  SKMouseEvent,
  SKEvent,
} from "simplekit/imperative-mode";

import { Model } from "./model";
import { StackLayout } from "./layout";
import { Observer } from "./observer";

/**
 * @class ListSection
 * @description Creates the "list" section which will be added to the vertical layout
 * @extends SKContainer
 * @implements Observer
 * @property {SKContainer} list - The container for the list of items
 * @method update - Update function from the Observer interface which refreshes the UI
 */
export class ListSection extends SKContainer implements Observer {
  list = new SKContainer();

  /**
   * @description ListSection constructor
   * @param model - The model object
   *
   */
  constructor(private model: Model) {
    super();
    this.list.padding = 10;
    this.list.layoutMethod = new Layout.WrapRowLayout({ gap: 10 });
    this.addChild(this.list);
    this.model.addObserver(this);
    this.update();
  }

  /**
   * @description Update function from the Observer interface which refreshes the UI
   * @method update
   * @param None
   * @returns {void}
   */
  update(): void {
    this.list.clearChildren();

    // Category colors
    const categoryColors: { [key: string]: string } = {
      Dairy: "hsl(220, 75%, 75%)",
      Frozen: "hsl(220, 90%, 95%)",
      Fruits: "hsl(140, 75%, 75%)",
      Other: "hsl(0, 0%, 90%)",
    };

    // Loop through the categories and items
    for (const category of this.model.getCategories()) {
      const catContainer = new SKContainer();
      catContainer.layoutMethod = new StackLayout();
      catContainer.fill = categoryColors[category] || "white";
      catContainer.padding = 10;
      catContainer.width = 475;

      // Add category label
      const catLabel = new SKLabel({ text: `--- ${category} ---` });
      catLabel.font = "10pt sans-serif";
      catContainer.addChild(catLabel);

      // Loop through the items
      for (const item of this.model.getItems(category)) {
        const itemCount = this.model.getItemCount(category, item);

        // If the item count is greater than 0, add the item to the list
        if (itemCount > 0) {
          const container = new SKContainer();

          // Construct the item container
          container.layoutMethod = new Layout.FillRowLayout();
          container.fill = categoryColors[category] || "white";
          container.padding = 10;
          container.width = catContainer.width - 20;

          const truncatedLabel =
            item.length > 20 ? item.substring(0, 17) + "..." : item;
          const itemLabel = new SKLabel({
            text: truncatedLabel,
            width: 150,
            align: "centre",
          });
          const itemNumberButtom = new SKButton({
            text: `${itemCount}`,
            width: 25,
          });

          // Construct the buttons
          const decrementButton = new SKButton({ text: "-", width: 30 });
          const incrementButton = new SKButton({ text: "+", width: 30 });
          const removeButton = new SKButton({ text: "X", width: 30 });
          const space = new SKLabel({ text: "", width: 75, align: "centre" });

          itemLabel.font = "12pt sans-serif";

          let itemBought = false;

          // Event listeners

          // Double click event listener
          container.addEventListener("dblclick", (event: SKEvent) => {
            const mouseEvent = event as SKMouseEvent;
            if (
              mouseEvent instanceof SKMouseEvent &&
              mouseEvent.type === "dblclick"
            ) {
              itemBought = !itemBought;
              container.fill = itemBought
                ? "rgb(91, 91, 91)"
                : categoryColors[category] || "white";
              if (itemBought) {
                container.clearChildren();
                container.addChild(itemLabel);
                container.addChild(space);
                container.addChild(removeButton);
              } else {
                container.clearChildren();
                container.addChild(itemLabel);
                container.addChild(decrementButton);
                container.addChild(itemNumberButtom);
                container.addChild(incrementButton);
                container.addChild(removeButton);
              }
            }
          });

          // decrementButton event listener
          decrementButton.addEventListener("action", () => {
            this.model.decrementItemCount(category, item);
          });
          // incrementButton event listener
          incrementButton.addEventListener("action", () => {
            this.model.incrementItemCount(category, item);
          });
          // itemNumberButtom event listener
          itemNumberButtom.addEventListener("action", () => {
            this.model.setItemCountToOne(category, item);
          });
          // removeButton event listener
          removeButton.addEventListener("action", () => {
            this.model.removeItem(category, item);
          });

          container.addChild(itemLabel);
          container.addChild(decrementButton);
          container.addChild(itemNumberButtom);
          container.addChild(incrementButton);
          container.addChild(removeButton);

          catContainer.addChild(container);
        }
      }
      this.list.addChild(catContainer);
    }
  }
}
