import { X, MapPin, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../services/api";

function ReportItemModal({ isOpen, onClose }) {
  const [type, setType] = useState("Lost");

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    category_id: "",
    location: "",
    date: "",
    description: "",
    image_url: "",
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await api.get("/categories");
        setCategories(data);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchCategories();
  }, []);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit() {
    if (
      !form.title ||
      !form.category_id ||
      !form.location ||
      !form.description
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.post("/items", {
        title: form.title,
        description: form.description,
        item_type: type,
        location: form.location,
        category_id: Number(form.category_id),
        image_url: form.image_url || null,
      });

      alert(response.message);

      setForm({
        title: "",
        category_id: "",
        location: "",
        date: "",
        description: "",
        image_url: "",
      });

      setType("Lost");

      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

    <div className="relative w-[380px] overflow-hidden rounded-[30px] bg-white shadow-[0_20px_60px_rgba(0,0,0,.18)]">

      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle,#F3E5D0 2px,transparent 2px)",
          backgroundSize: "45px 45px",
        }}
      />

      <div className="relative z-10 p-5">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-center text-xl font-bold text-slate-800">
          Report Item
        </h2>

        <p className="mt-1 text-center text-sm text-slate-500">
          Help the campus community find lost items.
        </p>

        {/* Lost / Found */}
        <div className="mt-4 flex gap-3">

          <button
            onClick={() => setType("Lost")}
            className={`flex-1 rounded-xl py-2.5 text-sm font-medium ${
              type === "Lost"
                ? "bg-orange-500 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            Lost Item
          </button>

          <button
            onClick={() => setType("Found")}
            className={`flex-1 rounded-xl py-2.5 text-sm font-medium ${
              type === "Found"
                ? "bg-orange-500 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            Found Item
          </button>

        </div>

        {/* Title */}

        <Input
          name="title"
          placeholder="Item name"
          value={form.title}
          onChange={handleChange}
        />

        {/* Category */}

        <select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          className="mt-3 h-10 w-full rounded-xl border border-[#E8DED2] bg-white px-3 text-sm outline-none focus:border-orange-500"
        >
          <option value="">Select category</option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}

        </select>

        {/* Location */}

        <div className="mt-3 flex h-10 items-center rounded-xl border border-[#E8DED2] px-3">

          <MapPin
            size={17}
            className="text-slate-400"
          />

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="ml-2 w-full text-sm outline-none"
          />

        </div>

        {/* Date */}

        <div className="mt-3 flex h-10 items-center rounded-xl border border-[#E8DED2] px-3">

          <Calendar
            size={17}
            className="text-slate-400"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="ml-2 w-full text-sm outline-none"
          />

        </div>

        {/* Description */}

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe the item..."
          className="mt-3 h-20 w-full resize-none rounded-xl border border-[#E8DED2] p-3 text-sm outline-none focus:border-orange-500"
        />

        {/* Image URL */}

        <div className="mt-3">

          <label className="text-sm font-medium text-slate-700">
            Image URL
          </label>

          <input
            type="url"
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            placeholder="Paste image link..."
            className="mt-2 h-10 w-full rounded-xl border border-[#E8DED2] px-3 text-sm outline-none focus:border-orange-500"
          />

        </div>

        {error && (
          <p className="mt-3 text-center text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 h-10 w-full rounded-xl bg-orange-500 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Report"}
        </button>

      </div>

    </div>

  </div>
);
}
function Input({
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-3 h-10 w-full rounded-xl border border-[#E8DED2] px-3 text-sm outline-none focus:border-orange-500"
    />
  );
}

export default ReportItemModal;