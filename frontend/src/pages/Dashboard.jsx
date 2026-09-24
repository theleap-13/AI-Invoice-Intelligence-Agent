import { useEffect, useState } from "react";
import { getInvoices } from "../services/api";
import { Link } from "react-router-dom";

function Dashboard() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInvoices() {
      try {
        const data = await getInvoices();
        setInvoices(data);
      } catch (err) {
        setError("Failed to load invoices");
      } finally {
        setLoading(false);
      }
    }

    loadInvoices();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-gray-600">Loading invoices...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Invoice Dashboard
        </h1>

        <p className="mb-8 text-gray-600">
          Overview of processed invoices
        </p>

        {/* Summary cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">Total Invoices</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {invoices.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">Total Invoice Value</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {invoices.reduce(
                (total, invoice) =>
                  total + (invoice.total_amount || 0),
                0
              )}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">Processed</p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {invoices.length}
            </p>
          </div>
        </div>

        {/* Invoice table */}
        <div className="overflow-hidden rounded-xl bg-white shadow">
          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Invoices
            </h2>
          </div>

          {invoices.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No invoices found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                      Invoice Number
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                      Vendor
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                      Currency
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {invoices.map((invoice) => (
                    <tr
                      key={invoice._id}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm font-medium">
                        <Link
                            to={`/invoices/${invoice._id}`}
                            className="text-blue-600 hover:underline"
                        >
                            {invoice.invoice_number || "N/A"}
                        </Link>
                        </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {invoice.vendor_name || "N/A"}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {invoice.invoice_date || "N/A"}
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {invoice.total_amount ?? "N/A"}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {invoice.currency || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;