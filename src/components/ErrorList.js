export function createErrorList(errors) {
    const table = document.createElement("table");
    table.className = "error-table";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    for (const label of ["Type", "Name", "Property", "Expected", "Received"]) {
        const th = document.createElement("th");
        th.scope = "col";
        th.textContent = label;

        headerRow.append(th);
    }

    thead.append(headerRow);

    const tbody = document.createElement("tbody");

    for (const error of errors) {
        const row = document.createElement("tr");

        // Type
        const typeCell = document.createElement("td");
        const itemType = error.item_type || "Item";

        typeCell.textContent =
            itemType.charAt(0).toUpperCase() + itemType.slice(1);

        // Name
        const nameCell = document.createElement("td");
        nameCell.className = "error-item";
        nameCell.textContent =
            error.item_name || error.item_id || "Unknown item";

        // Property
        const fieldCell = document.createElement("td");
        fieldCell.textContent = error.field || "Unknown field";

        // Expected
        const expectedCell = document.createElement("td");
        expectedCell.textContent = formatValue(error.expected);

        // Received
        const actualCell = document.createElement("td");
        actualCell.className = "actual-value";
        actualCell.textContent = formatValue(error.actual);

        row.append(
            typeCell,
            nameCell,
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
