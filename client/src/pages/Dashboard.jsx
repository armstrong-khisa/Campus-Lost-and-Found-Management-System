import {
  LayoutDashboard,
  Package,
  LogOut,
  MapPin,
  Clock,
  CheckCircle,
  ClipboardCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [items, setItems] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const myItems = await api.get("/users/me/items");
        const myClaims = await api.get("/claims/my");

        setItems(myItems);
        setClaims(myClaims);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  function handleLogout() {
    logout();
    navigate("/");
  }

  const stats = [
    {
      title: "Lost Items",
      count: items.filter((i) => i.item_type === "Lost").length,
      color: "bg-red-100 text-red-500",
      icon: <Package size={22} />,
    },
    {
      title: "Found Items",
      count: items.filter((i) => i.item_type === "Found").length,
      color: "bg-green-100 text-green-500",
      icon: <CheckCircle size={22} />,
    },
    {
      title: "My Claims",
      count: claims.length,
      color: "bg-orange-100 text-orange-500",
      icon: <ClipboardCheck size={22} />,
    },
    {
      title: "Recovered",
      count: items.filter((i) => i.status === "Claimed").length,
      color: "bg-blue-100 text-blue-500",
      icon: <CheckCircle size={22} />,
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold text-slate-600">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <section className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}

      <aside className="hidden w-64 border-r border-slate-200 bg-white p-6 md:block">
        <nav className="space-y-2">
          <NavItem
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            active
          />

          <NavItem
            icon={<Package size={20} />}
            text="My Reports"
          />

          <NavItem
            icon={<ClipboardCheck size={20} />}
            text="My Claims"
          />
        </nav>
      </aside>

      {/* Main */}

      <main className="flex-1 p-6 md:p-10">
        {/* Header */}

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Welcome back, {user?.username} 👋
            </h1>

            <p className="mt-2 text-slate-500">
              Track your reports and claims.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-red-200 px-5 py-3 text-red-500 transition hover:bg-red-50"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Stats */}

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.color}`}
              >
                {item.icon}
              </div>

              <h3 className="mt-4 text-3xl font-bold text-slate-800">
                {item.count}
              </h3>

              <p className="text-slate-500">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {/* Reports + Claims */}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          {/* Reports */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">
                My Reports
              </h2>

              <span className="text-sm text-slate-500">
                {items.length} reports
              </span>
            </div>

            <div className="mt-5 space-y-4">

              {items.length === 0 ? (
                <p className="text-slate-500">
                  You haven't reported any items yet.
                </p>
              ) : (
                items.slice(0, 5).map((item) => (
                  <ReportCard
                    key={item.id}
                    name={item.title}
                    status={item.item_type}
                    location={item.location}
                    date={item.date_reported}
                    color={
                      item.item_type === "Lost"
                        ? "text-red-500"
                        : "text-green-500"
                    }
                  />
                ))
              )}

            </div>
          </div>

          {/* Claims */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">
                My Claims
              </h2>

              <span className="text-sm text-slate-500">
                {claims.length} claims
              </span>
            </div>

            <div className="mt-5 space-y-4">

              {claims.length === 0 ? (
                <p className="text-slate-500">
                  You haven't submitted any claims yet.
                </p>
              ) : (
                claims.slice(0, 5).map((claim) => (
                  <ClaimCard
                    key={claim.id}
                    item={`Item #${claim.item}`}
                    status={claim.status}
                  />
                ))
              )}

            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

function NavItem({ icon, text, active }) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 transition ${
        active
          ? "bg-orange-500 text-white"
          : "text-slate-500 hover:bg-orange-50 hover:text-orange-500"
      }`}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}

function ReportCard({
  name,
  status,
  location,
  date,
  color,
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
      <div>
        <h3 className="font-semibold text-slate-800">
          {name}
        </h3>

        <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
          <MapPin size={14} />
          {location}
        </p>

        <p className="flex items-center gap-2 text-sm text-slate-500">
          <Clock size={14} />
          {new Date(date).toLocaleDateString()}
        </p>
      </div>

      <span className={`font-semibold ${color}`}>
        {status}
      </span>
    </div>
  );
}

function ClaimCard({
  item,
  status,
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
      <h3 className="font-semibold text-slate-800">
        {item}
      </h3>

      <span
        className={`rounded-full px-3 py-1 text-sm font-medium ${
          status === "Approved"
            ? "bg-green-100 text-green-600"
            : status === "Rejected"
            ? "bg-red-100 text-red-600"
            : "bg-orange-100 text-orange-600"
        }`}
      >
        {status}
      </span>
    </div>
  );
}

export default Dashboard;