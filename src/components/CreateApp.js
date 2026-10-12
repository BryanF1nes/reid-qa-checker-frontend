import { createUploadForm } from "./UploadForm.js";
import { createResultsView } from "./ResultsView.js";

const API_URL = "http://127.0.0.1:8000/qa-check";

export default function createApp() {
    const app = document.querySelector("#app");

    const heading = document.createElement("h1");
    heading.textContent = "QA/QC Checker";

    const status = document.createElement("p");
    status.setAttribute("role", "status");

    const resultsContainer = document.createElement("section");
    resultsContainer.setAttribute("aria-live", "polite");

    const uploadForm = createUploadForm({
        onSubmit: async ({ pdfFile, sourceFile }) => {
            status.textContent = "Running QA/QC check...";
            resultsContainer.replaceChildren();

            const formData = new FormData();
            formData.append("pdf_file", pdfFile);
            formData.append("source_file", sourceFile);

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    body: formData,
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.detail ||
                        `Request failed (${response.status})`
                    );
                }

                status.textContent = "QA/QC check completed.";
                resultsContainer.append(createResultsView(result));
            } catch (error) {
                status.textContent = `Error: ${error.message}`;
            }
        },
    });

    app.append(heading, uploadForm, status, resultsContainer);
}
