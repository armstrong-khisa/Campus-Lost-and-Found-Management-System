import { SearchX, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 text-orange-500">
          <SearchX size={48} />
        </div>

        {/* Error */}
        <h1 className="text-7xl font-bold text-slate-800">404</h1>

        <h2 className="mt-3 text-2xl font-bold text-slate-800">Page Not Found</h2>

        <p className="mt-3 text-slate-500">
          Looks like this page got lost. Just like a missing item, we can help you find your way
          back.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate('/')}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 transition"
        >
          <ArrowLeft size={18} />
          Back Home
        </button>
      </div>
    </section>
  );
}

export default NotFound;
