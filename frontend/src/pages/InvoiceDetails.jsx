import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInvoice } from "../services/api";

function InvoiceDetails() {
  const { invoiceId } = useParams();

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInvoice() {
      try {
        const data = await getInvoice(invoiceId);
        setInvoice(data);
      } catch (err) {
        setError("Failed to load invoice");
      } finally {
        setLoading(false);
      }
    }

    loadInvoice();
  }, [invoiceId]);

  if (loading) {
    return <div className="p-8">Loading invoice...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  if (!invoice) {
    return <div className="p-8">Invoice not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-bold">
          Invoice Details
        </h1>

        <p className="mb-8 text-gray-600">
          {invoice.invoice_number || "Invoice"}
        </p>

        {/* Basic information */}
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-semibold">
              Invoice Information
            </h2>

            <p><strong>Invoice Number:</strong> {invoice.invoice_number || "N/A"}</p>
            <p><strong>Invoice Date:</strong> {invoice.invoice_date || "N/A"}</p>
            <p><strong>Due Date:</strong> {invoice.due_date || "N/A"}</p>
            <p><strong>Currency:</strong> {invoice.currency || "N/A"}</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-semibold">
              Parties
            </h2>

            <p><strong>Vendor:</strong> {invoice.vendor_name || "N/A"}</p>
            <p><strong>Customer:</strong> {invoice.customer_name || "N/A"}</p>
          </div>
        </div>

        {/* Amounts */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">
            Amounts
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500">Subtotal</p>
              <p className="text-xl font-semibold">
                {invoice.subtotal ?? "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Tax</p>
              <p className="text-xl font-semibold">
                {invoice.tax ?? "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-xl font-semibold">
                {invoice.total_amount ?? "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Line items */}
        <div className="mb-6 rounded-xl bg-white shadow">
          <div className="border-b p-6">
            <h2 className="text-lg font-semibold">
              Line Items
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">Description</th>
                  <th className="px-6 py-3 text-left">Quantity</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                </tr>
              </thead>

              <tbody>
                {invoice.line_items?.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-6 py-4">
                      {item.description || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {item.quantity ?? "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {item.amount ?? "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">
            AI Summary
          </h2>

          <p className="text-gray-700">
            {invoice.summary || "No summary available."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetails;