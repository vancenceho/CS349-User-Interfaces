/**
 * @import css from "./settingsSection.css";
 */
import "./settingsSection.css";

/**
 * @function SettingsSection
 * @description A component that renders a settings section with two buttons: one for editing categories and one for showing expenses.
 * @param {Function} onEditCategories - A function to be called when the "Edit Categories" button is clicked.
 * @param {Function} onShowExpenses - A function to be called when the "Show Expenses" button is clicked.
 * @returns {JSX.Element}
 */
export default function SettingsSection({
  onEditCategories,
  onShowExpenses,
}: {
  onEditCategories: () => void;
  onShowExpenses: () => void;
}) {
  return (
    <div className="settings-section">
      <button className="settings-button" onClick={onEditCategories}>
        ✍🏻 Edit Categories
      </button>
      <button className="settings-button" onClick={onShowExpenses}>
        💵 Show Expenses
      </button>
    </div>
  );
}
