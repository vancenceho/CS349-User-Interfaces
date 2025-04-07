/**
 * @import styles from "./statusSection.css";
 */
import "./statusSection.css";

/**
 *
 * @function StatusSection
 * @param list - The shopping list
 * @description This component displays the total number of items in the shopping list.
 * @returns {JSX.Element}
 */
export default function StatusSection({
  list,
}: {
  list: { name: string; quantity: number; category: string; bought: boolean }[];
}) {
  const totalItems = list.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "16px",
        fontSize: "20px",
        fontWeight: "bold",
        color: "purple",
        fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
      }}
    >
      <span className="sparkle">✨</span> There are a total of {totalItems}{" "}
      items in your shopping list!<span className="sparkle">✨</span>
    </div>
  );
}
