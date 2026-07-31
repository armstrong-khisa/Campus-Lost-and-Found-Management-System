import { ArrowLeft, MapPin, Clock, User, Tag, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function ItemDetails() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-orange-500 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Items
        </button>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* LEFT CONTENT */}

          <div className="rounded-3xl bg-white shadow p-8 order-2 md:order-1">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-slate-800">HP Laptop</h1>

              <span className="rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-red-500">
                Lost
              </span>
            </div>

            <p className="mt-4 text-slate-600 leading-relaxed">
              A silver HP laptop was lost around the campus library. It has a small sticker on the
              back cover.
            </p>

            {/* Details */}

            <div className="mt-6 space-y-4">
              <Info icon={<Tag size={20} />} title="Category" value="Electronics" />

              <Info icon={<MapPin size={20} />} title="Last Seen" value="Campus Library" />

              <Info icon={<Clock size={20} />} title="Lost Date" value="Yesterday at 2:30 PM" />

              <Info icon={<User size={20} />} title="Reported By" value="John Doe" />
            </div>

            {/* Claim Button */}

            <button className="mt-8 flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600">
              <CheckCircle size={18} />
              Claim Item
            </button>
          </div>

          {/* RIGHT IMAGE */}

          <div className="rounded-3xl overflow-hidden bg-white shadow order-1 md:order-2">
            <div className="h-[450px] bg-slate-200 flex items-center justify-center">
              <span className="text-slate-400">Item Image</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({ icon, title, value }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-11 w-11 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500">
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
