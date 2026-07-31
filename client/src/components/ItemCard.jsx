import { MapPin, Clock } from "lucide-react";

function ItemCard({ item, onView }) {

  return (

    <div className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-lg">


      {/* Image */}

      <div className="h-48 bg-slate-200">

        {item.image && (

          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
          />

        )}

      </div>





      {/* Content */}

      <div className="p-4">


        <div className="flex items-start justify-between">


          <h2 className="font-semibold text-slate-800">

            {item.name}

          </h2>



          <span
            className={`
            text-sm font-medium
            ${
              item.type === "Lost"
              ?
              "text-red-500"
              :
              "text-green-500"
            }
            `}
          >

            {item.type}

          </span>


        </div>





        <div className="mt-3 space-y-1">


          <p className="flex items-center gap-2 text-sm text-slate-500">

            <MapPin size={15}/>

            {item.location}

          </p>




          <p className="flex items-center gap-2 text-sm text-slate-500">

            <Clock size={15}/>

            {item.date}

          </p>


        </div>







        <button

          onClick={onView}

          className="
          mt-5
          font-medium
          text-orange-500
          transition
          hover:text-orange-600
          "

        >

          View Details →

        </button>




      </div>


    </div>

  );

}


export default ItemCard;