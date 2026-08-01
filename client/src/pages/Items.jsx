import { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import api from "../services/api";

function Items() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = [
    "All",
    "Electronics",
    "Clothing",
    "Books",
    "Accessories",
    "Other",
  ];

  useEffect(() => {
    async function fetchItems() {
      try {
        const data = await api.get("/items");
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-lg">
        Loading items...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500">
        {error}
      </div>
    );
  }

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
                category === "All"
                  ? "bg-orange-500 text-white"
                  : "bg-white hover:bg-orange-500 hover:text-white"
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
              onView={() => navigate(`/items/${item.id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Items;