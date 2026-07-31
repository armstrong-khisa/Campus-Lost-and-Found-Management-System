import { Search, SlidersHorizontal } from 'lucide-react';

function Items() {
  const categories = ['All', 'Electronics', 'Documents', 'Accessories', 'Clothing', 'Books'];

  const items = Array.from({ length: 8 });

  return (
    <section className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Browse <span className="text-orange-500">Items</span>
          </h1>

          <p className="mt-2 text-slate-600">Find lost and found items around campus.</p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
          <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow w-full md:w-[420px]">
            <Search size={20} className="text-slate-400" />

            <input type="text" placeholder="Search items..." className="ml-3 w-full outline-none" />
          </div>

          <button className="flex items-center justify-center gap-2 bg-white rounded-xl px-5 shadow hover:bg-slate-100">
            <SlidersHorizontal size={18} />
            Filter
          </button>
        </div>

        {/* Categories */}

        <div className="flex flex-wrap gap-3 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              className={`rounded-full px-5 py-2 transition ${
                category === 'All'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white hover:bg-orange-500 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Items Count */}

        <p className="text-slate-500 mb-6">
          Showing <span className="font-semibold">24</span> items
        </p>

        {/* Cards */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((_, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white overflow-hidden shadow hover:shadow-lg transition"
            >
              <div className="h-48 bg-slate-200"></div>

              <div className="p-4">
                <div className="flex justify-between">
                  <h2 className="font-semibold">HP Laptop</h2>

                  <span className="text-red-500 text-sm">Lost</span>
                </div>

                <p className="text-sm text-slate-500 mt-2">📍 Library</p>

                <p className="text-sm text-slate-500">🕒 Yesterday</p>

                <button className="mt-5 text-orange-500 font-medium hover:underline">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Items;
