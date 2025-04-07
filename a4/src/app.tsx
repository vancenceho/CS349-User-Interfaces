/**
 * @import { useState } from "preact/hooks";
 * @import { useEffect } from "preact/hooks";
 * @import { useSignal } from "@preact/signals";
 */
import { useState } from "preact/hooks";
import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";

/**
 * @import css from "./app.css";
 */
import "./app.css";

/**
 * @import { shoppingList, categories, fetchShoppingList } from "./model";
 */
import { shoppingList, categories, fetchShoppingList } from "./model";

/**
 * @import SettingsSection from "./settingsSection";
 * @import AddSection from "./addSection";
 * @import ListSection from "./listSection";
 * @import StatusSection from "./statusSection";
 */
import SettingsSection from "./settingsSection";
import AddSection from "./addSection";
import ListSection from "./listSection";
import StatusSection from "./statusSection";

/**
 * @function App
 * @description This is the main App component that renders the shopping list application.
 * It includes the settings section, add item section, list section, and status section.
 * It also handles loading state and overlays for editing categories and showing expenses.
 * The component uses signals to manage state and effects to fetch the shopping list data.
 * @returns {JSX.Element}
 */
export function App() {
  const loading = useSignal(true);
  const isEditOverlayVisible = useSignal(false);
  const isExpensesOverlayVisible = useSignal(false);

  useEffect(() => {
    fetchShoppingList().then(() => {
      loading.value = false;
    });
  }, []);

  const onEditCategories = () => {
    isEditOverlayVisible.value = true;
  };

  const onShowExpenses = () => {
    isExpensesOverlayVisible.value = true;
  };

  function LoadingAnimation() {
    return (
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  /**
   * @function EditCategoriesOverlay
   * @description This component renders an overlay for editing item categories.
   * It displays a list of items with their current categories and allows the user to change them.
   * @param {onClose} onClose - Function to close the overlay.
   * @returns {JSX.Element}
   */
  function EditCategoriesOverlay({ onClose }: { onClose: () => void }) {
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "(255, 255, 255, 0.5)",
          backdropFilter: "blur(4px)",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          padding: "16px",
          fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
        }}
      >
        <div
          style={{
            padding: "16px",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <button
            onClick={onClose}
            style={{ alignSelf: "flex-end", padding: "2px 4px" }}
          >
            🗙
          </button>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              justifyContent: "left",
            }}
          >
            {shoppingList.value.map((item) => (
              <div
                key={item.name}
                style={{
                  width: "80px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    textAlign: "left",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.name}
                </span>
                <select
                  value={item.category}
                  onChange={(e) => {
                    item.category = (e.target as HTMLSelectElement).value;
                    shoppingList.value = [...shoppingList.value];
                  }}
                >
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /**
   * @function ShowExpensesOverlay
   * @description This component renders an overlay for showing the expenses of bought items.
   * It fetches the prices of the bought items and displays them in a table format.
   * @param {onClose} onClose - Function to close the overlay.
   * @returns {JSX.Element}
   */
  function ShowExpensesOverlay({ onClose }: { onClose: () => void }) {
    const [pricesArray, setPricesArray] = useState<
      { name: string; price: number }[]
    >([]);
    const [loadingItems, setLoadingItems] = useState<Set<string>>(new Set());
    const boughtItems = shoppingList.value.filter((item) => item.bought);

    useEffect(() => {
      const fetchPrices = async () => {
        for (const item of boughtItems) {
          if (
            !pricesArray.some((priceEntry) => priceEntry.name === item.name) &&
            !loadingItems.has(item.name)
          ) {
            setLoadingItems((prev) => new Set(prev).add(item.name));

            const response = await fetch(
              `https://student.cs.uwaterloo.ca/~cs349/resources/prices.php?item=${item.name}`
            );
            const data = await response.json();

            setPricesArray((prevPrices) => {
              const updatedPrices = [
                ...prevPrices,
                { name: item.name, price: data.price },
              ];
              return updatedPrices;
            });

            setLoadingItems((prev) => {
              const updatedSet = new Set(prev);
              updatedSet.delete(item.name);
              return updatedSet;
            });
          }
        }
      };

      fetchPrices();
    }, [boughtItems, pricesArray, loadingItems]); // This effect runs when boughtItems change

    const totalCost = boughtItems.reduce((sum, item) => {
      const priceEntry = pricesArray.find((p) => p.name === item.name);
      return sum + (priceEntry ? priceEntry.price : 0) * item.quantity;
    }, 0);

    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "16px",
          fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
        }}
      >
        <div
          style={{
            padding: "16px",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <button
            onClick={onClose}
            style={{ alignSelf: "flex-end", padding: "2px 4px" }}
          >
            🗙
          </button>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Item Name
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Quantity
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Price per Item
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Item Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {boughtItems.map((item) => {
                const priceEntry = pricesArray.find(
                  (p) => p.name === item.name
                );
                const isLoading = loadingItems.has(item.name);
                return (
                  <tr key={item.name}>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {item.name}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {item.quantity}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {priceEntry ? (
                        priceEntry.price.toFixed(2)
                      ) : isLoading ? (
                        <span className="loading-dots"></span>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {priceEntry ? (
                        (priceEntry.price * item.quantity).toFixed(2)
                      ) : isLoading ? (
                        <span className="loading-dots"></span>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan={3}
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: "right",
                  }}
                >
                  Total Cost
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {totalCost.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div id="app">
      <SettingsSection
        onEditCategories={onEditCategories}
        onShowExpenses={onShowExpenses}
      />
      <AddSection />
      {loading.value ? (
        <LoadingAnimation />
      ) : (
        <ListSection list={shoppingList.value} />
      )}
      <StatusSection list={shoppingList.value} />
      {isEditOverlayVisible.value && (
        <EditCategoriesOverlay
          onClose={() => (isEditOverlayVisible.value = false)}
        />
      )}
      {isExpensesOverlayVisible.value && (
        <ShowExpensesOverlay
          onClose={() => (isExpensesOverlayVisible.value = false)}
        />
      )}
    </div>
  );
}
