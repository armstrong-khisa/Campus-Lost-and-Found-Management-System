import { Search, SlidersHorizontal } from 'lucide-react';
import ItemCard from '../components/ItemCard';

function Items() {
  const categories = [
    'All',
    'Electronics',
    'Documents',
    'Accessories',
    'Clothing',
    'Books',
  ];

  const items = [
    {
      id: 1,
      name: 'HP Laptop',
      type: 'Lost',
      location: 'Library',
      date: 'Yesterday',
      image: '',
    },
    {
      id: 2,
      name: 'Student ID',
      type: 'Found',
      location: 'Science Block',
      date: 'Today',
      image: '',
    },
    {
      id: 3,
      name: 'Backpack',
      type: 'Lost',
      location: 'Hostel',
      date: '2 days ago',
      image: '',
    },
    {
      id: 4,
      name: 'Calculator',
      type: 'Found',
      location: 'Engineering Block',
      date: 'Today',
      image: '',
    },
    {
      id: 5,
      name: 'Water Bottle',
      type: 'Lost',
      location: 'Cafeteria',
      date: 'Monday',
      image: '',
    },
    {
      id: 6,
      name: 'Wallet',
      type: 'Found',
      location: 'Library',
      date: 'Yesterday',
      image: '',
    },
    {
      id: 7,
      name: 'Phone Charger',
      type: 'Lost',
      location: 'Lecture Hall',
      date: '3 days ago',
      image: '',
    },
    {
      id: 8,
      name: 'Notebook',
      type: 'Found',
      location: 'Computer Lab',
      date: 'Today',
      image: '',
    },
  ];

  return (
    <section className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Browse <span className="text-orange-500">Items</span>
          </h1>

          <p className="mt-2 text-slate-600">
            Find lost and found items around campus.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row">
          <div className="flex w-full items-center rounded-xl bg-white px-4 py-3 shadow md:w-[420px]">
            <Search size={20} className="text-slate-400" />

            <input
              type="text"
              placeholder="Search items..."
              className="ml-3 w-full bg-transparent outline-none"
            />
          </div>

          <button className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 shadow transition hover:bg-slate-100">
            <SlidersHorizontal size={18} />
            Filter
          </button>
        </div>

        {/* Categories */}
        <div className="mb-6 flex flex-wrap gap-3">
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

        {/* Item Count */}
        <p className="mb-6 text-slate-500">
          Showing <span className="font-semibold">{items.length}</span> items
        </p>

        {/* Item Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onView={() => {
                console.log(item);
                // Navigate to item details page here
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Items;