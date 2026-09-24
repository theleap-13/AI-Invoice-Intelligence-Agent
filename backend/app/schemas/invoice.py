from pydantic import BaseModel
from typing import Optional


class LineItem(BaseModel):
    description: Optional[str] = None
    quantity: Optional[float] = None
    amount: Optional[float] = None


class Invoice(BaseModel):
    invoice_number: Optional[str] = None
    invoice_date: Optional[str] = None
    due_date: Optional[str] = None

    vendor_name: Optional[str] = None
    vendor_address: Optional[str] = None

    customer_name: Optional[str] = None
    customer_address: Optional[str] = None

    subtotal: Optional[float] = None
    tax: Optional[float] = None
    total_amount: Optional[float] = None

    currency: Optional[str] = None

    payment_status: Optional[str] = None
    payment_terms: Optional[str] = None

    line_items: list[LineItem] = []