import { X, Upload } from "lucide-react";
import { useState } from "react";

function ClaimItemModal({ isOpen, onClose, item }) {

  const [message, setMessage] = useState("");

  if (!isOpen) return null;


  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">


      <div className="relative w-[450px] rounded-3xl bg-white p-6 shadow-xl">


        {/* Close */}

        <button

          onClick={onClose}

          className="
          absolute 
          right-5 
          top-5 
          text-slate-400 
          hover:text-slate-700
          "

        >

          <X size={22}/>

        </button>





        {/* Header */}

        <h2 className="text-2xl font-bold text-slate-800">

          Claim Item

        </h2>


        <p className="mt-1 text-sm text-slate-500">

          Provide details to prove this item belongs to you.

        </p>






        {/* Item Preview */}

        <div className="mt-5 flex gap-4 rounded-2xl bg-slate-50 p-4">


          <div className="h-20 w-20 rounded-xl bg-slate-200"></div>


          <div>

            <h3 className="font-semibold text-slate-800">

              {item?.name || "HP Laptop"}

            </h3>


            <p className="text-sm text-slate-500">

              {item?.location || "Library"}

            </p>


            <p className="text-sm text-slate-500">

              Lost item

            </p>


          </div>


        </div>







        {/* Claim Details */}

        <div className="mt-5">


          <label className="text-sm font-medium text-slate-700">

            Why is this your item?

          </label>


          <textarea

            value={message}

            onChange={(e)=>setMessage(e.target.value)}

            placeholder="Describe identifying details..."

            className="
            mt-2
            h-28
            w-full
            resize-none
            rounded-xl
            border
            border-slate-200
            p-3
            outline-none
            focus:border-orange-500
            "

          />


        </div>







        {/* Upload Proof */}

        <button

          className="
          mt-4
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-dashed
          border-orange-300
          py-3
          text-orange-500
          hover:bg-orange-50
          "

        >

          <Upload size={18}/>

          Upload Proof (optional)

        </button>








        {/* Submit */}

        <button

          className="
          mt-5
          h-11
          w-full
          rounded-xl
          bg-orange-500
          font-semibold
          text-white
          transition
          hover:bg-orange-600
          "

        >

          Submit Claim

        </button>




      </div>


    </div>

  );

}


export default ClaimItemModal;