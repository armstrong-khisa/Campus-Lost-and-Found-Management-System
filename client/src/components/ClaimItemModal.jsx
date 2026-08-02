import { X, Upload } from "lucide-react";
import { useState } from "react";
import api from "../services/api";


function ClaimItemModal({ 
  isOpen, 
  onClose, 
  item, 
  onSuccess 
}) {


  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");




  if (!isOpen) return null;





  async function handleSubmit(){


    if(loading) return;



    if(!message.trim()){

      setError(
        "Please describe why this item belongs to you."
      );

      return;

    }



    try{


      setLoading(true);

      setError("");



      const response = await api.post(
        "/claims",
        {
          item_id: item.id,

          message: message.trim()
        }
      );



      // refresh parent data
      if(onSuccess){

        await onSuccess();

      }



      setMessage("");

      onClose();



    }catch(err){



      setError(
        err.response?.data?.message ||
        "Failed to submit claim. Please try again."
      );



    }finally{


      setLoading(false);


    }


  }







  return (

    <div className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/40
      backdrop-blur-sm
    ">


      <div className="
        relative
        w-[450px]
        rounded-3xl
        bg-white
        p-6
        shadow-xl
      ">



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

        <h2 className="
          text-2xl
          font-bold
          text-slate-800
        ">

          Claim Item

        </h2>



        <p className="
          mt-1
          text-sm
          text-slate-500
        ">

          Provide details to prove this item belongs to you.

        </p>







        {/* Item Preview */}


        <div className="
          mt-5
          flex
          gap-4
          rounded-2xl
          bg-slate-50
          p-4
        ">


          <div className="
            h-20
            w-20
            overflow-hidden
            rounded-xl
            bg-slate-200
          ">


            {
              item?.image_url ? (

                <img

                  src={item.image_url}

                  alt={item.title}

                  className="
                    h-full
                    w-full
                    object-cover
                  "

                />

              ) : (

                <div className="
                  flex
                  h-full
                  items-center
                  justify-center
                  text-xs
                  text-slate-400
                ">

                  No Image

                </div>

              )
            }



          </div>





          <div>


            <h3 className="
              font-semibold
              text-slate-800
            ">

              {item?.title}

            </h3>




            <p className="
              text-sm
              text-slate-500
            ">

              {item?.location}

            </p>





            {
              item?.item_type && (

                <span
                  className={`
                    mt-1
                    inline-block
                    rounded-full
                    px-2
                    py-1
                    text-xs
                    font-medium

                    ${
                      item.item_type === "Lost"

                      ? 
                      "bg-red-100 text-red-600"

                      :

                      "bg-green-100 text-green-600"
                    }

                  `}
                >

                  {item.item_type}

                </span>

              )
            }



          </div>



        </div>







        {/* Message */}


        <div className="mt-5">


          <label className="
            text-sm
            font-medium
            text-slate-700
          ">

            Why is this your item?

          </label>



          <textarea

            value={message}

            onChange={(e)=>{

              setMessage(e.target.value);

              setError("");

            }}

            placeholder="
              Describe identifying details...
            "

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







        {/* Upload placeholder */}


        <button

          disabled

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
            text-orange-400
          "

        >

          <Upload size={18}/>

          Upload Proof (Coming Soon)

        </button>








        {/* Error */}


        {
          error && (

            <p className="
              mt-4
              text-center
              text-sm
              text-red-500
            ">

              {error}

            </p>

          )
        }








        {/* Submit */}


        <button

          onClick={handleSubmit}

          disabled={loading}

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
            disabled:cursor-not-allowed
            disabled:opacity-60
          "

        >

          {
            loading

            ?

            "Submitting..."

            :

            "Submit Claim"
          }


        </button>




      </div>


    </div>

  );

}


export default ClaimItemModal;