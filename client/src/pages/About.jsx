import {
  Search,
  ClipboardCheck,
  Handshake,
  ShieldCheck,
  Users,
  PackageCheck,
} from "lucide-react";

function About() {
  const steps = [
    {
      icon: ClipboardCheck,
      title: "Report",
      description:
        "Submit details about a lost or found item including description and location.",
    },
    {
      icon: Search,
      title: "Browse",
      description:
        "Search through reported items and find belongings that match your item.",
    },
    {
      icon: Handshake,
      title: "Recover",
      description:
        "Verify ownership and safely collect your belongings.",
    },
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: "Secure Process",
      description:
        "Claims are verified to ensure items are returned to the rightful owners.",
    },
    {
      icon: Users,
      title: "Campus Community",
      description:
        "Students and staff work together to help recover lost belongings.",
    },
    {
      icon: PackageCheck,
      title: "Organized System",
      description:
        "All lost and found records are managed in one convenient platform.",
    },
  ];

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-20">

        {/* About Hero */}
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Left */}
          <div>

            <p className="text-sm font-medium uppercase tracking-wider text-orange-500">
              About Campus Lost & Found
            </p>


            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-slate-900 lg:text-5xl">
              A smarter way to reconnect students with their belongings
            </h1>


            <p className="mt-6 text-lg font-normal leading-8 text-slate-600">
              Campus Lost & Found was created to solve a simple problem:
              lost belongings often remain missing because there is no easy
              way for people to report, search, and verify ownership.
            </p>


            <p className="mt-4 text-lg font-normal leading-8 text-slate-600">
              Our platform provides one central place where students and staff
              can report lost items, discover found belongings, and safely
              return items to their owners.
            </p>



            <div className="mt-8 grid grid-cols-3 gap-4">

              <div className="rounded-xl bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-600">
                  Simple
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  Easy reporting
                </p>
              </div>



              <div className="rounded-xl bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-600">
                  Secure
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  Verified claims
                </p>
              </div>



              <div className="rounded-xl bg-orange-50 p-4">
                <h3 className="font-semibold text-orange-600">
                  Connected
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  Campus help
                </p>
              </div>

            </div>

          </div>



          {/* Right Visual */}
          <div className="relative">

            <div className="absolute -inset-5 rounded-3xl bg-orange-200/40 blur-2xl"></div>


            <div className="relative rounded-3xl bg-white p-10 shadow-xl">


              <div className="flex items-center gap-5">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100">
                  <Search
                    size={32}
                    className="text-orange-500"
                  />
                </div>


                <div>

                  <h2 className="text-2xl font-semibold text-slate-900">
                    Find What Matters
                  </h2>


                  <p className="mt-1 text-slate-600">
                    A simple recovery process.
                  </p>

                </div>

              </div>



              <div className="my-8 h-px bg-slate-200"></div>



              <div className="space-y-5">


                <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">

                  <ClipboardCheck className="text-orange-500" />

                  <span className="font-medium text-slate-700">
                    Report lost or found items
                  </span>

                </div>



                <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">

                  <Search className="text-orange-500" />

                  <span className="font-medium text-slate-700">
                    Search available items
                  </span>

                </div>



                <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">

                  <Handshake className="text-orange-500" />

                  <span className="font-medium text-slate-700">
                    Recover items safely
                  </span>

                </div>


              </div>


            </div>

          </div>

        </div>




        {/* How It Works */}
        <div className="mt-28">


          <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-900">
            How It Works
          </h2>



          <div className="mt-12 grid gap-8 md:grid-cols-3">


            {steps.map((step, index) => {

              const Icon = step.icon;

              return (

                <div
                  key={step.title}
                  className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
                >


                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100">

                    <Icon
                      size={28}
                      className="text-orange-500"
                    />

                  </div>



                  <p className="mt-5 text-sm font-medium text-orange-500">
                    STEP {index + 1}
                  </p>



                  <h3 className="mt-2 text-xl font-semibold text-slate-900">
                    {step.title}
                  </h3>



                  <p className="mt-3 leading-7 text-slate-600">
                    {step.description}
                  </p>



                </div>

              );

            })}


          </div>


        </div>




        {/* Values */}
        <div className="mt-28">


          <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-900">
            Why Choose Our Platform
          </h2>



          <div className="mt-12 grid gap-8 md:grid-cols-3">


            {values.map((value) => {

              const Icon = value.icon;


              return (

                <div
                  key={value.title}
                  className="rounded-3xl border border-slate-200 bg-white p-8 transition hover:shadow-lg"
                >


                  <Icon
                    size={35}
                    className="text-orange-500"
                  />



                  <h3 className="mt-5 text-xl font-semibold text-slate-900">
                    {value.title}
                  </h3>



                  <p className="mt-3 leading-7 text-slate-600">
                    {value.description}
                  </p>



                </div>

              );

            })}


          </div>


        </div>


      </div>
    </section>
  );
}

export default About;