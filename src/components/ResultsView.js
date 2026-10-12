import { createPageResults } from "./PageResults.js";

export function createResultsView(result) {
    const container = document.createElement("div");
    container.className = "results-view";

    const summary = result.summary ?? {};
    const pages = Array.isArray(result.pages) ? result.pages : [];

    const totalErrors = summary.total_errors ?? 0;
    const pagesProcessed = summary.pages_processed ?? pages.length;

    const pagesWithErrors = pages.filter(
        (page) => (page.errors?.length ?? 0) > 0
    ).length;

    const pagesPassed = pages.length - pagesWithErrors;

    const heading = document.createElement("h2");
    heading.textContent = "Review Results";

    const subtitle = document.createElement("p");
    subtitle.className = "results-subtitle";
    subtitle.textContent = "Drawing review complete";

    const overview = document.createElement("section");
    overview.className = "results-overview";

    overview.append(
        createSummaryCard("Pages Processed", pagesProcessed),
        createSummaryCard("Pages Passed", pagesPassed),
        createSummaryCard("Total Errors", totalErrors, "error")
    );

    container.append(heading, subtitle, overview);

    const pagesHeading = document.createElement("h2");
    pagesHeading.textContent = "Page Results";
    pagesHeading.className = "page-results-heading";

    container.append(pagesHeading);

    if (pages.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No page results were returned.";
        container.append(message);

        return container;
    }

    for (const page of pages) {
        container.append(createPageResults(page));
    }

    return container;
}

function createSummaryCard(label, value, variant = "") {
    const card = document.createElement("article");
    card.className = `summary-card ${variant}`.trim();

    const cardLabel = document.createElement("p");
    cardLabel.className = "summary-card-label";
    cardLabel.textContent = label;

    const cardValue = document.createElement("p");
    cardValue.className = "summary-card-value";
    cardValue.textContent = String(value);

    card.append(cardLabel, cardValue);

    return card;
}
