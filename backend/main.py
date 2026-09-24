from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.invoices import router as invoice_router


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ai-invoice-intelligence-agent.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health_check():
    return {"status": "ok"}


app.include_router(invoice_router, prefix="/api/invoices")