/**
 * @import { Model } from "./model";
 * @import { SettingsView } from "./settingsSection";
 * @import { AddView } from "./addSection";
 * @import { ListView } from "./listSection";
 * @import { createButton } from "./utils";
 */
import { Model } from "./model";
import { SettingsView } from "./settingsSection";
import { AddView } from "./addSection";
import { ListView } from "./listSection";
import { createButton } from "./utils";

const model = new Model();

/**
 * @class Main
 * @private container: HTMLDivElement
 * @private element: HTMLElement
 * @private static instance: Main
 * @private addComponent: AddView
 * @private listComponent: ListView
 * @constructor model: Model
 * @method getElement(): HTMLElement
 * @method update(): void
 * @method createButton(text: string, width: number): HTMLButtonElement
 * @method updateUndoRedoButtons(undoButton: HTMLButtonElement, redoButton: HTMLButtonElement): void
 * @method static getInstance(): Main
 */
export class Main {
  private container: HTMLDivElement;
  private element: HTMLElement;
  private static instance: Main;
  private addComponent: AddView;
  private listComponent: ListView;

  constructor(private model: Model) {
    this.container = document.createElement("div");
    this.container.classList.add("stack-col-layout");
    this.element = this.container;
    Main.instance = this;

    this.addComponent = new AddView(model);
    this.listComponent = new ListView(model);

    this.update();
  }

  /**
   * @static getInstance
   * @description Get the singleton instance of Main
   * @param None
   * @returns {Main}
   */
  static getInstance(): Main {
    return Main.instance;
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
   * @method getElement
   * @description Get the root element
   * @param None
   * @returns {HTMLElement}
   */
  getElement(): HTMLElement {
    return this.element;
  }

  /**
   * @method update
   * @description Update the root element
   * @param None
   * @returns {void}
   */
  update(): void {
    this.container.innerHTML = "";

    const settingsDiv = document.createElement("div");
    settingsDiv.classList.add("fill-row-layout");
    settingsDiv.style.padding = "8px";
    this.container.appendChild(settingsDiv);

    const editButton = this.createButton("✍🏻 Edit Categories", 128);
    settingsDiv.appendChild(editButton);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.style.marginLeft = "auto";
    settingsDiv.appendChild(buttonsDiv);

    const undoButton = this.createButton("↩️ Undo", 80);
    undoButton.style.marginLeft = "8px";
    buttonsDiv.appendChild(undoButton);

    const redoButton = this.createButton("↪️ Redo", 80);
    redoButton.style.marginLeft = "8px";
    buttonsDiv.appendChild(redoButton);

    // event listeners
    editButton.addEventListener("click", () => {
      const settingsView = new SettingsView(this.model);
      settingsDiv.innerHTML = "";
      settingsDiv.appendChild(settingsView.getElement());
    });

    undoButton.addEventListener("click", () => {
      this.model.undo();
      this.updateUndoRedoButtons(undoButton, redoButton);
    });

    redoButton.addEventListener("click", () => {
      this.model.redo();
      this.updateUndoRedoButtons(undoButton, redoButton);
    });

    this.updateUndoRedoButtons(undoButton, redoButton);

    const editPanel = document.createElement("div");
    editPanel.classList.add("stack-col-layout");
    this.container.appendChild(editPanel);
    editPanel.appendChild(this.addComponent.getElement());
    editPanel.appendChild(this.listComponent.getElement());

    this.addComponent.update();
    this.listComponent.update();

    const appElement = document.getElementById("app");
    if (appElement) {
      appElement.style.backgroundColor = "whitesmoke";
    }
  }

  /**
   * @privatemethod updateUndoRedoButtons
   * @description Update the undo and redo buttons
   * @param undoButton
   * @param redoButton
   * @returns {void}
   */
  private updateUndoRedoButtons(
    undoButton: HTMLButtonElement,
    redoButton: HTMLButtonElement
  ): void {
    undoButton.disabled = !this.model.canUndo();
    redoButton.disabled = !this.model.canRedo();
    if (redoButton.disabled) {
      redoButton.style.backgroundColor = "#e0e0e0";
      redoButton.style.borderColor = "#e0e0e0";
    }
  }
}

/**
 * @constant undoButton
 * @description Create an undo button
 * @param None
 * @returns {HTMLButtonElement}
 * @event undoButton.addEventListener
 */
const undoButton = document.createElement("button");
if (undoButton) {
  undoButton.addEventListener("click", () => {
    model.undo();
  });
}

// Create the root element
const root = new Main(model);
const rootElement = document.getElementById("app");

// Append the root element to the app element
if (rootElement) {
  rootElement.appendChild(root.getElement());
} else {
  console.error("Root element not found");
}
