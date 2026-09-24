from app.services.pdf_service import extract_text_from_pdf
from app.services.llm_service import (
    extract_invoice_data,
    generate_invoice_summary,
)


pdf_path = "sample_invoice.pdf"

invoice_text = extract_text_from_pdf(pdf_path)

print("----- EXTRACTED TEXT -----")
print(invoice_text)

result = extract_invoice_data(invoice_text)

print("\n----- VALIDATED INVOICE -----")
print(result.model_dump())

summary = generate_invoice_summary(result)

print("\n----- INVOICE SUMMARY -----")
print(summary)