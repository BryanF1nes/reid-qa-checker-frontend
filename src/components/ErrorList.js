export function createErrorList(errors) {
    const table = document.createElement("table");
    table.className = "error-table";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    for (const label of ["ID", "Name", "Property", "Expected", "Shown On PDF"]) {
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
        const idCell = document.createElement("td");
        idCell.className = "error-id";
        idCell.textContent = error.item_id || "Item";
        // Name
        const nameCell = document.createElement("td");
        nameCell.className = "error-item";
        nameCell.textContent =
            error.item_name || "Unknown item";

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
            idCell,
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
