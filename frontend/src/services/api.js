const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;


export async function uploadInvoice(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/invoices/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload invoice");
  }

  return response.json();
}


export async function getInvoices() {
  const response = await fetch(
    `${API_BASE_URL}/invoices`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch invoices");
  }

  return response.json();
}


export async function getInvoice(invoiceId) {
  const response = await fetch(
    `${API_BASE_URL}/invoices/${invoiceId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch invoice");
  }

  return response.json();
}