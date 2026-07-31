import {
  LayoutDashboard,
  Package,
  LogOut,
  MapPin,
  Clock,
  CheckCircle,
  ClipboardCheck
} from "lucide-react";


function Dashboard() {

  const stats = [
    {
      title: "Lost Items",
      count: 3,
      color: "bg-red-100 text-red-500",
      icon: <Package size={22} />
    },
    {
      title: "Found Items",
      count: 5,
      color: "bg-green-100 text-green-500",
      icon: <CheckCircle size={22} />
    },
    {
      title: "My Claims",
      count: 2,
      color: "bg-orange-100 text-orange-500",
      icon: <ClipboardCheck size={22} />
    },
    {
      title: "Recovered",
      count: 4,
      color: "bg-blue-100 text-blue-500",
      icon: <CheckCircle size={22} />
    }
  ];


  return (

    <section className="min-h-screen bg-slate-50 flex">


      {/* Sidebar */}

      <aside className="w-64 bg-white border-r border-slate-200 p-6 hidden md:block">


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





      {/* Main Content */}

      <main className="flex-1 p-6 md:p-10">


        {/* Header */}

        <div className="flex justify-between items-start">


          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              Welcome back, John
            </h1>


            <p className="mt-2 text-slate-500">
              Track your lost items, claims, and reports.
            </p>

          </div>




          {/* Logout */}

          <button
            className="flex items-center gap-2 rounded-xl border border-red-200 px-5 py-3 text-red-500 hover:bg-red-50 transition"
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
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >

              <div
                className={`h-11 w-11 rounded-xl flex items-center justify-center ${item.color}`}
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







        {/* Reports and Claims */}

        <div className="mt-8 grid lg:grid-cols-2 gap-6">



          {/* My Reports */}

          <div className="bg-white rounded-2xl shadow-sm p-6">


            <div className="flex justify-between items-center">


              <h2 className="text-xl font-bold text-slate-800">
                My Reports
              </h2>


              <button className="text-sm text-orange-500 hover:underline">
                View All
              </button>


            </div>



            <div className="mt-5 space-y-4">


              <ReportCard
                name="HP Laptop"
                status="Lost"
                location="Library"
                color="text-red-500"
              />


              <ReportCard
                name="Student ID Card"
                status="Found"
                location="Lecture Hall"
                color="text-green-500"
              />


            </div>


          </div>







          {/* My Claims */}

          <div className="bg-white rounded-2xl shadow-sm p-6">


            <div className="flex justify-between items-center">


              <h2 className="text-xl font-bold text-slate-800">
                My Claims
              </h2>


              <button className="text-sm text-orange-500 hover:underline">
                View All
              </button>


            </div>




            <div className="mt-5 space-y-4">


              <ClaimCard
                item="HP Laptop"
                status="Pending Approval"
              />


              <ClaimCard
                item="Backpack"
                status="Approved"
              />


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
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition
        ${
          active
            ? "bg-orange-500 text-white"
            : "text-slate-500 hover:bg-orange-50 hover:text-orange-500"
        }
      `}
    >

      {icon}

      <span>
        {text}
      </span>


    </div>

  );

}








function ReportCard({ name, status, location, color }) {

  return (

    <div className="flex justify-between items-center border-b border-slate-100 pb-4">


      <div>


        <h3 className="font-semibold text-slate-800">
          {name}
        </h3>


        <p className="flex items-center gap-2 text-sm text-slate-500 mt-1">
          <MapPin size={14}/>
          {location}
        </p>


        <p className="flex items-center gap-2 text-sm text-slate-500">
          <Clock size={14}/>
          Yesterday
        </p>


      </div>



      <span className={`font-semibold ${color}`}>
        {status}
      </span>


    </div>

  );

}








function ClaimCard({ item, status }) {

  return (

    <div className="flex justify-between items-center border-b border-slate-100 pb-4">


      <h3 className="font-semibold text-slate-800">
        {item}
      </h3>


      <span className="text-sm text-orange-500">
        {status}
      </span>


    </div>

  );

}



export default Dashboard;