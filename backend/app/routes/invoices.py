from fastapi import APIRouter, UploadFile, File, HTTPException
from bson import ObjectId
import tempfile
import os

from app.services.database_service import (
    save_invoice,
    invoices_collection,
)

from app.services.pdf_service import extract_text_from_pdf
from app.services.llm_service import (
    extract_invoice_data,
    generate_invoice_summary,
)
from app.services.database_service import save_invoice


router = APIRouter()


@router.post("/upload")
async def upload_invoice(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        return {"error": "Only PDF files are supported"}

    file_content = await file.read()

    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
        temp_file.write(file_content)
        temp_file_path = temp_file.name

    try:
        extracted_text = extract_text_from_pdf(temp_file_path)

        invoice_data = extract_invoice_data(extracted_text)

        summary = generate_invoice_summary(invoice_data)

        invoice_document = invoice_data.model_dump()

        invoice_document["filename"] = file.filename
        invoice_document["summary"] = summary

        invoice_id = save_invoice(invoice_document)

        return {
            "invoice_id": invoice_id,
            "filename": file.filename,
            "invoice": invoice_data.model_dump(),
            "summary": summary
        }

    finally:
        os.remove(temp_file_path)
        
@router.get("")
def get_invoices():
    invoices = list(invoices_collection.find())

    for invoice in invoices:
        invoice["_id"] = str(invoice["_id"])

    return invoices

@router.get("/{invoice_id}")
def get_invoice(invoice_id: str):
    try:
        object_id = ObjectId(invoice_id)
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid invoice ID"
        )

    invoice = invoices_collection.find_one({"_id": object_id})

    if invoice is None:
        raise HTTPException(
            status_code=404,
            detail="Invoice not found"
        )

    invoice["_id"] = str(invoice["_id"])

    return invoice