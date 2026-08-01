import { X, MapPin, Calendar } from 'lucide-react';
import { useState } from 'react';

function ReportItemModal({ isOpen, onClose }) {
  const [type, setType] = useState('Lost');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-[380px] overflow-hidden rounded-[30px] bg-white shadow-[0_20px_60px_rgba(0,0,0,.18)]">
        {/* Pattern Background */}

        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle,#F3E5D0 2px,transparent 2px)
            `,
            backgroundSize: '45px 45px',
          }}
        />

        <div className="relative z-10 p-5">
          {/* Close Button */}

          <button
            onClick={onClose}
            className="absolute right-5 top-5 text-slate-400 transition hover:text-slate-700"
          >
            <X size={20} />
          </button>

          {/* Header */}

          <h2 className="text-center text-xl font-bold text-slate-800">Report Item</h2>

          <p className="mt-1 text-center text-sm text-slate-500">
            Help the campus community find lost items.
          </p>

          {/* Lost / Found */}

          <div className="mt-4 flex gap-3">
            <button
              onClick={() => setType('Lost')}
              className={`flex-1 rounded-xl py-2.5 text-sm font-medium transition ${
                type === 'Lost' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Lost Item
            </button>

            <button
              onClick={() => setType('Found')}
              className={`flex-1 rounded-xl py-2.5 text-sm font-medium transition ${
                type === 'Found' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Found Item
            </button>
          </div>

          {/* Item Name */}

          <Input placeholder="Item name" />

          {/* Category */}

          <select
            className="
            mt-3
            h-10
            w-full
            rounded-xl
            border
            border-[#E8DED2]
            bg-white
            px-3
            text-sm
            outline-none
            focus:border-orange-500
            "
          >
            <option>Select category</option>

            <option>Electronics</option>

            <option>Documents</option>

            <option>Accessories</option>

            <option>Clothing</option>

            <option>Books</option>
          </select>

          {/* Location */}

          <div className="mt-3 flex h-10 items-center rounded-xl border border-[#E8DED2] px-3">
            <MapPin size={17} className="text-slate-400" />

            <input placeholder="Location" className="ml-2 w-full text-sm outline-none" />
          </div>

          {/* Date */}

          <div className="mt-3 flex h-10 items-center rounded-xl border border-[#E8DED2] px-3">
            <Calendar size={17} className="text-slate-400" />

            <input type="date" className="ml-2 w-full text-sm outline-none" />
          </div>

          {/* Description */}

          <textarea
            placeholder="Describe the item..."
            className="
            mt-3
            h-20
            w-full
            resize-none
            rounded-xl
            border
            border-[#E8DED2]
            p-3
            text-sm
            outline-none
            focus:border-orange-500
            "
          />

          {/* Image URL */}

          <div className="mt-3">
            <label className="text-sm font-medium text-slate-700">
              Image URL
              <span className="ml-1 text-slate-400">(optional)</span>
            </label>

            <input
              type="url"
              placeholder="Paste image link..."
              className="
              mt-2
              h-10
              w-full
              rounded-xl
              border
              border-[#E8DED2]
              px-3
              text-sm
              outline-none
              focus:border-orange-500
              "
            />
          </div>

          {/* Submit */}

          <button
            className="
            mt-4
            h-10
            w-full
            rounded-xl
            bg-orange-500
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-orange-600
            "
          >
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ placeholder }) {
  return (
    <input
      placeholder={placeholder}
      className="
      mt-3
      h-10
      w-full
      rounded-xl
      border
      border-[#E8DED2]
      px-3
      text-sm
      outline-none
      focus:border-orange-500
      "
    />
  );
}

export default ReportItemModal;
