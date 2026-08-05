import { ArrowLeft, MapPin, Clock, User, Tag, CheckCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../services/api';
import ClaimItemModal from '../components/ClaimItemModal';

function ItemDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [claimOpen, setClaimOpen] = useState(false);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Scroll to top whenever this page opens
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    async function fetchItem() {
      try {
        const data = await api.get(`/items/${id}`);
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium text-slate-600">Loading item...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

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

        <div className="grid gap-8 md:grid-cols-2">
          {/* LEFT */}
          <div className="rounded-3xl bg-white p-8 shadow">
            <div className="flex items-start justify-between">
              <h1 className="text-3xl font-bold text-slate-800">{item.title}</h1>

              <span
                className={`rounded-full px-4 py-1 text-sm font-semibold text-white ${
                  item.item_type === 'Lost' ? 'bg-red-500' : 'bg-emerald-500'
                }`}
              >
                {item.item_type}
              </span>
            </div>

            <p className="mt-5 leading-7 text-slate-600">{item.description}</p>

            <div className="mt-8 space-y-5">
              <Info
                icon={<Tag size={20} />}
                title="Category"
                value={`Category #${item.category}`}
              />

              <Info icon={<MapPin size={20} />} title="Location" value={item.location} />

              <Info
                icon={<Clock size={20} />}
                title="Reported"
                value={new Date(item.date_reported).toLocaleString()}
              />

              <Info icon={<User size={20} />} title="Status" value={item.status} />
            </div>

            <button
              onClick={() => setClaimOpen(true)}
              className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 font-semibold text-white transition hover:bg-orange-600"
            >
              <CheckCircle size={18} />
              Claim Item
            </button>
          </div>

          {/* RIGHT */}
          <div className="overflow-hidden rounded-3xl bg-white shadow">
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.title}
                className="h-[500px] w-full object-cover"
              />
            ) : (
              <div className="flex h-[500px] items-center justify-center bg-slate-200">
                <span className="text-slate-500">No Image Available</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <ClaimItemModal isOpen={claimOpen} onClose={() => setClaimOpen(false)} item={item} />
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
