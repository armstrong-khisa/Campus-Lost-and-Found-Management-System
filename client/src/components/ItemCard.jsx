import { MapPin, Clock, ArrowRight, ImageOff } from "lucide-react";

function ItemCard({ item, onView }) {
  const isLost = item.item_type === "Lost";

  return (
    <div
      onClick={onView}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-slate-100">
        {item.image_url ? (
          <>
            <img
              src={item.image_url}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-slate-400">
            <ImageOff size={30} />
            <span className="mt-2 text-xs font-medium">
              No Image Available
            </span>
          </div>
        )}

        {/* Lost / Found Badge */}
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white shadow ${
            isLost ? "bg-red-500" : "bg-emerald-500"
          }`}
        >
          {item.item_type}
        </span>

        {/* Status */}
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700">
          {item.status}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="line-clamp-1 text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-orange-600">
            {item.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
            {item.description}
          </p>

          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <MapPin
                size={16}
                className="shrink-0 text-orange-500"
              />
              <span>{item.location}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Clock
                size={16}
                className="shrink-0 text-sky-500"
              />
              <span>
                {new Date(item.date_reported).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onView();
          }}
          className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-orange-500 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          View Details

          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
}

export default ItemCard;