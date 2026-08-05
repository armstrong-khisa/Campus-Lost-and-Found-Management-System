import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import ItemCard from '../components/ItemCard';
import api from '../services/api';

function Items() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const [search, setSearch] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('All');

  const [selectedLocation, setSelectedLocation] = useState('All');

  const [period, setPeriod] = useState('All');

  async function loadItems() {
    try {
      setError('');

      const [itemsData, categoriesData] = await Promise.all([
        api.get('/items'),

        api.get('/categories'),
      ]);

      setItems(itemsData);

      setCategories(categoriesData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load items');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  const locations = ['All', ...new Set(items.map((item) => item.location))];

  const filteredItems = items.filter((item) => {
    const searchMatch =
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase());

    const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;

    const locationMatch = selectedLocation === 'All' || item.location === selectedLocation;

    let timeMatch = true;

    if (period !== 'All') {
      const created = new Date(item.date_reported);

      const now = new Date();

      const difference = (now - created) / (1000 * 60 * 60 * 24);

      timeMatch = difference <= Number(period);
    }

    return searchMatch && categoryMatch && locationMatch && timeMatch;
  });

  if (loading) {
    return <div className="py-20 text-center text-lg">Loading items...</div>;
  }

  if (error) {
    return <div className="py-20 text-center text-red-500">{error}</div>;
  }

  return (
    <section className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Browse
            <span className="text-orange-500"> Items</span>
          </h1>

          <p className="mt-2 text-slate-600">Find lost and found items around campus.</p>
        </div>

        {/* Search + Filters */}

        <div className="grid gap-4 md:grid-cols-4 mb-6">
          {/* Search */}

          <div
            className="
            flex
            items-center
            rounded-xl
            bg-white
            px-4
            py-3
            shadow
            md:col-span-2
          "
          >
            <Search size={20} className="text-slate-400" />

            <input
              value={search}

              onChange={(e) => setSearch(e.target.value)}

              placeholder="Search items..."

              className="
                ml-3
                w-full
                outline-none
              "
            />
          </div>

          {/* Location */}

          <select
            value={selectedLocation}

            onChange={(e) => setSelectedLocation(e.target.value)}

            className="
              rounded-xl
              bg-white
              px-4
              shadow
            "
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>

          {/* Time */}

          <select
            value={period}

            onChange={(e) => setPeriod(e.target.value)}

            className="
              rounded-xl
              bg-white
              px-4
              shadow
            "
          >
            <option value="All">All Time</option>

            <option value="1">Last 24 Hours</option>

            <option value="7">Last 7 Days</option>

            <option value="30">Last 30 Days</option>
          </select>
        </div>

        {/* Categories */}

        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory('All')}

            className={`
              rounded-full
              px-5
              py-2

              ${selectedCategory === 'All' ? 'bg-orange-500 text-white' : 'bg-white'}

            `}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category.id}

              onClick={() => setSelectedCategory(category.id)}

              className={`
                  rounded-full
                  px-5
                  py-2

                  ${
                    selectedCategory === category.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-white hover:bg-orange-500 hover:text-white'
                  }

                `}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Count */}

        <p className="mb-6 text-slate-500">
          Showing
          <span className="font-semibold"> {filteredItems.length} </span>
          items
        </p>

        {/* Cards */}

        <div
          className="
          grid
          gap-6
          sm:grid-cols-2
          lg:grid-cols-4
        "
        >
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}

              item={item}

              onView={() => navigate(`/items/${item.id}`)}

              onUpdate={loadItems}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Items;
