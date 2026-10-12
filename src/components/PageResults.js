import { createErrorList } from "./ErrorList.js";

export function createPageResults(page) {
    const section = document.createElement("section");
    section.className = "page-results";

    const heading = document.createElement("h3");
    heading.textContent = `Page ${page.page_number ?? "?"}`;

    const counts = page.occurrence_counts ?? {};
    const countsList = document.createElement("ul");

    for (const [type, count] of Object.entries(counts)) {
        const item = document.createElement("li");
        item.textContent = `${formatLabel(type)}: ${count}`;

        countsList.append(item);
    }

    const errors = Array.isArray(page.errors) ? page.errors : [];

    const errorHeading = document.createElement("h4");
    errorHeading.textContent = `Errors (${errors.length})`;

    section.append(heading, countsList, errorHeading);

    if (errors.length === 0) {
        const passMessage = document.createElement("p");
        passMessage.textContent = "No mismatches found on this page.";

        section.append(passMessage);
    } else {
        section.append(createErrorList(errors));
    }

    return section;
}

function formatLabel(value) {
    return value
        .replaceAll("_", " ")
        .replace(/\b\w/g, (character) => character.toUpperCase());
}
