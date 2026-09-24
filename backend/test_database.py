from datetime import datetime

from pymongo import MongoClient

from app.config import MONGODB_URI


if not MONGODB_URI:
    raise ValueError("MONGODB_URI is not configured")


client = MongoClient(MONGODB_URI)

database = client["invoice_intelligence"]

invoices_collection = database["invoices"]


def save_invoice(invoice_data: dict, filename: str, summary: str):
    document = {
        "filename": filename,
        **invoice_data,
        "summary": summary,
        "created_at": datetime.utcnow()
    }

    result = invoices_collection.insert_one(document)

    return str(result.inserted_id)