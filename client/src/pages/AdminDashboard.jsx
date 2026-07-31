import {
  LayoutDashboard,
  Users,
  Package,
  ClipboardCheck,
  FileText,
  Tags,
  LogOut,
  CheckCircle,
  Clock,
} from 'lucide-react';

import { useState } from 'react';

import UsersPage from './admin/Users';
import ItemsPage from './admin/Items';
import ClaimsPage from './admin/Claims';
import ReportsPage from './admin/Reports';
import CategoriesPage from './admin/Categories';

function AdminDashboard() {
  const [activePage, setActivePage] = useState('Dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'Users':
        return <UsersPage />;

      case 'Items':
        return <ItemsPage />;

      case 'Claims':
        return <ClaimsPage />;

      case 'Reports':
        return <ReportsPage />;

      case 'Categories':
        return <CategoriesPage />;

      default:
        return <DashboardHome />;
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}

      <aside className="w-64 bg-white border-r border-slate-200 p-6 hidden md:block">
        <nav className="space-y-2">
          <AdminNav
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            active={activePage === 'Dashboard'}
            onClick={() => setActivePage('Dashboard')}
          />

          <AdminNav
            icon={<Users size={20} />}
            text="Users"
            active={activePage === 'Users'}
            onClick={() => setActivePage('Users')}
          />

          <AdminNav
            icon={<Package size={20} />}
            text="Items"
            active={activePage === 'Items'}
            onClick={() => setActivePage('Items')}
          />

          <AdminNav
            icon={<ClipboardCheck size={20} />}
            text="Claims"
            active={activePage === 'Claims'}
            onClick={() => setActivePage('Claims')}
          />

          <AdminNav
            icon={<FileText size={20} />}
            text="Reports"
            active={activePage === 'Reports'}
            onClick={() => setActivePage('Reports')}
          />

          <AdminNav
            icon={<Tags size={20} />}
            text="Categories"
            active={activePage === 'Categories'}
            onClick={() => setActivePage('Categories')}
          />
        </nav>

        <button
          className="
          mt-10 flex items-center gap-3
          px-4 py-3 rounded-xl
          text-red-500
          hover:bg-red-50
          transition
          "
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main Content */}

      <main className="flex-1">{renderPage()}</main>
    </section>
  );
}

function DashboardHome() {
  const stats = [
    {
      title: 'Total Users',
      count: '1,250',
      icon: <Users size={22} />,
      color: 'bg-blue-100 text-blue-500',
    },

    {
      title: 'Total Items',
      count: '340',
      icon: <Package size={22} />,
      color: 'bg-orange-100 text-orange-500',
    },

    {
      title: 'Pending Claims',
      count: '28',
      icon: <Clock size={22} />,
      color: 'bg-yellow-100 text-yellow-500',
    },

    {
      title: 'Resolved Cases',
      count: '210',
      icon: <CheckCircle size={22} />,
      color: 'bg-green-100 text-green-500',
    },
  ];

  return (
    <div className="p-6 md:p-10">
      {/* Header */}

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Welcome back, Admin</h1>

          <p className="mt-2 text-slate-500">Manage campus lost and found activities.</p>
        </div>

        <button
          className="
          flex items-center gap-2
          rounded-xl
          border border-red-200
          px-5 py-3
          text-red-500
          hover:bg-red-50
          transition
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Stats */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        {stats.map((item) => (
          <div
            key={item.title}
            className="
            bg-white
            rounded-2xl
            p-5
            shadow-sm
            hover:shadow-md
            transition
            "
          >
            <div
              className={`
              h-11 w-11
              rounded-xl
              flex items-center justify-center
              ${item.color}
              `}
            >
              {item.icon}
            </div>

            <h2 className="mt-4 text-3xl font-bold text-slate-800">{item.count}</h2>

            <p className="text-slate-500">{item.title}</p>
          </div>
        ))}
      </div>

      {/* Activity */}

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800">Recent Items</h2>

          <div className="mt-5 space-y-4">
            <ActivityItem title="HP Laptop" status="Pending Review" />

            <ActivityItem title="Student ID Card" status="Approved" />

            <ActivityItem title="Backpack" status="Reported" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800">Pending Claims</h2>

          <div className="mt-5 space-y-4">
            <ClaimItem item="HP Laptop" user="John Kamau" />

            <ClaimItem item="Backpack" user="Mary Wanjiku" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminNav({ icon, text, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
      w-full
      flex items-center gap-3
      px-4 py-3
      rounded-xl
      transition
      ${
        active
          ? 'bg-orange-500 text-white'
          : 'text-slate-500 hover:bg-orange-50 hover:text-orange-500'
      }
      `}
    >
      {icon}

      {text}
    </button>
  );
}

function ActivityItem({ title, status }) {
  return (
    <div className="flex justify-between border-b border-slate-100 pb-3">
      <div>
        <h3 className="font-semibold text-slate-800">{title}</h3>

        <p className="text-sm text-slate-500">Recently submitted</p>
      </div>

      <span className="text-sm text-orange-500">{status}</span>
    </div>
  );
}

function ClaimItem({ item, user }) {
  return (
    <div className="flex justify-between border-b border-slate-100 pb-3">
      <div>
        <h3 className="font-semibold text-slate-800">{item}</h3>

        <p className="text-sm text-slate-500">Claimed by {user}</p>
      </div>

      <button className="text-orange-500">Review</button>
    </div>
  );
}

export default AdminDashboard;
