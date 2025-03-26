/**
 * @import { Model } from "./model";
 * @import { AddView } from "./addSection";
 * @import { createButton } from "./utils";
 */
import { Observer } from "./observer";
import { Model } from "./model";
import { createButton } from "./utils";

/**
 * @class ListView
 * @implements Observer
 * @private list: HTMLElement
 * @private container: HTMLElement
 * @constructor model: Model
 * @method createButton(text: string, width: number): HTMLButtonElement
 * @method update(): void
 * @method getElement(): HTMLElement
 * @method update(): void
 */
export class ListView implements Observer {
  private list: HTMLElement;
  private container: HTMLElement;

  constructor(private model: Model) {
    this.container = document.createElement("div");
    this.container.className = "section-list-container";

    this.list = document.createElement("div");
    this.list.classList.add("wrap-row-layout");
    this.list.className = "section-list";
    this.container.appendChild(this.list);

    this.model.addObserver(this);
    this.update();

    window.addEventListener("resize", () => {
      this.update();
    });
  }

  /**
   * @privatemethod createButton
   * @description Create a button element
   * @param text
   * @param width
   * @returns {HTMLButtonElement}
   */
  private createButton(text: string, width: number): HTMLButtonElement {
    return createButton(text, width);
  }

  /**
   * @method update
   * @description Update the list view
   * @param None
   * @returns {void}
   */
  update(): void {
    this.list.innerHTML = "";

    for (const categoryName of this.model.getCategories()) {
      const categoryInfo = this.model.getCategoryInfo(categoryName);
      if (!categoryInfo) continue;

      const categoryContainer = document.createElement("div");
      categoryContainer.style.backgroundColor = categoryInfo.colour;
      categoryContainer.style.width = `${window.innerWidth - 20}px`;
      categoryContainer.style.borderBottomLeftRadius = "8px";
      categoryContainer.style.borderBottomRightRadius = "8px";
      categoryContainer.style.boxSizing = "border-box";

      const categoryContainerDarken = document.createElement("div");
      categoryContainerDarken.classList.add("stack-col-layout");
      categoryContainerDarken.className = "section-list-darken";
      categoryContainer.style.backgroundColor = categoryInfo.colour;
      categoryContainerDarken.style.width = `${window.innerWidth - 20}px`;
      categoryContainerDarken.style.padding = "4px";
      categoryContainerDarken.style.backgroundColor = "rgba(0, 0, 0, 0.15)";
      categoryContainerDarken.style.borderBottomLeftRadius = "8px";
      categoryContainerDarken.style.borderBottomRightRadius = "8px";
      categoryContainerDarken.style.boxSizing = "border-box";

      const categoryLabel = document.createElement("span");
      categoryLabel.textContent = `${categoryInfo.icon}${categoryInfo.name}`;
      categoryContainerDarken.appendChild(categoryLabel);
      categoryContainer.appendChild(categoryContainerDarken);

      const items = Array.from(this.model.getItems(categoryName)).sort((a, b) =>
        a.toLowerCase().localeCompare(b.toLowerCase())
      );

      const subContainer = document.createElement("div");
      subContainer.classList.add("stack-col-layout");
      subContainer.style.backgroundColor = categoryInfo.colour;
      subContainer.style.borderLeft = `4px solid ${categoryInfo.colour}`;
      subContainer.style.width = `${window.innerWidth - 20 - 8}px`;
      subContainer.style.borderBottomLeftRadius = "8px";
      subContainer.style.borderBottomRightRadius = "8px";
      subContainer.style.padding = "4px";
      subContainer.style.boxSizing = "border-box";

      for (const item of items) {
        const itemCount = this.model.getItemCount(categoryName, item);
        if (itemCount > 0) {
          const container = document.createElement("div");
          container.classList.add("fill-row-layout");
          container.style.borderBottomLeftRadius = "8px";
          container.style.borderBottomRightRadius = "8px";
          container.style.boxSizing = "border-box";

          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.style.marginRight = "8px";
          checkbox.style.transform = "scale(1.5)";

          const truncatedItem =
            item.length > 30 ? item.substring(0, 27) + "..." : item;
          const itemLabel = document.createElement("span");
          itemLabel.textContent = `${truncatedItem} (${itemCount})`;
          itemLabel.style.width = "160px";
          itemLabel.style.minWidth = "160px";
          itemLabel.style.flexGrow = "1";
          itemLabel.style.textAlign = "left";

          const labelContainer = document.createElement("div");
          labelContainer.style.display = "flex";
          labelContainer.style.alignItems = "center";
          labelContainer.appendChild(checkbox);
          labelContainer.appendChild(itemLabel);

          const buttonContainer = document.createElement("div");
          buttonContainer.style.display = "flex";
          buttonContainer.style.flexWrap = "wrap";
          buttonContainer.style.gap = "8px";
          buttonContainer.style.alignItems = "auto";

          const stepper = document.createElement("input");
          stepper.type = "number";
          stepper.value = `${itemCount}`;
          stepper.min = "1";
          stepper.style.width = "30px";
          stepper.style.textAlign = "center";
          stepper.addEventListener("change", () => {
            const newCount = parseInt(stepper.value);
            if (newCount > 0) {
              this.model.setCount(categoryName, item, newCount);
              resetButton.disabled = newCount === 1;
              if (resetButton.disabled) {
                resetButton.style.backgroundColor = "#e0e0e0";
                resetButton.style.borderColor = "#e0e0e0";
              } else {
                resetButton.style.backgroundColor = "";
                resetButton.style.borderColor = "";
              }
            } else {
              stepper.value = `${itemCount}`;
            }
          });

          const resetButton = this.createButton("🔄", 50);
          resetButton.disabled = itemCount === 1;

          const removeButton = this.createButton("🗑️", 50);

          buttonContainer.appendChild(stepper);
          buttonContainer.appendChild(resetButton);
          buttonContainer.appendChild(removeButton);

          let isBought = this.model.getItemBought(categoryName, item);
          checkbox.checked = isBought;
          if (isBought) {
            itemLabel.style.textDecoration = "line-through";
            stepper.style.display = "none";
            resetButton.style.display = "none";
          }

          checkbox.addEventListener("change", () => {
            isBought = checkbox.checked;
            this.model.toggleItemBought(categoryName, item);
            container.style.backgroundColor = isBought
              ? "rgba(91, 91, 91)"
              : categoryInfo.colour;
            itemLabel.style.textDecoration = isBought ? "line-through" : "none";
            stepper.style.display = isBought ? "none" : "inline-block";
            resetButton.style.display = isBought ? "none" : "inline-block";
          });

          resetButton.addEventListener("click", () => {
            this.model.resetCount(categoryName, item);
            stepper.value = "1";
            resetButton.disabled = true;

            if (resetButton.disabled) {
              resetButton.style.backgroundColor = "#e0e0e0";
              resetButton.style.borderColor = "#e0e0e0";
            }
          });

          removeButton.addEventListener("click", () =>
            this.model.removeItem(categoryName, item)
          );

          container.appendChild(labelContainer);
          container.appendChild(buttonContainer);
          subContainer.appendChild(container);
          categoryContainerDarken.appendChild(subContainer);
        }
      }
      this.list.appendChild(categoryContainer);
    }
  }

  /**
   * @method getElement
   * @description Get the list view element
   * @param None
   * @returns {HTMLElement}
   */
  getElement(): HTMLElement {
    return this.container;
  }
}
