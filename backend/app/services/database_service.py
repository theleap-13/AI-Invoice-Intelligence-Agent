from pymongo import MongoClient

from app.config import MONGODB_URI


if not MONGODB_URI:
    raise ValueError("MONGODB_URI is not configured")


client = MongoClient(MONGODB_URI)

database = client["invoice_intelligence"]

invoices_collection = database["invoices"]


def save_invoice(invoice_data):
    result = invoices_collection.insert_one(invoice_data)

    return str(result.inserted_id)