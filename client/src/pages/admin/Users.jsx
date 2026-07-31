import { Search, Users as UsersIcon, UserCheck, UserX } from 'lucide-react';

function Users() {
  const users = [
    {
      id: 1,
      name: 'John Kamau',
      email: 'john@campus.edu',
      role: 'Student',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Mary Wanjiku',
      email: 'mary@campus.edu',
      role: 'Student',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Brian Otieno',
      email: 'brian@campus.edu',
      role: 'Student',
      status: 'Suspended',
    },
    {
      id: 4,
      name: 'Grace Achieng',
      email: 'grace@campus.edu',
      role: 'Admin',
      status: 'Active',
    },
  ];

  return (
    <section className="min-h-screen bg-slate-50 p-6 md:p-10">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-slate-800">Users</h1>

        <p className="mt-2 text-slate-500">Manage registered users on the platform.</p>
      </div>

      {/* Statistics */}

      <div className="grid gap-5 mt-8 md:grid-cols-3">
        <StatCard
          icon={<UsersIcon size={22} />}
          title="Total Users"
          value="1,250"
          color="bg-blue-100 text-blue-500"
        />

        <StatCard
          icon={<UserCheck size={22} />}
          title="Active Users"
          value="1,180"
          color="bg-green-100 text-green-500"
        />

        <StatCard
          icon={<UserX size={22} />}
          title="Suspended"
          value="70"
          color="bg-red-100 text-red-500"
        />
      </div>

      {/* Search */}

      <div className="mt-8 flex items-center rounded-xl bg-white px-4 py-3 shadow-sm">
        <Search size={20} className="text-slate-400" />

        <input
          type="text"

          placeholder="Search users..."

          className="ml-3 w-full outline-none"
        />
      </div>

      {/* Users Table */}

      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr className="text-left">
              <th className="px-6 py-4">Name</th>

              <th>Email</th>

              <th>Role</th>

              <th>Status</th>

              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}

                className="border-t"
              >
                <td className="px-6 py-5 font-medium text-slate-800">{user.name}</td>

                <td className="text-slate-600">{user.email}</td>

                <td>{user.role}</td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      user.status === 'Active'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td>
                  <div className="flex justify-center gap-3">
                    <button
                      className="
                      rounded-lg 
                      bg-orange-500 
                      px-4 py-2 
                      text-sm 
                      text-white 
                      transition 
                      hover:bg-orange-600
                      "
                    >
                      View
                    </button>

                    <button
                      className="
                      rounded-lg 
                      border 
                      border-red-200 
                      px-4 py-2 
                      text-sm 
                      text-red-500 
                      transition 
                      hover:bg-red-50
                      "
                    >
                      Suspend
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

function StatCard({ icon, title, value, color }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div
        className={`
        flex 
        h-11 
        w-11 
        items-center 
        justify-center 
        rounded-xl 
        ${color}
        `}
      >
        {icon}
      </div>

      <h2 className="mt-4 text-3xl font-bold text-slate-800">{value}</h2>

      <p className="text-slate-500">{title}</p>
    </div>
  );
}

export default Users;
