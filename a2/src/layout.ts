import { SKElement, LayoutMethod, Size } from "simplekit/imperative-mode";

/**
 * @class StackLayout
 * @description Places the elements in a vertical stack.
 * @implements LayoutMethod
 * @method measure - Measures the elements to determine the total width and height
 * @method layout - Lays out the elements in a vertical stack
 */
export class StackLayout implements LayoutMethod {
  /**
   * @description Measures the elements to determine the total width and height
   * @method measure
   * @param {SKElement} elements: array of elements to measure
   * @returns {Size} totalWidth: maximum width of all elements
   * @returns {Size} totalHeight: maximum height of all elements
   */
  measure(elements: SKElement[]): Size {
    // measure all elements
    elements.forEach((element) => {
      element.measure();
    });

    // maximum width of all elements
    const totalWidth = elements.reduce(
      (acc, element) => Math.max(acc, element.intrinsicWidth),
      0
    );

    // maximum height of all elements
    const totalHeight = elements.reduce(
      (acc, element) => acc + element.intrinsicHeight,
      0
    );

    // return minimum layout size
    return {
      width: totalWidth,
      height: totalHeight,
    };
  }

  /**
   * @description Lays out the elements in a vertical stack
   * @method layout
   * @param {number} width: width of the layout
   * @param {number} height: height of the layout
   * @param {SKElement} elements: array of elements to layout
   * @returns {Size} newBounds: the new bounds of the layout
   */
  layout(width: number, height: number, elements: SKElement[]): Size {
    const newBounds: Size = { width: 0, height: 0 };

    let y = 0;

    elements.forEach((element) => {
      // set the element position
      element.x = 0;
      element.y = y;

      // optional fill width
      const w = element.fillWidth ? width : element.intrinsicWidth;
      const h = element.fillHeight ? height : element.intrinsicHeight;

      element.layout(w, h);

      // next row
      y += element.layoutHeight;

      // update bounds that were actually used
      newBounds.width = Math.max(newBounds.width, element.layoutWidth);
      newBounds.height = Math.max(newBounds.height, y + element.layoutHeight);
    });

    return newBounds;
  }
}
