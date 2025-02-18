import { useState } from "react";
import AddCategoryModal from "../../../Modal/AddCategoryModal";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import toast from "react-hot-toast";

const ManageCategory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: categorys = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categorys", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/categorys/${user?.email}`);
      return data;
    },
  });

  // detele category request
  const handleDeleteCategory = async (id) => {
    try{
      await axiosSecure.delete(`/delete/category/${id}`)
      toast.success('Successfully Deleted.')
      refetch()
    }catch(err){
      toast.error('Error Happend!', err)
    }



  };

  // mordan delete
  const mordanDelete = (id) => {
    toast((t) => (
      <div className="flex gap-3 items-center">
        <div>
          <p>
            You Want To <b>Delete?</b>
          </p>
        </div>
        <div className="gap-2 flex">
          <button
            className="bg-red-400 text-white px-3 py-1 rounded-md"
            onClick={() => {
              toast.dismiss(t.id);
              handleDeleteCategory(id);
            }}
          >
            Yes
          </button>
          <button
            className="bg-green-400 text-white px-3 py-1 rounded-md"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </div>
    ));
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Manage Category</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-mainColor hover:bg-secondBgColor text-white p-2 rounded"
        >
          Add Category
        </button>
      </div>

      {/* table */}
      {categorys.length === 0 ? (
        <div>No Data Found...</div>
      ) : (
        <div className="overflow-x-auto border  rounded-lg">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Category Image</th>
                <th>Category Name</th>
                <th>Admin Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {categorys.map((category, index) => (
                <tr key={category?._id}>
                  <th>{index + 1}</th>
                  <td>
                    <img
                      src={category?.photoURL}
                      alt="medicine image"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>
                  <td>{category?.categoryName}</td>

                  <td>{category?.adminEmail}</td>
                  {/* delete button  */}
                  <td>
                    <button onClick={()=> mordanDelete(category?._id)} className="bg-red-500/20 text-red-600 py-1 px-3 rounded-full hover:bg-red-500/40 transition">
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* open ads post modal  */}
      {isModalOpen && (
        <AddCategoryModal
          refetch={refetch}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ManageCategory;
