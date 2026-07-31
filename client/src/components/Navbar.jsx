import { NavLink } from 'react-router-dom';
import { Plus, LogIn } from 'lucide-react';

function Navbar({ onLoginClick, onReportClick }) {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <img src="/logo.svg" alt="Campus Lost and Found" className="h-10 w-10" />

          <h1 className="text-lg font-semibold text-slate-800">Campus Lost & Found</h1>
        </NavLink>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className="font-medium text-slate-700 transition hover:text-orange-500">
            Home
          </NavLink>

          <NavLink
            to="/about"
            className="font-medium text-slate-700 transition hover:text-orange-500"
          >
            About
          </NavLink>

          <NavLink
            to="/items"
            className="font-medium text-slate-700 transition hover:text-orange-500"
          >
            Browse Items
          </NavLink>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onReportClick}
            className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
          >
            <Plus size={18} />
            Report Item
          </button>

          <button
            onClick={onLoginClick}
            className="flex items-center gap-2 rounded-lg border border-orange-500 px-4 py-2 text-sm font-medium text-orange-500 transition hover:bg-orange-500 hover:text-white"
          >
            <LogIn size={18} />
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
