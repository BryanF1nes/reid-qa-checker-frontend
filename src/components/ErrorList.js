export function createErrorList(errors) {
    const table = document.createElement("table");
    table.className = "error-table";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    for (const label of ["Item", "Property", "Expected", "Received"]) {
        const th = document.createElement("th");
        th.scope = "col";
        th.textContent = label;

        headerRow.append(th);
    }

    thead.append(headerRow);

    const tbody = document.createElement("tbody");

    for (const error of errors) {
        const row = document.createElement("tr");

        const itemCell = document.createElement("td");
        itemCell.className = "error-item";

        const itemName = error.item_name || error.item_id || "Unknown item";
        const itemType = error.item_type || "Item";

        itemCell.textContent = `${itemType}: ${itemName}`;

        const fieldCell = document.createElement("td");
        fieldCell.textContent = error.field || "Unknown field";

        const expectedCell = document.createElement("td");
        expectedCell.textContent = formatValue(error.expected);

        const actualCell = document.createElement("td");
        actualCell.className = "actual-value";
        actualCell.textContent = formatValue(error.actual);

        row.append(
            itemCell,
            fieldCell,
            expectedCell,
            actualCell
        );

        tbody.append(row);
    }

    table.append(thead, tbody);

    return table;
}

function formatValue(value) {
    if (value === null || value === undefined || value === "") {
        return "No value";
    }

    return String(value);
}
