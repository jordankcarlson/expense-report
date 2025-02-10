document.getElementById("expense-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const { PDFDocument, rgb } = PDFLib;
    
    // Load Existing NCH Form (Replace with actual file path)
    const existingPdfBytes = await fetch("NCH_Travel_Expense_Form.pdf").then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    
    const form = pdfDoc.getForm();

    // Fill PDF fields
    form.getTextField("Employee Name").setText(document.getElementById("employee-name").value);
    form.getTextField("Employee ID").setText(document.getElementById("employee-id").value);
    form.getTextField("Date of Trip").setText(document.getElementById("trip-date").value);
    form.getTextField("Location").setText(document.getElementById("trip-location").value);

    // Convert uploaded receipts to PDF pages
    const receipts = document.getElementById("receipts").files;
    for (let i = 0; i < receipts.length; i++) {
        const imageBytes = await receipts[i].arrayBuffer();
        const img = await pdfDoc.embedJpg(imageBytes);  // Use embedPng for PNG images
        const page = pdfDoc.addPage();
        page.drawImage(img, { x: 50, y: 50, width: 500, height: 600 });
    }

    // Save filled PDF
    const pdfBytes = await pdfDoc.save();

    // Create downloadable link
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.getElementById("download-link");
    link.href = URL.createObjectURL(blob);
    link.download = "Completed_Expense_Form.pdf";
    link.style.display = "block";
});

document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("signature-pad");
    const signaturePad = new SignaturePad(canvas);

    window.clearSignature = function() {
        signaturePad.clear();
    };

    document.getElementById("expense-form").addEventListener("submit", async function(event) {
        event.preventDefault();

        const { PDFDocument, rgb } = PDFLib;
        
        // Load Existing NCH Form (Replace with actual file path)
        const existingPdfBytes = await fetch("NCH_Travel_Expense_Form.pdf").then(res => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        
        const form = pdfDoc.getForm();

        // Fill PDF fields
        form.getTextField("Employee Name").setText(document.getElementById("employee-name").value);
        form.getTextField("Employee ID").setText(document.getElementById("employee-id").value);
        form.getTextField("Date of Trip").setText(document.getElementById("trip-date").value);
        form.getTextField("Location").setText(document.getElementById("trip-location").value);

        // Convert uploaded receipts to PDF pages
        const receipts = document.getElementById("receipts").files;
        for (let i = 0; i < receipts.length; i++) {
            const imageBytes = await receipts[i].arrayBuffer();
            const img = await pdfDoc.embedJpg(imageBytes);  // Use embedPng for PNG images
            const page = pdfDoc.addPage();
            page.drawImage(img, { x: 50, y: 50, width: 500, height: 600 });
        }

        // Capture signature as base64 image
        if (!signaturePad.isEmpty()) {
            const signatureImage = signaturePad.toDataURL("image/png");
            const signatureImageBytes = await fetch(signatureImage).then(res => res.arrayBuffer());
            const signatureImageEmbed = await pdfDoc.embedPng(signatureImageBytes);

            // Assuming page 1 has a designated signature field
            const firstPage = pdfDoc.getPages()[0];
            firstPage.drawImage(signatureImageEmbed, {
                x: 100,   // Adjust X position
                y: 150,   // Adjust Y position
                width: 150, // Adjust width
                height: 50  // Adjust height
            });
        }

        // Save filled PDF
        const pdfBytes = await pdfDoc.save();

        // Create downloadable link
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const link = document.getElementById("download-link");
        link.href = URL.createObjectURL(blob);
        link.download = "Completed_Expense_Form.pdf";
        link.style.display = "block";
    });
});
