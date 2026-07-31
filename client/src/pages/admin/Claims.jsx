import {
  Search,
  ClipboardCheck,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

function Claims() {
  const claims = [
    {
      id: 1,
      item: "HP Laptop",
      claimant: "John Kamau",
      date: "31 Jul 2026",
      status: "Pending",
    },
    {
      id: 2,
      item: "Student ID",
      claimant: "Mary Wanjiku",
      date: "30 Jul 2026",
      status: "Approved",
    },
    {
      id: 3,
      item: "Backpack",
      claimant: "Brian Otieno",
      date: "29 Jul 2026",
      status: "Rejected",
    },
    {
      id: 4,
      item: "Calculator",
      claimant: "Grace Achieng",
      date: "28 Jul 2026",
      status: "Pending",
    },
  ];

  return (
    <section className="min-h-screen bg-slate-50 p-6 md:p-10">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Claims
        </h1>

        <p className="mt-2 text-slate-500">
          Review and manage item ownership claims.
        </p>

      </div>

      {/* Statistics */}

      <div className="mt-8 grid gap-5 md:grid-cols-3">

        <StatCard
          title="Pending Claims"
          value="28"
          icon={<Clock size={22} />}
          color="bg-yellow-100 text-yellow-500"
        />

        <StatCard
          title="Approved"
          value="156"
          icon={<CheckCircle size={22} />}
          color="bg-green-100 text-green-500"
        />

        <StatCard
          title="Rejected"
          value="17"
          icon={<XCircle size={22} />}
          color="bg-red-100 text-red-500"
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
          placeholder="Search claims..."
          className="ml-3 w-full outline-none"
        />

      </div>

      {/* Claims Table */}

      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr className="text-left">

              <th className="px-6 py-4">Item</th>

              <th>Claimant</th>

              <th>Date</th>

              <th>Status</th>

              <th className="text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {claims.map((claim) => (

              <tr
                key={claim.id}
                className="border-t"
              >

                <td className="px-6 py-5 font-medium text-slate-800">
                  {claim.item}
                </td>

                <td>{claim.claimant}</td>

                <td>{claim.date}</td>

                <td>
                  <StatusBadge status={claim.status} />
                </td>

                <td>

                  <div className="flex justify-center gap-3">

                    <button className="rounded-lg bg-green-500 px-4 py-2 text-sm text-white transition hover:bg-green-600">
                      Approve
                    </button>

                    <button className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white transition hover:bg-red-600">
                      Reject
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

  const styles = {
    Pending: "bg-yellow-100 text-yellow-600",
    Approved: "bg-green-100 text-green-600",
    Rejected: "bg-red-100 text-red-600",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default Claims;