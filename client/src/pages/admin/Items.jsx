import { Search, Package, CheckCircle, Archive } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../../services/api';

function Items() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadItems() {
    try {
      const data = await api.get('/items');

      setItems(data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.status.toLowerCase().includes(search.toLowerCase())
  );

  async function deleteItem(id) {
    try {
      await api.delete(`/items/${id}`);

      loadItems();
    } catch (err) {
      console.log(err.message);
    }
  }

  if (loading) {
    return <div className="p-10 text-slate-600">Loading items...</div>;
  }

  return (
    <section className="min-h-screen bg-slate-50 p-6 md:p-10">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-slate-800">Items</h1>

        <p className="mt-2 text-slate-500">Manage all lost and found items.</p>
      </div>

      {/* Statistics */}

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <StatCard
          title="Total Items"

          value={items.length}

          icon={<Package size={22} />}

          color="bg-orange-100 text-orange-500"
        />

        <StatCard
          title="Available"

          value={items.filter((item) => item.status === 'Available').length}

          icon={<CheckCircle size={22} />}

          color="bg-green-100 text-green-500"
        />

        <StatCard
          title="Archived"

          value={items.filter((item) => item.status === 'Archived').length}

          icon={<Archive size={22} />}

          color="bg-slate-200 text-slate-600"
        />
      </div>

      {/* Search */}

      <div className="mt-8 flex items-center rounded-xl bg-white px-4 py-3 shadow-sm">
        <Search size={20} className="text-slate-400" />

        <input
          value={search}

          onChange={(e) => setSearch(e.target.value)}

          type="text"

          placeholder="Search items..."

          className="ml-3 w-full outline-none"
        />
      </div>

{/* Table */}

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full min-w-[640px]">
          <thead className="bg-slate-100">
            <tr className="text-left">
              <th className="px-6 py-4">Item</th>

              <th>Type</th>

              <th>Owner ID</th>

              <th>Status</th>

              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-slate-500">
                  No items found.
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-6 py-5 font-medium text-slate-800">{item.title}</td>

                  <td>{item.item_type}</td>

                  <td>User #{item.user_id}</td>

                  <td>
                    <StatusBadge status={item.status} />
                  </td>

                  <td>
                    <div className="flex justify-center gap-3">
                      <button
                        className="
                        rounded-lg
                        bg-orange-500
                        px-4
                        py-2
                        text-sm
                        text-white
                        hover:bg-orange-600
                        "
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteItem(item.id)}

                        className="
                        rounded-lg
                        border
                        border-red-200
                        px-4
                        py-2
                        text-sm
                        text-red-500
                        hover:bg-red-50
                        "
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>{icon}</div>

      <h2 className="mt-4 text-3xl font-bold text-slate-800">{value}</h2>

      <p className="text-slate-500">{title}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Available: 'bg-green-100 text-green-600',

    Claimed: 'bg-orange-100 text-orange-600',

    Archived: 'bg-slate-200 text-slate-700',
  };

  return (
    <span
      className={`
rounded-full
px-3
py-1
text-sm
font-medium
${styles[status]}
`}
    >
      {status}
    </span>
  );
}

export default Items;
