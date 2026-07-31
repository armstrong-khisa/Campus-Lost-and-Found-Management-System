import { Search, FileText, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

function Reports() {
  const reports = [
    {
      id: 1,
      item: 'HP Laptop',
      type: 'Lost',
      reportedBy: 'John Kamau',
      location: 'Library',
      status: 'Pending',
    },
    {
      id: 2,
      item: 'Student ID',
      type: 'Found',
      reportedBy: 'Mary Wanjiku',
      location: 'Science Block',
      status: 'Approved',
    },
    {
      id: 3,
      item: 'Backpack',
      type: 'Lost',
      reportedBy: 'Brian Otieno',
      location: 'Hostels',
      status: 'Rejected',
    },
    {
      id: 4,
      item: 'Calculator',
      type: 'Found',
      reportedBy: 'Grace Achieng',
      location: 'Lecture Hall',
      status: 'Pending',
    },
  ];

  return (
    <section className="min-h-screen bg-slate-50 p-6 md:p-10">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-slate-800">Reports</h1>

        <p className="mt-2 text-slate-500">Review and manage lost and found reports.</p>
      </div>

      {/* Statistics */}

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <StatCard
          title="Total Reports"
          value="340"
          icon={<FileText size={22} />}
          color="bg-blue-100 text-blue-500"
        />

        <StatCard
          title="Pending"
          value="28"
          icon={<Clock size={22} />}
          color="bg-yellow-100 text-yellow-500"
        />

        <StatCard
          title="Approved"
          value="312"
          icon={<CheckCircle size={22} />}
          color="bg-green-100 text-green-500"
        />
      </div>

      {/* Search */}

      <div className="mt-8 flex items-center rounded-xl bg-white px-4 py-3 shadow-sm">
        <Search size={20} className="text-slate-400" />

        <input type="text" placeholder="Search reports..." className="ml-3 w-full outline-none" />
      </div>

      {/* Table */}

      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr className="text-left">
              <th className="px-6 py-4">Item</th>

              <th>Type</th>

              <th>Reported By</th>

              <th>Location</th>

              <th>Status</th>

              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-t">
                <td className="px-6 py-5 font-medium text-slate-800">{report.item}</td>

                <td>{report.type}</td>

                <td>{report.reportedBy}</td>

                <td>{report.location}</td>

                <td>
                  <StatusBadge status={report.status} />
                </td>

                <td>
                  <div className="flex justify-center gap-3">
                    <button className="rounded-lg bg-orange-500 px-4 py-2 text-sm text-white hover:bg-orange-600 transition">
                      View
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
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>{icon}</div>

      <h2 className="mt-4 text-3xl font-bold text-slate-800">{value}</h2>

      <p className="text-slate-500">{title}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  if (status === 'Approved') {
    return (
      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-600">
        Approved
      </span>
    );
  }

  if (status === 'Rejected') {
    return (
      <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600">
        Rejected
      </span>
    );
  }

  return (
    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-600">
      Pending
    </span>
  );
}

export default Reports;
