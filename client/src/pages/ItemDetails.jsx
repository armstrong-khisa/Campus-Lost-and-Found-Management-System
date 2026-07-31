import {
  ArrowLeft,
  MapPin,
  Clock,
  User,
  Tag,
  CheckCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ClaimItemModal from '../components/ClaimItemModal';

function ItemDetails() {
  const navigate = useNavigate();
  const [claimOpen, setClaimOpen] = useState(false);

  const item = {
    name: 'HP Laptop',
    location: 'Campus Library',
    type: 'Lost',
  };

  return (
    <section className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-6xl px-6">
        {/* Back Button */}

        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-slate-600 transition hover:text-orange-500"
        >
          <ArrowLeft size={20} />
          Back to Items
        </button>

        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* LEFT CONTENT */}

          <div className="order-2 rounded-3xl bg-white p-8 shadow md:order-1">
            <div className="flex items-start justify-between">
              <h1 className="text-3xl font-bold text-slate-800">
                {item.name}
              </h1>

              <span className="rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-red-500">
                {item.type}
              </span>
            </div>

            <p className="mt-4 leading-relaxed text-slate-600">
              A silver HP laptop was lost around the campus library. It has a
              small sticker on the back cover.
            </p>

            {/* Details */}

            <div className="mt-6 space-y-4">
              <Info
                icon={<Tag size={20} />}
                title="Category"
                value="Electronics"
              />

              <Info
                icon={<MapPin size={20} />}
                title="Last Seen"
                value={item.location}
              />

              <Info
                icon={<Clock size={20} />}
                title="Lost Date"
                value="Yesterday at 2:30 PM"
              />

              <Info
                icon={<User size={20} />}
                title="Reported By"
                value="John Doe"
              />
            </div>

            {/* Claim Button */}

            <button
              onClick={() => setClaimOpen(true)}
              className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 font-semibold text-white transition hover:bg-orange-600"
            >
              <CheckCircle size={18} />
              Claim Item
            </button>
          </div>

          {/* RIGHT IMAGE */}

          <div className="order-1 overflow-hidden rounded-3xl bg-white shadow md:order-2">
            <div className="flex h-[450px] items-center justify-center bg-slate-200">
              <span className="text-slate-400">Item Image</span>
            </div>
          </div>
        </div>
      </div>

      <ClaimItemModal
        isOpen={claimOpen}
        onClose={() => setClaimOpen(false)}
        item={item}
      />
    </section>
  );
}

function Info({ icon, title, value }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
        {icon}
      </div>

      <div>
        <p className="text-sm text-slate-400">{title}</p>

        <p className="font-medium text-slate-700">{value}</p>
      </div>
    </div>
  );
}

export default ItemDetails;