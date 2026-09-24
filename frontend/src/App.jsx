import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import InvoiceDetails from "./pages/InvoiceDetails";
import UploadInvoice from "./pages/UploadInvoice";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<UploadInvoice />} />
        <Route path="/invoices/:invoiceId" element={<InvoiceDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;