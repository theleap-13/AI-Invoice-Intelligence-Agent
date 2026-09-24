from app.services.pdf_service import extract_text_from_pdf


pdf_path = "sample_invoice.pdf"

text = extract_text_from_pdf(pdf_path)

print("----- EXTRACTED TEXT -----")
print(text)