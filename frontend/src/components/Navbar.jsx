import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <Link
          to="/"
          className="text-xl font-bold text-gray-900"
        >
          AI Invoice Intelligence
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600"
          >
            Dashboard
          </Link>

          <Link
            to="/upload"
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Upload Invoice
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;