from huggingface_hub import InferenceClient

from app.config import HF_TOKEN

import json

from app.schemas.invoice import Invoice

if not HF_TOKEN:
    raise ValueError("HF_TOKEN is not configured")


client = InferenceClient(
    api_key=HF_TOKEN
)

MODEL_NAME = "openai/gpt-oss-120b"

def extract_invoice_data(invoice_text: str):
    prompt = f"""
You are an invoice information extraction system.

Extract information ONLY from the invoice text provided below.

Rules:
- Never guess or invent information.
- If a field is not available, return null.
- Normalize dates to YYYY-MM-DD when possible.
- Monetary values must be numbers.
- Keep currency separate from monetary values.
- Extract vendor and customer separately.
- Extract line items only when clearly available.
- Return valid JSON only.
- Do not include explanations or markdown.

Return JSON with exactly these fields:

{{
    "invoice_number": null,
    "invoice_date": null,
    "due_date": null,
    "vendor_name": null,
    "vendor_address": null,
    "customer_name": null,
    "customer_address": null,
    "subtotal": null,
    "tax": null,
    "total_amount": null,
    "currency": null,
    "payment_status": null,
    "payment_terms": null,
    "line_items": []
}}

Invoice text:
{invoice_text}
"""

    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        max_tokens=1000,
    )

    content = response.choices[0].message.content

    data = json.loads(content)

    invoice = Invoice.model_validate(data)

    return invoice

def generate_invoice_summary(invoice: Invoice) -> str:
    invoice_data = invoice.model_dump()

    prompt = f"""
Create a short, professional summary of the following invoice.
keep the summary for about 4 to 5 lines . 

Focus on:
- vendor
- customer
- invoice number
- invoice date
- total amount
- tax
- due date

Do not invent information.
If important information is missing, simply leave it out.

Invoice data:
{invoice_data}
"""

    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        max_tokens=150,
    )

    return response.choices[0].message.content.strip()