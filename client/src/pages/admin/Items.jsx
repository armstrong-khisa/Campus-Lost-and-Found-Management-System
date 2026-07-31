import {
  Search,
  Package,
  CheckCircle,
  Archive,
} from "lucide-react";

function Items() {
  const items = [
    {
      id: 1,
      name: "HP Laptop",
      category: "Electronics",
      owner: "John Kamau",
      status: "Available",
    },
    {
      id: 2,
      name: "Student ID",
      category: "Documents",
      owner: "Mary Wanjiku",
      status: "Claimed",
    },
    {
      id: 3,
      name: "Backpack",
      category: "Accessories",
      owner: "Brian Otieno",
      status: "Available",
    },
    {
      id: 4,
      name: "Calculator",
      category: "Electronics",
      owner: "Grace Achieng",
      status: "Archived",
    },
  ];

  return (
    <section className="min-h-screen bg-slate-50 p-6 md:p-10">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Items
        </h1>

        <p className="mt-2 text-slate-500">
          Manage all approved lost and found items.
        </p>

      </div>

      {/* Statistics */}

      <div className="mt-8 grid gap-5 md:grid-cols-3">

        <StatCard
          title="Total Items"
          value="340"
          icon={<Package size={22} />}
          color="bg-orange-100 text-orange-500"
        />

        <StatCard
          title="Available"
          value="275"
          icon={<CheckCircle size={22} />}
          color="bg-green-100 text-green-500"
        />

        <StatCard
          title="Archived"
          value="65"
          icon={<Archive size={22} />}
          color="bg-slate-200 text-slate-600"
        />

      </div>

      {/* Search */}

      <div className="mt-8 flex items-center rounded-xl bg-white px-4 py-3 shadow-sm">

        <Search
          size={20}
          className="text-slate-400"
        />

        <input
          type="text"
          placeholder="Search items..."
          className="ml-3 w-full outline-none"
        />

      </div>

      {/* Table */}

      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr className="text-left">

              <th className="px-6 py-4">Item</th>
              <th>Category</th>
              <th>Owner</th>
              <th>Status</th>
              <th className="text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {items.map((item) => (

              <tr
                key={item.id}
                className="border-t"
              >

                <td className="px-6 py-5 font-medium text-slate-800">
                  {item.name}
                </td>

                <td>{item.category}</td>

                <td>{item.owner}</td>

                <td>
                  <StatusBadge status={item.status} />
                </td>

                <td>

                  <div className="flex justify-center gap-3">

                    <button className="rounded-lg bg-orange-500 px-4 py-2 text-sm text-white hover:bg-orange-600 transition">
                      Edit
                    </button>

                    <button className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition">
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">

      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
        {icon}
      </div>

      <h2 className="mt-4 text-3xl font-bold text-slate-800">
        {value}
      </h2>

      <p className="text-slate-500">
        {title}
      </p>

    </div>
  );
}

function StatusBadge({ status }) {

  if (status === "Available") {
    return (
      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-600">
        Available
      </span>
    );
  }

  if (status === "Claimed") {
    return (
      <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600">
        Claimed
      </span>
    );
  }

  return (
    <span className="rounded-full bg-slate-200 px-3 py-1 text-sm font-medium text-slate-700">
      Archived
    </span>
  );
}

export default Items;