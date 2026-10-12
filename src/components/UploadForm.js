export function createUploadForm({ onSubmit }) {
    const form = document.createElement("form");

    const pdfLabel = document.createElement("label");
    pdfLabel.textContent = "Drawing PDF: ";

    const pdfInput = document.createElement("input");
    pdfInput.type = "file";
    pdfInput.name = "pdf_file";
    pdfInput.accept = ".pdf,application/pdf";
    pdfInput.required = true;

    pdfLabel.append(pdfInput);

    const sourceLabel = document.createElement("label");
    sourceLabel.textContent = "Source workbook (.xlsx): ";

    const sourceInput = document.createElement("input");
    sourceInput.type = "file";
    sourceInput.name = "source_file";
    sourceInput.accept = ".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    sourceInput.required = true;

    sourceLabel.append(sourceInput);

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Run QA/QC Check";

    form.append(pdfLabel, sourceLabel, submitButton);

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const pdfFile = pdfInput.files[0];
        const sourceFile = sourceInput.files[0];

        if (!pdfFile || !sourceFile) {
            return;
        }

        submitButton.disabled = true;

        try {
            await onSubmit({ pdfFile, sourceFile });
        } finally {
            submitButton.disabled = false;
        }
    });

    return form;
}
