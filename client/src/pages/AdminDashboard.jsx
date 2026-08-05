import {
  LayoutDashboard,
  Users,
  Package,
  ClipboardCheck,
  Tags,
  LogOut,
  CheckCircle,
  Clock,
} from 'lucide-react';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UsersPage from './admin/Users';
import ItemsPage from './admin/Items';
import ClaimsPage from './admin/Claims';
import CategoriesPage from './admin/Categories';

import { useAuth } from '../context/AuthContext';
import api from '../services/api';

function AdminDashboard() {
  const navigate = useNavigate();

  const { logout, user } = useAuth();

  const [activePage, setActivePage] = useState('Dashboard');

  function handleLogout() {
    logout();

    navigate('/', {
      replace: true,
    });
  }

  const renderPage = () => {
    switch (activePage) {
      case 'Users':
        return <UsersPage />;

      case 'Items':
        return <ItemsPage />;

      case 'Claims':
        return <ClaimsPage />;

      case 'Categories':
        return <CategoriesPage />;

      default:
        return <DashboardHome user={user} />;
    }
  };

return (
    <section className="flex min-h-screen bg-slate-50">
      {/* Sidebar (desktop) */}

      <aside className="hidden w-64 border-r border-slate-200 bg-white p-6 md:block">
        <nav className="space-y-2">
<AdminNav
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            active={activePage === 'Dashboard'}
            onClick={() => setActivePage('Dashboard')}
            className="w-full"
          />

          <AdminNav
            icon={<Users size={20} />}
            text="Users"
            active={activePage === 'Users'}
            onClick={() => setActivePage('Users')}
            className="w-full"
          />

          <AdminNav
            icon={<Package size={20} />}
            text="Items"
            active={activePage === 'Items'}
            onClick={() => setActivePage('Items')}
            className="w-full"
          />

          <AdminNav
            icon={<ClipboardCheck size={20} />}
            text="Claims"
            active={activePage === 'Claims'}
            onClick={() => setActivePage('Claims')}
            className="w-full"
          />

          <AdminNav
            icon={<Tags size={20} />}
            text="Categories"
            active={activePage === 'Categories'}
            onClick={() => setActivePage('Categories')}
            className="w-full"
          />
        </nav>

        <button
          onClick={handleLogout}
          className="mt-6 flex w-full items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-medium text-red-600 transition hover:border-red-600 hover:bg-red-600 hover:text-white"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      <main className="flex-1">
        {/* Mobile nav (horizontal scroll) */}
<div className="flex gap-2 overflow-x-auto border-b border-slate-200 bg-white p-3 pb-1 md:hidden">
          <AdminNav
            icon={<LayoutDashboard size={18} />}
            text="Dashboard"
            active={activePage === 'Dashboard'}
            onClick={() => setActivePage('Dashboard')}
            className="shrink-0"
          />
          <AdminNav
            icon={<Users size={18} />}
            text="Users"
            active={activePage === 'Users'}
            onClick={() => setActivePage('Users')}
            className="shrink-0"
          />
          <AdminNav
            icon={<Package size={18} />}
            text="Items"
            active={activePage === 'Items'}
            onClick={() => setActivePage('Items')}
            className="shrink-0"
          />
          <AdminNav
            icon={<ClipboardCheck size={18} />}
            text="Claims"
            active={activePage === 'Claims'}
            onClick={() => setActivePage('Claims')}
            className="shrink-0"
          />
          <AdminNav
            icon={<Tags size={18} />}
            text="Categories"
            active={activePage === 'Categories'}
            onClick={() => setActivePage('Categories')}
            className="shrink-0"
          />
        </div>

        {renderPage()}
      </main>
    </section>
  );
}

function DashboardHome({ user }) {
  const [stats, setStats] = useState({
    users: 0,
    items: 0,
    claims: 0,
    pendingClaims: 0,
  });

  const [recentItems, setRecentItems] = useState([]);
  const [recentClaims, setRecentClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [users, items, claims] = await Promise.all([
          api.get('/users'),
          api.get('/items'),
          api.get('/claims'),
        ]);

        setStats({
          users: users.length,
          items: items.length,
          claims: claims.length,
          pendingClaims: claims.filter((claim) => claim.status === 'Pending').length,
        });

        setRecentItems(items.slice(0, 5));
        setRecentClaims(claims.slice(0, 5));
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold text-slate-600">Loading dashboard...</p>
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Users',
      value: stats.users,
      icon: <Users size={22} />,
      color: 'bg-blue-100 text-blue-500',
    },
    {
      title: 'Total Items',
      value: stats.items,
      icon: <Package size={22} />,
      color: 'bg-orange-100 text-orange-500',
    },
    {
      title: 'Pending Claims',
      value: stats.pendingClaims,
      icon: <Clock size={22} />,
      color: 'bg-yellow-100 text-yellow-500',
    },
    {
      title: 'Resolved Claims',
      value: stats.claims - stats.pendingClaims,
      icon: <CheckCircle size={22} />,
      color: 'bg-green-100 text-green-500',
    },
  ];

return (
    <div className="p-4 md:p-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
          Welcome back, {user?.username || 'Admin'} 👋
        </h1>

        <p className="mt-2 text-slate-500">Manage campus lost and found activities.</p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.color}`}>
              {card.icon}
            </div>

            <h2 className="mt-4 text-3xl font-bold text-slate-800">{card.value}</h2>

            <p className="text-slate-500">{card.title}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Recent Items */}

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Recent Items</h2>

            <span className="text-sm text-slate-500">{recentItems.length} items</span>
          </div>

          <div className="mt-5 space-y-4">
            {recentItems.length === 0 ? (
              <p className="text-slate-500">No items found.</p>
            ) : (
              recentItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-slate-100 pb-4"
                >
                  <div>
                    <h3 className="font-semibold text-slate-800">{item.title}</h3>

                    <p className="text-sm text-slate-500">
                      {item.item_type} • {item.location}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      item.status === 'Claimed'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-orange-100 text-orange-600'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Claims */}

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Recent Claims</h2>

            <span className="text-sm text-slate-500">{recentClaims.length} claims</span>
          </div>

          <div className="mt-5 space-y-4">
            {recentClaims.length === 0 ? (
              <p className="text-slate-500">No claims found.</p>
            ) : (
              recentClaims.map((claim) => (
                <div
                  key={claim.id}
                  className="flex items-center justify-between border-b border-slate-100 pb-4"                >
                  <div>
                    <h3 className="font-semibold text-slate-800">Claim #{claim.id}</h3>

                    <p className="text-sm text-slate-500">Item #{claim.item}</p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      claim.status === 'Approved'
                        ? 'bg-green-100 text-green-600'
                        : claim.status === 'Rejected'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {claim.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminNav({ icon, text, active, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 whitespace-nowrap transition ${className} ${
        active
          ? 'bg-orange-500 text-white'
          : 'text-slate-500 hover:bg-orange-50 hover:text-orange-500'
      }`}
    >
      {icon}

      <span>{text}</span>
    </button>
  );
}

export default AdminDashboard;
