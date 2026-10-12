export function createErrorList(errors) {
    const list = document.createElement("ul");
    list.className = "error-list";

    for (const error of errors) {
        const item = document.createElement("li");

        const title = document.createElement("strong");

        const itemName = error.item_name || error.item_id || "Unknown item";

        title.textContent = error.item_type
            ? `${error.item_type}: ${itemName}`
            : itemName;

        const details = document.createElement("p");

        const field = error.field || "Unknown field";

        details.textContent =
            `${field} — Expected: ${formatValue(error.expected)}; ` +
            `Actual: ${formatValue(error.actual)}`;

        item.append(title, details);
        list.append(item);
    }

    return list;
}

function formatValue(value) {
    if (value === null || value === undefined || value === "") {
        return "(no value)";
    }

    return String(value);
}
