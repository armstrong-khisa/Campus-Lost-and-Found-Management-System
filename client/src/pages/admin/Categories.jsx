import { Search, Tags, FolderOpen, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../services/api";


function Categories() {

  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);



  async function loadData() {

    try {

      const categoriesData = await api.get("/categories");
      const itemsData = await api.get("/items");


      const formatted = categoriesData.map(category => ({
        ...category,
        items: itemsData.filter(
          item => item.category_id === category.id
        ).length
      }));


      setCategories(formatted);
      setItems(itemsData);


    } catch(err) {

      console.log(err.message);

    } finally {

      setLoading(false);

    }

  }



  useEffect(() => {

    loadData();

  }, []);




  async function deleteCategory(id) {

    try {

      await api.delete(`/categories/${id}`);

      loadData();

    } catch(err) {

      console.log(err.message);

    }

  }



  const filteredCategories = categories.filter(category =>
    category.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );



  if(loading){

    return (
      <div className="p-10 text-slate-600">
        Loading categories...
      </div>
    );

  }



  return (

    <section className="min-h-screen bg-slate-50 p-6 md:p-10">


      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Categories
          </h1>

          <p className="mt-2 text-slate-500">
            Manage item categories available on the platform.
          </p>

        </div>


        <button
          className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-orange-500
          px-5
          py-3
          font-medium
          text-white
          hover:bg-orange-600
          "
        >

          <Plus size={18}/>
          Add Category

        </button>


      </div>





      <div className="mt-8 grid gap-5 md:grid-cols-2">


        <StatCard
          title="Categories"
          value={categories.length}
          icon={<Tags size={22}/>}
          color="bg-orange-100 text-orange-500"
        />


        <StatCard
          title="Items Categorized"
          value={items.length}
          icon={<FolderOpen size={22}/>}
          color="bg-blue-100 text-blue-500"
        />


      </div>





      <div className="mt-8 flex items-center rounded-xl bg-white px-4 py-3 shadow-sm">

        <Search
          size={20}
          className="text-slate-400"
        />

        <input

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          placeholder="Search categories..."

          className="ml-3 w-full outline-none"

        />


      </div>







      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">


        <table className="w-full">


          <thead className="bg-slate-100">

            <tr className="text-left">

              <th className="px-6 py-4">
                Category
              </th>


              <th>
                Total Items
              </th>


              <th className="text-center">
                Actions
              </th>


            </tr>

          </thead>




          <tbody>


          {filteredCategories.length === 0 ? (

            <tr>

              <td
                colSpan="3"
                className="py-8 text-center text-slate-500"
              >
                No categories found.
              </td>

            </tr>


          ) : (


            filteredCategories.map(category => (

              <tr
                key={category.id}
                className="border-t"
              >


                <td className="px-6 py-5 font-medium text-slate-800">

                  {category.name}

                </td>



                <td className="text-slate-600">

                  {category.items}

                </td>




                <td>


                  <div className="flex justify-center gap-3">


                    <button
                      className="
                      rounded-lg
                      bg-orange-500
                      px-4
                      py-2
                      text-sm
                      text-white
                      hover:bg-orange-600
                      "
                    >
                      Edit
                    </button>




                    <button

                      onClick={()=>deleteCategory(category.id)}

                      className="
                      rounded-lg
                      border
                      border-red-200
                      px-4
                      py-2
                      text-sm
                      text-red-500
                      hover:bg-red-50
                      "
                    >

                      Delete

                    </button>


                  </div>


                </td>


              </tr>


            ))

          )}


          </tbody>


        </table>


      </div>


    </section>

  );

}




function StatCard({
  title,
  value,
  icon,
  color
}) {

return (

<div className="rounded-2xl bg-white p-5 shadow-sm">


<div
className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}
>
{icon}
</div>


<h2 className="mt-4 text-3xl font-bold text-slate-800">
{value}
</h2>


<p className="text-slate-500">
{title}
</p>


</div>

);

}


export default Categories;