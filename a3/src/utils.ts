/**
 * @description Create a button element with the given text and width
 * @param text
 * @param width
 * @returns {HTMLButtonElement} The button element
 */
export function createButton(text: string, width: number): HTMLButtonElement {
  const button = document.createElement("button");
  button.textContent = text;
  button.style.width = `${width}px`;
  button.style.cursor = "pointer";
  button.style.borderRadius = "4px";
  button.style.border = "1px solid #666";
  button.style.fontFamily = "Arial, Helvetica, sans-serif";
  button.addEventListener("mouseover", () => {
    if (!button.disabled) {
      button.style.backgroundColor = "rgba(135,236,250,1)";
      button.style.borderColor = "rgba(100,149,237,1)";
    }
  });
  button.addEventListener("mouseout", () => {
    if (!button.disabled) {
      button.style.backgroundColor = "";
      button.style.borderColor = "#666";
    }
  });
  button.addEventListener("mousedown", () => {
    if (!button.disabled) {
      button.style.backgroundColor = "rgba(100,149,237,1)";
      button.style.borderColor = "rgba(135,236,250,1)";
    }
  });
  button.addEventListener("mouseup", () => {
    if (!button.disabled) {
      button.style.backgroundColor = "rgba(135,236,250,1)";
      button.style.borderColor = "rgba(100,149,237,1)";
    }
  });
  button.addEventListener("disabled", () => {
    button.style.backgroundColor = "#e0e0e0";
    button.style.borderColor = "#e0e0e0";
  });
  return button;
}
