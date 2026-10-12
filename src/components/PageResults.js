import { createErrorList } from "./ErrorList.js";

export function createPageResults(page) {
    const section = document.createElement("section");
    section.className = "page-results";

    const errors = Array.isArray(page.errors) ? page.errors : [];
    const hasErrors = errors.length > 0;

    const header = document.createElement("div");
    header.className = "page-results-header";

    const heading = document.createElement("h3");
    heading.textContent = `Page ${page.page_number ?? "?"}`;

    const status = document.createElement("span");
    status.className = `page-status ${hasErrors ? "failed" : "passed"}`;
    status.textContent = hasErrors
        ? `${errors.length} Errors`
        : "Passed";

    header.append(heading, status);

    const countsContainer = document.createElement("div");
    countsContainer.className = "occurrence-counts";

    const counts = page.occurrence_counts ?? {};

    for (const [type, count] of Object.entries(counts)) {
        const badge = document.createElement("span");
        badge.className = "occurrence-badge";
        badge.textContent = `${formatLabel(type)}: ${count}`;

        countsContainer.append(badge);
    }

    section.append(header, countsContainer);

    if (hasErrors) {
        const errorsHeading = document.createElement("h4");
        errorsHeading.textContent = "Detected Mismatches";

        section.append(errorsHeading, createErrorList(errors));
    } else {
        const successMessage = document.createElement("p");
        successMessage.className = "page-success";
        successMessage.textContent = "No mismatches found on this page.";

        section.append(successMessage);
    }

    return section;
}

function formatLabel(value) {
    return value
        .replaceAll("_", " ")
        .replace(/\b\w/g, (character) => character.toUpperCase());
}
