import {
  startSimpleKit,
  setSKRoot,
  SKContainer,
  SKButton,
} from "simplekit/imperative-mode";

import { Model } from "./model";
import { StackLayout } from "./layout";
import { AddSection } from "./addSection";
import { ListSection } from "./listSection";
import { SettingsView } from "./settingsSection";

// Create the model
const model = new Model();

/**
 * @class Main
 * @description The main view of the application
 * @extends SKContainer
 * @property {Model} model - The model object
 */
export class Main extends SKContainer {
  /**
   * @description Main constructor
   * @param model - The model object
   */
  constructor(model: Model) {
    super();
    const container = new SKContainer();
    this.addChild(container);

    // Construct EDIT CATEGORIES button
    const settingsButton = new SKButton({
      text: "Edit Categories",
      width: 125,
      padding: 10,
      margin: 10,
    });

    container.addChild(settingsButton);

    // Event listener for EDIT CATEGORIES button
    settingsButton.addEventListener("action", () => {
      const settingsView = new SettingsView(model);
      container.clearChildren();
      container.addChild(settingsView);
    });

    // add sections to layout
    container.layoutMethod = new StackLayout();
    container.addChild(new AddSection(model));
    container.addChild(new ListSection(model));
  }
}

const root = new Main(model);
root.id = "root";
setSKRoot(root);

startSimpleKit();
