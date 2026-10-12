import { createPageResults } from "./PageResults.js";

export function createResultsView(result) {
    const container = document.createElement("div");

    const summary = document.createElement("section");

    const summaryHeading = document.createElement("h2");
    summaryHeading.textContent = "Summary";

    const status = document.createElement("p");
    status.textContent = `Status: ${result.status ?? "Unknown"}`;

    const pagesProcessed = document.createElement("p");
    pagesProcessed.textContent =
        `Pages processed: ${result.summary?.pages_processed ?? 0}`;

    const totalErrors = document.createElement("p");
    totalErrors.textContent =
        `Total errors: ${result.summary?.total_errors ?? 0}`;

    summary.append(
        summaryHeading,
        status,
        pagesProcessed,
        totalErrors
    );

    container.append(summary);

    const pagesHeading = document.createElement("h2");
    pagesHeading.textContent = "Page Results";

    container.append(pagesHeading);

    const pages = Array.isArray(result.pages) ? result.pages : [];

    if (pages.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "The API returned no page results.";

        container.append(emptyMessage);
        return container;
    }

    for (const page of pages) {
        container.append(createPageResults(page));
    }

    return container;
}
