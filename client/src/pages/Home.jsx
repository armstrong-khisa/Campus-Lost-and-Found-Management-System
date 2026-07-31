import { ArrowRight, Search, Plus, CheckCircle } from 'lucide-react';

function Home() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto flex min-h-[90vh] max-w-7xl items-center px-6 py-16">
        {/* Left Section */}
        <div className="w-1/2 space-y-8">
          <div>
            <h1 className="text-6xl font-bold leading-tight text-slate-900">
              Lost Something
              <br />
              <span className="text-orange-500">On Campus?</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
              Report lost belongings, browse found items, and reconnect students with their
              valuables through one simple platform.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-4">
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
          <div className="flex flex-col gap-4 text-slate-700">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-orange-500" size={20} />
              Fast and secure reporting
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="text-orange-500" size={20} />
              Easy item claiming process
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="text-orange-500" size={20} />
              Built for the campus community
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative flex w-1/2 justify-end">
          <img
            src="https://images.unsplash.com/photo-1626010448982-0fec79ed1979?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Campus"
            className="h-[600px] w-[500px] rounded-3xl object-cover shadow-2xl"
          />

          {/* Floating Card */}
          <div className="absolute -bottom-6 left-8 rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-3xl font-bold text-orange-500">250+</h2>

            <p className="mt-1 text-sm text-slate-600">
              Lost items successfully
              <br />
              reported and recovered.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
