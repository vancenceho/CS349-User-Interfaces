/**
 * @import { useState } from "preact/hooks";
 * @import { useSignal } from "@preact/signals";
 */
import { useState } from "preact/hooks";
import { useSignal } from "@preact/signals";

/**
 * @import { shoppingList, categories } from "./model";
 */
import { shoppingList, categories } from "./model";

/**
 * @import css from "./addSection.css";
 */
import "./addSection.css";

/**
 * @function AddSection
 * @description Component for adding items to the shopping list.
 * @returns {JSX.Element}
 */
export default function AddSection() {
  const itemName = useSignal("");
  const quantity = useSignal(1);
  const category = useSignal("Other");
  const isCategoryDisabled = useSignal(false);
  const [isValid] = useState(true);

  const handleAddItem = () => {
    if (!itemName.value.trim() || !/^[A-Za-z\s]+$/.test(itemName.value)) return;

    const existingItem = shoppingList.value.find(
      (item) => item.name === itemName.value
    );

    if (existingItem) {
      category.value = existingItem.category;
      existingItem.quantity = Math.min(
        existingItem.quantity + quantity.value,
        24
      );
      shoppingList.value = [...shoppingList.value];
    } else {
      shoppingList.value = [
        ...shoppingList.value,
        {
          name: itemName.value.trim(),
          quantity: quantity.value,
          category: category.value,
          bought: false,
        },
      ];
    }

    itemName.value = "";
    quantity.value = 1;
    category.value = "Other";
    isCategoryDisabled.value = false;
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  const handleItemNameChange = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    itemName.value = value;

    const existingItem = shoppingList.value.find((item) => item.name === value);
    if (existingItem) {
      category.value = existingItem.category;
      isCategoryDisabled.value = true;
    } else {
      isCategoryDisabled.value = false;
    }
  };

  return (
    <div>
      <div class="add-section">
        <input
          type="text"
          className={`add-section-input ${isValid ? "invalid" : ""}`}
          placeholder="Item Name"
          aria-label="Item name"
          value={itemName}
          onChange={handleItemNameChange}
          onKeyUp={handleKeyDown}
        />
        <input
          type="number"
          className="add-section-stepper"
          min="1"
          max="24"
          step="1"
          value={quantity}
          defaultValue="1"
          aria-label="Item quantity"
          onChange={(e) => {
            quantity.value = Math.min(
              (e.target as HTMLInputElement).valueAsNumber,
              24
            );
          }}
          onKeyUp={handleKeyDown}
        />
        <select
          className="add-section-selector"
          aria-label="Item category"
          value={category}
          onChange={(e) => {
            category.value = (e.target as HTMLSelectElement).value;
          }}
          disabled={isCategoryDisabled}
        >
          {categories.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.icon}
            </option>
          ))}
        </select>
        <button className="add-section-button" onClick={handleAddItem}>
          ➕
        </button>
      </div>
    </div>
  );
}
