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
  AlertCircle
} from "lucide-react";


function AdminDashboard() {


  const stats = [
    {
      title: "Total Users",
      count: "1,250",
      icon: <Users size={22}/>,
      color: "bg-blue-100 text-blue-500"
    },
    {
      title: "Total Items",
      count: "340",
      icon: <Package size={22}/>,
      color: "bg-orange-100 text-orange-500"
    },
    {
      title: "Pending Claims",
      count: "28",
      icon: <Clock size={22}/>,
      color: "bg-yellow-100 text-yellow-500"
    },
    {
      title: "Resolved Cases",
      count: "210",
      icon: <CheckCircle size={22}/>,
      color: "bg-green-100 text-green-500"
    }
  ];



  return (

    <section className="min-h-screen bg-slate-50 flex">



      {/* Sidebar */}

      <aside className="w-64 bg-white border-r border-slate-200 p-6 hidden md:block">


        <nav className="space-y-2">


          <AdminNav
            icon={<LayoutDashboard size={20}/>}
            text="Dashboard"
            active
          />


          <AdminNav
            icon={<Users size={20}/>}
            text="Users"
          />


          <AdminNav
            icon={<Package size={20}/>}
            text="Items"
          />


          <AdminNav
            icon={<ClipboardCheck size={20}/>}
            text="Claims"
          />


          <AdminNav
            icon={<FileText size={20}/>}
            text="Reports"
          />


          <AdminNav
            icon={<Tags size={20}/>}
            text="Categories"
          />


        </nav>


      </aside>







      {/* Main Content */}

      <main className="flex-1 p-6 md:p-10">



        {/* Header */}

        <div className="flex justify-between items-start">


          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              Welcome back, Admin
            </h1>


            <p className="mt-2 text-slate-500">
              Manage campus lost and found activities.
            </p>

          </div>





          <button
            className="flex items-center gap-2 rounded-xl border border-red-200 px-5 py-3 text-red-500 hover:bg-red-50 transition"
          >

            <LogOut size={18}/>

            Logout

          </button>


        </div>







        {/* Statistics */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">


          {stats.map((item)=>(

            <div
              key={item.title}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >

              <div
                className={`h-11 w-11 rounded-xl flex items-center justify-center ${item.color}`}
              >

                {item.icon}

              </div>


              <h2 className="mt-4 text-3xl font-bold text-slate-800">
                {item.count}
              </h2>


              <p className="text-slate-500">
                {item.title}
              </p>


            </div>

          ))}


        </div>







        {/* Bottom Sections */}

        <div className="grid lg:grid-cols-2 gap-6 mt-8">





          {/* Recent Items */}

          <div className="bg-white rounded-2xl p-6 shadow-sm">


            <div className="flex justify-between items-center">


              <h2 className="text-xl font-bold text-slate-800">
                Recent Items
              </h2>


              <button className="text-sm text-orange-500 hover:underline">
                View All
              </button>


            </div>




            <div className="mt-5 space-y-4">


              <AdminItem
                name="HP Laptop"
                status="Pending Review"
              />


              <AdminItem
                name="Student ID Card"
                status="Approved"
              />


              <AdminItem
                name="Backpack"
                status="Reported"
              />


            </div>


          </div>







          {/* Pending Claims */}

          <div className="bg-white rounded-2xl p-6 shadow-sm">


            <div className="flex justify-between items-center">


              <h2 className="text-xl font-bold text-slate-800">
                Pending Claims
              </h2>


              <button className="text-sm text-orange-500 hover:underline">
                View All
              </button>


            </div>




            <div className="mt-5 space-y-4">


              <ClaimRequest
                item="HP Laptop"
                user="John Kamau"
              />


              <ClaimRequest
                item="Backpack"
                user="Mary Wanjiku"
              />


            </div>


          </div>



        </div>



      </main>


    </section>

  );

}







function AdminNav({icon,text,active}) {

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








function AdminItem({name,status}) {

  return (

    <div className="flex justify-between items-center border-b border-slate-100 pb-3">


      <div>

        <h3 className="font-semibold text-slate-800">
          {name}
        </h3>

        <p className="text-sm text-slate-500">
          Recently submitted
        </p>

      </div>


      <span className="text-sm text-orange-500">
        {status}
      </span>


    </div>

  );

}








function ClaimRequest({item,user}) {

  return (

    <div className="flex justify-between items-center border-b border-slate-100 pb-3">


      <div>

        <h3 className="font-semibold text-slate-800">
          {item}
        </h3>


        <p className="text-sm text-slate-500">
          Claimed by {user}
        </p>


      </div>



      <button className="text-orange-500 hover:text-orange-600">
        Review
      </button>


    </div>

  );

}



export default AdminDashboard;