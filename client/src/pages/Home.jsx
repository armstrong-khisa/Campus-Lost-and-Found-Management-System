import { Search, Plus, CheckCircle, MapPin, Clock, ArrowRight } from 'lucide-react';

function Home() {
  return (
    <section className="overflow-hidden bg-slate-50">
      <div className="mx-auto grid min-h-[90vh] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2">
        {/* Left Section */}
        <div>
          <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
            Campus Lost & Found Platform
          </span>

          <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-tight text-slate-900 lg:text-6xl">
            Lost Something?
            <br />
            <span className="font-semibold text-orange-500">We Help You Find It.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg font-normal leading-8 text-slate-600">
            Report lost belongings, discover found items, and reconnect with your valuables through
            a simple and secure campus platform.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-medium text-white transition hover:bg-orange-600">
              <Search size={20} />
              Browse Items
            </button>

            <button className="flex items-center gap-2 rounded-xl border border-orange-500 px-6 py-3 font-medium text-orange-500 transition hover:bg-orange-500 hover:text-white">
              <Plus size={20} />
              Report Item
            </button>
          </div>

          {/* Features */}
          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3 text-slate-700">
              <CheckCircle size={21} className="text-orange-500" />

              <span className="font-medium">Fast and secure reporting</span>
            </div>

            <div className="flex items-center gap-3 text-slate-700">
              <CheckCircle size={21} className="text-orange-500" />

              <span className="font-medium">Simple claim verification</span>
            </div>

            <div className="flex items-center gap-3 text-slate-700">
              <CheckCircle size={21} className="text-orange-500" />

              <span className="font-medium">Built for the campus community</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute -inset-5 rounded-3xl bg-orange-200/40 blur-2xl"></div>

            <img
              src="https://images.unsplash.com/photo-1626010448982-0fec79ed1979?q=80&w=870&auto=format&fit=crop"
              alt="Campus"
              className="relative h-[520px] w-[430px] rounded-3xl object-cover shadow-2xl"
            />

            {/* Floating Card */}
            <div className="absolute -bottom-8 -left-8 w-72 rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600">
                  Found
                </span>

                <span className="text-xs text-slate-400">Today</span>
              </div>

              <h3 className="mt-4 text-xl font-semibold text-slate-900">Student ID Card</h3>

              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-orange-500" />
                  Main Library
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={15} className="text-blue-500" />
                  Reported 2 hours ago
                </div>
              </div>

              <button className="mt-4 flex items-center gap-2 text-sm font-medium text-orange-500">
                View Details
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
