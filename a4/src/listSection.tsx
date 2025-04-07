/**
 * @import { shoppingList, categories } from "./model";
 * @import css from "./listSection.css";
 */
import { shoppingList, categories } from "./model";

import "./listSection.css";

/**
 * @function ListSection
 * @description A component that displays a list of items categorized by their type.
 * @param { list } - The list of items to display.
 * @param { list.name } - The name of the item.
 * @param { list.quantity } - The quantity of the item.
 * @param { list.category } - The category of the item.
 * @param { list.bought } - The bought status of the item.
 * @param { list.bought } - The bought status of the item.
 * @returns {JSX.Element}
 */
export default function ListSection({
  list,
}: {
  list: { name: string; quantity: number; category: string; bought: boolean }[];
}) {
  const categorizedItems = categories.map((category) => ({
    ...category,
    items: list
      .filter((item) => item.category === category.name)
      .sort((a, b) => a.name.localeCompare(b.name)),
  }));

  return (
    <div className="list-section">
      {categorizedItems.map((category) => (
        <div
          key={category.name}
          style={{
            backgroundColor: category.colour,
            passing: "8px",
            borderRadius: "4px",
          }}
        >
          <h3 style={{ textAlign: "center" }}>
            {category.icon} {category.name} (
            {category.items.filter((item) => item.bought).length}/
            {category.items.length})
          </h3>
          {category.items.length === 0 ? (
            <p>No items in this category</p>
          ) : (
            category.items.map((item) => (
              <div key={item.name} className="list-item">
                <input
                  type="checkbox"
                  checked={item.bought}
                  onChange={() => {
                    item.bought = !item.bought;
                    shoppingList.value = [...shoppingList.value];
                    console.log(
                      `Item ${item.name} marked as ${
                        item.bought ? "bought" : "not bought"
                      }`
                    );
                  }}
                />
                <span
                  style={{
                    flex: 1,
                    textAlign: "left",
                    textDecoration: item.bought ? "line-through" : "none",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.name}
                </span>
                {!item.bought && (
                  <input
                    type="number"
                    min="1"
                    max="24"
                    step="1"
                    value={item.quantity}
                    onChange={(e) => {
                      item.quantity = Number(
                        (e.target as HTMLInputElement).value
                      );
                      shoppingList.value = [...shoppingList.value];
                      console.log(
                        `Item ${item.name} quantity changed to ${item.quantity}`
                      );
                    }}
                    style={{ width: "30px" }}
                  />
                )}
                <button
                  className={"list-delete-button"}
                  onClick={() => {
                    shoppingList.value = shoppingList.value.filter(
                      (i) => i.name !== item.name
                    );
                    console.log(`Item ${item.name} deleted`);
                  }}
                >
                  ❌
                </button>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
}
