import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Plus, LogIn, LayoutDashboard, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Navbar({ onLoginClick, onReportClick }) {
  const { user, isLoggedIn } = useAuth();
  const dashboardLink = user?.role === 'admin' ? '/admin' : '/dashboard';

  const [menuOpen, setMenuOpen] = useState(false);

  const loggedIn = isLoggedIn;
  const linkStyle = ({ isActive }) =>
    `
    rounded-xl
    px-4
    py-2
    font-medium
    transition-all
    duration-300
    ${
      isActive
        ? `
        bg-orange-500/10
        text-orange-500
        shadow-sm
        backdrop-blur-md
        border
        border-orange-200/50
        `
        : `
        text-slate-700
        hover:bg-slate-100/70
        hover:text-orange-500
        `
    }
    `;

  return (
    <nav
      className="
        sticky
        top-0
        z-50
        border-b
        border-white/40
        bg-white/70
        backdrop-blur-xl
        shadow-sm
      "
    >
      <div
        className="
          mx-auto
          flex
          h-16
          max-w-7xl
          items-center
          justify-between
          px-6
        "
      >
        {/* Logo */}

        <NavLink to="/" className="group flex items-center gap-3">
          <div
            className="
              relative
              flex
              h-11
              w-11
              items-center
              justify-center
              overflow-hidden
              rounded-2xl
              border
              border-orange-200/60
              bg-orange-100/50
              backdrop-blur-md
              transition-all
              duration-300
              group-hover:scale-105
              group-hover:shadow-lg
            "
          >
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-br
                from-orange-300/30
                to-transparent
              "
            />

            <img src="/logo.png" alt="Campus Lost and Found" />
          </div>

<h1
            className="
              hidden
              text-base
              font-bold
              text-slate-800
              transition
              duration-300
              group-hover:text-orange-500
              min-[420px]:block
              min-[420px]:text-lg
            "
          >
            Campus
            <span className="text-orange-500"> Lost</span> & Found
          </h1>
        </NavLink>

        {/* Navigation (desktop) */}

        <div className="hidden items-center gap-3 md:flex">
          <NavLink to="/" className={linkStyle}>
            Home
          </NavLink>

          <NavLink to="/about" className={linkStyle}>
            About
          </NavLink>

          <NavLink to="/items" className={linkStyle}>
            Browse Items
          </NavLink>
        </div>

{/* Right Actions */}

        <div className="flex items-center gap-2 sm:gap-3">
          {loggedIn && (
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-xs text-slate-500">Welcome back,</span>

              <span className="font-semibold text-slate-800">{user?.username}</span>
            </div>
          )}

          <button
            onClick={() => {
              if (!loggedIn) {
                onLoginClick();
              } else {
                onReportClick();
              }
            }}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-orange-500
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition-all
              hover:bg-orange-600
              hover:shadow-lg
              active:scale-95
            "
          >
            <Plus size={18} />
            <span className="hidden min-[500px]:inline">Report Item</span>
          </button>

          {!loggedIn ? (
            <button
              onClick={onLoginClick}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-orange-300
                bg-white/40
                px-4
                py-2.5
                text-sm
                font-semibold
                text-orange-500
                backdrop-blur-md
                transition-all
                hover:bg-orange-500
                hover:text-white
                hover:shadow-lg
                active:scale-95
              "
            >
              <LogIn size={18} />
              <span className="hidden min-[500px]:inline">Sign In</span>
            </button>
          ) : (
            <NavLink
              to={dashboardLink}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-orange-300
                bg-white
                px-4
                py-2.5
                text-sm
                font-semibold
                text-orange-500
                transition-all
                hover:bg-orange-500
                hover:text-white
                hover:shadow-lg
                active:scale-95
              "
            >
              <LayoutDashboard size={18} />
              <span className="hidden min-[500px]:inline">Dashboard</span>
            </NavLink>
          )}

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            className="
              flex
              items-center
              justify-center
              rounded-xl
              p-2
              text-slate-700
              transition
              hover:bg-slate-100
              md:hidden
            "
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white/95 px-6 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-2">
            <MobileLink to="/" label="Home" onClick={() => setMenuOpen(false)} />
            <MobileLink to="/about" label="About" onClick={() => setMenuOpen(false)} />
            <MobileLink to="/items" label="Browse Items" onClick={() => setMenuOpen(false)} />
            {loggedIn && (
              <MobileLink to={dashboardLink} label="Dashboard" onClick={() => setMenuOpen(false)} />
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function MobileLink({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `rounded-xl px-4 py-3 font-medium transition ${
          isActive
            ? 'bg-orange-500 text-white'
            : 'text-slate-700 hover:bg-orange-50 hover:text-orange-500'
        }`
      }
    >
      {label}
    </NavLink>
  );
}

export default Navbar;
