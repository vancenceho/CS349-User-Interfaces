/**
 * @import { Model } from "./model";
 * @import { Main } from "./main";
 * @import { createButton } from "./utils";
 */
import { Model } from "./model";
import { Main } from "./main";
import { createButton } from "./utils";

/**
 * @class SettingsView
 * @description Create the settings view for the shopping list
 * @property {Model} model - The model for the shopping list
 * @property {HTMLElement} container - The container for the settings view
 * @property {HTMLElement} contentContainer - The content container for the settings view
 * @property {HTMLButtonElement} applyButton - The apply button for the settings view
 * @property {HTMLButtonElement} cancelButton - The cancel button for the settings view
 * @method createButton - Create a button element
 * @method closeOverlay - Close the overlay
 * @method getElement - Get the element
 * @param {Model} model - The model for the shopping list
 */
export class SettingsView {
  private model: Model;
  private container: HTMLElement;
  private contentContainer: HTMLElement;
  private applyButton: HTMLButtonElement;
  private cancelButton: HTMLButtonElement;

  /**
   * @constructor SettingsView
   * @param model
   */
  constructor(model: Model) {
    console.log("SettingsView constructor");
    this.model = model;

    this.container = document.createElement("div");
    this.container.classList.add("overlay");
    this.container.style.position = "fixed";
    this.container.style.top = "0";
    this.container.style.left = "0";
    this.container.style.width = "100%";
    this.container.style.height = "100%";
    this.container.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    this.container.style.zIndex = "1000";
    this.container.style.display = "flex";
    this.container.style.justifyContent = "center";
    this.container.style.alignItems = "center";
    this.container.style.backdropFilter = "blur(4px)";
    this.container.style.fontFamily = "Arial, Helvetica, sans-serif";

    this.contentContainer = document.createElement("div");
    this.contentContainer.style.backgroundColor = "whitesmoke";
    this.contentContainer.style.padding = "8px";
    this.contentContainer.style.margin = "40px";
    this.contentContainer.style.border = "1px solid black";
    this.contentContainer.style.borderRadius = "8px";
    this.contentContainer.style.boxShadow = "0 0 5px black";
    this.contentContainer.style.display = "flex";
    this.contentContainer.style.flexDirection = "column";
    this.contentContainer.style.maxHeight = "calc(100% - 80px)";
    this.contentContainer.style.overflow = "auto";

    const title = document.createElement("div");
    title.textContent = "✍🏻 Edit Categories";
    title.style.textAlign = "center";
    title.style.marginBottom = "8px";
    this.contentContainer.appendChild(title);

    const itemsContainer = document.createElement("div");
    itemsContainer.style.display = "flex";
    itemsContainer.style.flexWrap = "wrap";
    itemsContainer.style.gap = "4px";
    itemsContainer.style.justifyContent = "left";
    this.contentContainer.appendChild(itemsContainer);

    const allItems: { item: string; category: string }[] = [];
    for (const category of this.model.getCategories()) {
      for (const item of this.model.getItems(category)) {
        allItems.push({ item, category });
      }
    }

    allItems.sort((a, b) => a.item.localeCompare(b.item));

    for (const { item, category } of allItems) {
      const itemContainer = document.createElement("div");
      itemContainer.style.display = "flex";
      itemContainer.style.alignItems = "center";
      itemContainer.style.gap = "4px";

      const truncatedItem =
        item.length > 10 ? item.substring(0, 7) + "..." : item;
      const itemLabel = document.createElement("span");
      itemLabel.textContent = truncatedItem;
      itemLabel.style.width = "80px";
      itemLabel.style.textAlign = "right";

      const categorySelect = document.createElement("select");
      categorySelect.style.width = "160px";
      categorySelect.style.padding = "4px";

      for (const categoryName of this.model.getCategories()) {
        const categoryInfo = this.model.getCategoryInfo(categoryName);
        if (!categoryInfo) continue;

        const option = document.createElement("option");
        option.value = categoryName;
        option.textContent = `${categoryName === category ? "✔️ " : ""}${
          categoryInfo.icon
        } ${categoryInfo.name}`;
        option.selected = categoryName === category;
        categorySelect.appendChild(option);
      }

      itemContainer.appendChild(itemLabel);
      itemContainer.appendChild(categorySelect);
      itemsContainer.appendChild(itemContainer);
    }

    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "flex-end";
    buttonContainer.style.gap = "8px";
    buttonContainer.style.marginTop = "8px";

    this.applyButton = this.createButton("✅ Apply", 80);
    this.cancelButton = this.createButton("🚫 Cancel", 80);

    buttonContainer.appendChild(this.applyButton);
    buttonContainer.appendChild(this.cancelButton);

    this.contentContainer.appendChild(buttonContainer);

    this.container.appendChild(this.contentContainer);

    this.applyButton.addEventListener("click", () => {
      const selects = itemsContainer.querySelectorAll("select");
      selects.forEach((select, index) => {
        const item = allItems[index].item;
        const newCategory = (select as HTMLSelectElement).value;
        if (newCategory !== allItems[index].category) {
          this.model.updateCategory(
            allItems[index].category,
            newCategory,
            item
          );
        }
      });
      this.closeOverlay();
    });

    this.cancelButton.addEventListener("click", () => {
      this.closeOverlay();
    });

    this.container.addEventListener("click", (event) => {
      if (event.target === this.container) {
        this.closeOverlay();
      }
    });
  }

  /**
   * @privatemethod createButton
   * @description Create a button element
   * @param text
   * @param width
   * @returns {HTMLButtonElement} - Button element
   */
  private createButton(text: string, width: number): HTMLButtonElement {
    return createButton(text, width);
  }

  /**
   * @privatemethod closeOverlay
   * @description Close the overlay
   * @returns {void}
   */
  private closeOverlay() {
    const appElement = document.getElementById("app");
    if (appElement) {
      appElement.innerHTML = "";
      const root = Main.getInstance();
      root.update();
      appElement.appendChild(root.getElement());
    }
  }

  /**
   * @method getElement
   * @description Get the element
   * @param None
   * @returns {HTMLElement} - The element
   */
  getElement(): HTMLElement {
    return this.container;
  }
}
