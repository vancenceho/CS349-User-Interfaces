import {
  SKElement,
  SKElementProps,
  SKEvent,
  SKMouseEvent,
  Style,
} from "simplekit/imperative-mode";

/**
 * @type SKRadioButtonProps
 * @extends SKElementProps
 * @description The properties for the SKRadioButton class
 * @property {boolean} checked - The checked state of the radio button
 * @returns {SKRadioButtonProps}
 */
export type SKRadioButtonProps = SKElementProps & { checked?: boolean };

/**
 * @class SKRadioButton
 * @description The properties for the SKRadioButton class
 * @extends SKElementProps
 * @property {string} state - The state of the radio button
 * @property {boolean} checked - The checked state of the radio button
 * @method handleMouseEvent - Handles the mouse events for the radio button
 * @method draw - Draws the radio button
 * @method toString - Returns the string representation of the radio button
 * @returns {SKRadioButton}
 */
export class SKRadioButton extends SKElement {
  /**
   * @description SKRadioButton constructor
   * @param {SKRadioButtonProps} checked - The checked state of the radio button
   */
  constructor({ checked = false, ...elementProps }: SKRadioButtonProps = {}) {
    super(elementProps);
    this.checked = checked;
    if (!this.width) this.width = Style.minElementSize - 10;
    if (!this.height) this.height = Style.minElementSize - 10;
  }

  state: "idle" | "hover" | "down" = "idle";

  checked: boolean;

  /**
   * @description Handles the mouse events for the radio button
   * @method handleMouseEvent
   * @param {SKMouseEvent} event - The mouse event
   * @returns {boolean} - Returns true if the event was handled
   */
  handleMouseEvent(event: SKMouseEvent): boolean {
    switch (event.type) {
      case "mousedown":
        this.state = "down";
        break;
      case "mouseup":
        this.state = "hover";
        this.checked = !this.checked;
        return this.sendEvent({
          source: this,
          timeStamp: event.timeStamp,
          type: "action",
        } as SKEvent);
        break;
      case "mouseenter":
        this.state = "hover";
        break;
      case "mouseexit":
        this.state = "idle";
        break;
    }
    return false;
  }

  /**
   * @description Draws the radio button
   * @method draw
   * @param {CanvasRenderingContext2D} gc
   * @returns {void}
   */
  draw(gc: CanvasRenderingContext2D): void {
    gc.save();

    const width = this.paddingBox.width;
    const height = this.paddingBox.height;
    const radius = Math.min(width, height) / 2;

    gc.translate(this.margin, this.margin);

    if (this.state == "hover" || this.state == "down") {
      gc.beginPath();
      gc.arc(this.x + radius, this.y + radius, radius, 0, 2 * Math.PI);
      gc.strokeStyle = Style.highlightColour;
      gc.lineWidth = 8;
      gc.stroke();
    }

    gc.beginPath();
    gc.arc(this.x + radius, this.y + radius, radius - 5, 0, 2 * Math.PI);
    gc.fillStyle = this.state == "down" ? Style.highlightColour : "whitesmoke";
    gc.strokeStyle = "black";
    gc.lineWidth = this.state == "down" ? 4 : 2;
    gc.fill();
    gc.stroke();
    gc.clip(); // clip text if it goes outside the circle

    if (this.checked === true) {
      gc.beginPath();
      gc.arc(this.x + radius, this.y + radius, radius / 2, 0, 2 * Math.PI);
      gc.fillStyle = "black";
      gc.fill();
    }

    gc.restore();

    super.draw(gc);
  }

  /**
   * @description Returns the string representation of the radio button
   * @method toString
   * @param None
   * @returns {string} - Returns the string representation of the radio button
   */
  public toString(): string {
    return `SKRadioButton`;
  }
}
