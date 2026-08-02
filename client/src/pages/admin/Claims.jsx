import { Search, Clock, CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../services/api";

function Claims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadClaims() {
    try {
      const data = await api.get("/claims");
      setClaims(data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadClaims();
  }, []);


  async function approveClaim(id) {
    try {
      await api.put(`/claims/${id}/approve`);

      loadClaims();
    } catch (err) {
      console.log(err.message);
    }
  }


  async function rejectClaim(id) {
    try {
      await api.put(`/claims/${id}/reject`);

      loadClaims();
    } catch (err) {
      console.log(err.message);
    }
  }


  const filteredClaims = claims.filter((claim) =>
    String(claim.item)
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    String(claim.user)
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    claim.status
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  if (loading) {
    return (
      <div className="p-10 text-slate-600">
        Loading claims...
      </div>
    );
  }


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
          value={
            claims.filter(
              (claim) => claim.status === "Pending"
            ).length
          }
          icon={<Clock size={22} />}
          color="bg-yellow-100 text-yellow-500"
        />


        <StatCard
          title="Approved"
          value={
            claims.filter(
              (claim) => claim.status === "Approved"
            ).length
          }
          icon={<CheckCircle size={22} />}
          color="bg-green-100 text-green-500"
        />


        <StatCard
          title="Rejected"
          value={
            claims.filter(
              (claim) => claim.status === "Rejected"
            ).length
          }
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-3 w-full outline-none"
        />

      </div>



      {/* Claims Table */}

      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr className="text-left">

              <th className="px-6 py-4">
                Item
              </th>

              <th>
                Claimant
              </th>

              <th>
                Date
              </th>

              <th>
                Status
              </th>

              <th className="text-center">
                Actions
              </th>

            </tr>

          </thead>



          <tbody>

            {filteredClaims.length === 0 ? (

              <tr>
                <td
                  colSpan="5"
                  className="py-8 text-center text-slate-500"
                >
                  No claims found.
                </td>
              </tr>

            ) : (

              filteredClaims.map((claim) => (

                <tr
                  key={claim.id}
                  className="border-t"
                >

                  <td className="px-6 py-5 font-medium text-slate-800">
                    Item #{claim.item}
                  </td>


                  <td>
                    User #{claim.user}
                  </td>


                  <td>
                    {new Date(
                      claim.claimed_at
                    ).toLocaleDateString()}
                  </td>


                  <td>
                    <StatusBadge
                      status={claim.status}
                    />
                  </td>


                  <td>

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() =>
                          approveClaim(claim.id)
                        }
                        disabled={
                          claim.status !== "Pending"
                        }
                        className="
                        rounded-lg
                        bg-green-500
                        px-4
                        py-2
                        text-sm
                        text-white
                        transition
                        hover:bg-green-600
                        disabled:opacity-40
                        "
                      >
                        Approve
                      </button>


                      <button
                        onClick={() =>
                          rejectClaim(claim.id)
                        }
                        disabled={
                          claim.status !== "Pending"
                        }
                        className="
                        rounded-lg
                        bg-red-500
                        px-4
                        py-2
                        text-sm
                        text-white
                        transition
                        hover:bg-red-600
                        disabled:opacity-40
                        "
                      >
                        Reject
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



function StatCard({
  title,
  value,
  icon,
  color
}) {

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


      <h2 className="mt-4 text-3xl font-bold text-slate-800">
        {value}
      </h2>


      <p className="text-slate-500">
        {title}
      </p>

    </div>
  );

}



function StatusBadge({
  status
}) {

  const styles = {
    Pending:
      "bg-yellow-100 text-yellow-600",

    Approved:
      "bg-green-100 text-green-600",

    Rejected:
      "bg-red-100 text-red-600",
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


export default Claims;