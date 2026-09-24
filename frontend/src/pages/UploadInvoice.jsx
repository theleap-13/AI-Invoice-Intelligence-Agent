import { useState } from "react";
import { uploadInvoice } from "../services/api";
import { Link } from "react-router-dom";

function UploadInvoice() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are supported.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError("");
    setResult(null);
  }

  async function handleUpload() {
    if (!file) {
      setError("Please select a PDF invoice first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await uploadInvoice(file);
      setResult(data);
    } catch (err) {
      setError("Failed to process invoice. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            AI Invoice Intelligence
          </h1>

          <p className="mt-2 text-gray-600">
            Upload an invoice PDF and let AI extract and analyze the data.
          </p>
        </div>

        {/* Upload Card */}
        <div className="rounded-xl bg-white p-8 shadow">

          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Upload Invoice
          </h2>

          <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">

            <p className="mb-4 text-gray-600">
              Select an invoice PDF to process
            </p>

            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="mx-auto block text-sm text-gray-600"
            />

            {file && (
              <p className="mt-4 text-sm font-medium text-gray-700">
                Selected: {file.name}
              </p>
            )}

          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Upload button */}
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {loading ? "Processing Invoice..." : "Process Invoice"}
          </button>

        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-6 rounded-xl bg-white p-6 text-center shadow">
            <p className="font-medium text-gray-700">
              Extracting invoice data and generating AI summary...
            </p>

            <p className="mt-2 text-sm text-gray-500">
              This may take a few seconds.
            </p>
          </div>
        )}

        {/* Result */}
        {result && !loading && (
          <div className="mt-8 space-y-6">

            {/* Success */}
            <div className="rounded-xl bg-green-50 p-4 text-green-700">
              Invoice processed successfully.
            </div>

            {/* Invoice information */}
            <div className="rounded-xl bg-white p-6 shadow">

              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Extracted Invoice Data
                </h2>

                <Link
                  to={`/invoices/${result.invoice_id}`}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  View Full Invoice
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                <div>
                  <p className="text-sm text-gray-500">
                    Invoice Number
                  </p>
                  <p className="font-medium">
                    {result.invoice.invoice_number || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Invoice Date
                  </p>
                  <p className="font-medium">
                    {result.invoice.invoice_date || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Vendor
                  </p>
                  <p className="font-medium">
                    {result.invoice.vendor_name || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Customer
                  </p>
                  <p className="font-medium">
                    {result.invoice.customer_name || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Due Date
                  </p>
                  <p className="font-medium">
                    {result.invoice.due_date || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Currency
                  </p>
                  <p className="font-medium">
                    {result.invoice.currency || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Subtotal
                  </p>
                  <p className="font-medium">
                    {result.invoice.subtotal ?? "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Tax
                  </p>
                  <p className="font-medium">
                    {result.invoice.tax ?? "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Total Amount
                  </p>
                  <p className="text-xl font-bold">
                    {result.invoice.total_amount ?? "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Payment Status
                  </p>
                  <p className="font-medium">
                    {result.invoice.payment_status || "N/A"}
                  </p>
                </div>

              </div>
            </div>

            {/* Line items */}
            <div className="rounded-xl bg-white shadow">

              <div className="border-b p-6">
                <h2 className="text-xl font-semibold">
                  Line Items
                </h2>
              </div>

              {result.invoice.line_items?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-sm">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-sm">
                          Amount
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y">
                      {result.invoice.line_items.map((item, index) => (
                        <tr key={index}>
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
              ) : (
                <p className="p-6 text-gray-500">
                  No line items found.
                </p>
              )}

            </div>

            {/* AI Summary */}
            <div className="rounded-xl bg-white p-6 shadow">

              <h2 className="mb-4 text-xl font-semibold">
                AI Summary
              </h2>

              <p className="leading-7 text-gray-700">
                {result.summary || "No summary available."}
              </p>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default UploadInvoice;