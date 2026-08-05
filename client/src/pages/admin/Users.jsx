import { Search, Users as UsersIcon, UserCheck, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../../services/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  async function loadUsers() {
    try {
      const data = await api.get('/users');

      setUsers(data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="p-10 text-slate-600">Loading users...</div>;
  }

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

          value={users.length}

          color="bg-blue-100 text-blue-500"
        />

        <StatCard
          icon={<UserCheck size={22} />}

          title="Students"

          value={users.filter((user) => user.role === 'Student').length}

          color="bg-green-100 text-green-500"
        />

        <StatCard
          icon={<Shield size={22} />}

          title="Admins"

          value={users.filter((user) => user.role === 'Admin').length}

          color="bg-orange-100 text-orange-500"
        />
      </div>

      {/* Search */}

      <div className="mt-8 flex items-center rounded-xl bg-white px-4 py-3 shadow-sm">
        <Search size={20} className="text-slate-400" />

        <input
          type="text"

          placeholder="Search users..."

          value={search}

          onChange={(e) => setSearch(e.target.value)}

          className="ml-3 w-full outline-none"
        />
      </div>

{/* Users Table */}

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full min-w-[640px]">
          <thead className="bg-slate-100">
            <tr className="text-left">
              <th className="px-6 py-4">Name</th>

              <th>Email</th>

              <th>Role</th>

              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-8 text-center text-slate-500">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}

                  className="border-t"
                >
                  <td className="px-6 py-5 font-medium text-slate-800">{user.username}</td>

                  <td className="text-slate-600">{user.email}</td>

                  <td>
                    <span
                      className={`
                      rounded-full
                      px-3
                      py-1
                      text-sm
                      font-medium
                      ${
                        user.role === 'Admin'
                          ? 'bg-orange-100 text-orange-600'
                          : 'bg-blue-100 text-blue-600'
                      }
                      `}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <div className="flex justify-center">
                      <button
                        className="
                        rounded-lg
                        bg-orange-500
                        px-4
                        py-2
                        text-sm
                        text-white
                        transition
                        hover:bg-orange-600
                        "
                      >
                        View
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
