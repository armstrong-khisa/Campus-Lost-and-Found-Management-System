import { Search, ClipboardCheck, Handshake } from "lucide-react";

function About() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">

          <h1 className="text-5xl font-bold text-slate-900">
            About <span className="text-orange-500">Campus Lost & Found</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Campus Lost & Found helps students report, browse and recover lost
            belongings quickly. Our goal is to make reconnecting people with
            their valuables simple, secure, and stress-free.
          </p>

        </div>

        {/* Features */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-8 text-center shadow-md transition hover:-translate-y-1 hover:shadow-lg">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
              <Search className="text-orange-500" size={30} />
            </div>

            <h2 className="mt-6 text-2xl font-semibold text-slate-800">
              Browse Items
            </h2>

            <p className="mt-4 text-slate-600">
              Search through lost and found items reported by members of the
              campus community.
            </p>

          </div>

          <div className="rounded-2xl bg-white p-8 text-center shadow-md transition hover:-translate-y-1 hover:shadow-lg">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
              <ClipboardCheck className="text-orange-500" size={30} />
            </div>

            <h2 className="mt-6 text-2xl font-semibold text-slate-800">
              Report Items
            </h2>

            <p className="mt-4 text-slate-600">
              Lost or found something? Report it in a few clicks and help it
              get back to its rightful owner.
            </p>

          </div>

          <div className="rounded-2xl bg-white p-8 text-center shadow-md transition hover:-translate-y-1 hover:shadow-lg">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
              <Handshake className="text-orange-500" size={30} />
            </div>

            <h2 className="mt-6 text-2xl font-semibold text-slate-800">
              Claim Securely
            </h2>

            <p className="mt-4 text-slate-600">
              Submit a claim with supporting details. Item owners and
              administrators can review claims before approving them.
            </p>

          </div>

        </div>

        {/* How It Works */}
        <div className="mt-24 rounded-3xl bg-white p-12 shadow-md">

          <h2 className="text-center text-3xl font-bold text-slate-900">
            How It Works
          </h2>

          <div className="mt-12 grid gap-10 md:grid-cols-3">

            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-xl font-bold text-white">
                1
              </div>

              <h3 className="mt-5 text-xl font-semibold text-slate-800">
                Report
              </h3>

              <p className="mt-3 text-slate-600">
                Report a lost or found item with its description and location.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-xl font-bold text-white">
                2
              </div>

              <h3 className="mt-5 text-xl font-semibold text-slate-800">
                Browse
              </h3>

              <p className="mt-3 text-slate-600">
                Students browse available items to locate their missing
                belongings.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-xl font-bold text-white">
                3
              </div>

              <h3 className="mt-5 text-xl font-semibold text-slate-800">
                Claim
              </h3>

              <p className="mt-3 text-slate-600">
                Submit a claim and wait for verification before collecting your
                item.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;