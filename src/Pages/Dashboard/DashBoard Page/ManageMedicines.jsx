import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import toast from "react-hot-toast";
import AddMedicineModal from "../../../Modal/AddMedicineModal";

const ManageMedicines = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: medicines = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["medicines", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/medicines/${user?.email}`);
      return data;
    },
  });



  refetch();
  if (isLoading) return <LoadingSpinner />;

  const handleViewClick = (medicine) => {
    setSelectedMedicine(medicine);
    document.getElementById("my_modal_5").showModal();
  };

  // Calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    return price - price * (discount / 100);
  };

  // delete medicine
  const handleDeleteMedicine = async (id) => {
    try {
      await axiosSecure.delete(`/delete/${id}`);
      // Refetch the data after deletion
      toast.success("Successfully Deleted.");
      refetch();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Manage Medicines</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-mainColor hover:bg-secondBgColor text-white p-2 rounded"
        >
          Add Medicine
        </button>
      </div>

      {medicines.length === 0 ? (
        <div>No Data Found...</div>
      ) : (
        <div className="overflow-x-auto border  rounded-lg">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Medicine Name</th>
                <th>Company</th>
                <th>Generic Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {medicines.map((medicine, index) => (
                <tr key={medicine._id}>
                  <th>{index + 1}</th>
                  <td>{medicine.itemName}</td>
                  <td>{medicine.company}</td>
                  <td>{medicine.genericName}</td>
                  <td>
                    {calculateDiscountedPrice(
                      medicine.price,
                      medicine.discount
                    )}
                  </td>
                  <td className="flex items-center gap-2  justify-between">
                    <button
                      className="text-lg hover:scale-105 transition text-primaryTextColor"
                      onClick={() => handleViewClick(medicine)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="text-xl hover:scale-105 transition text-red-500"
                      onClick={() => handleDeleteMedicine(medicine._id)}
                    >
                      <MdDeleteForever />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <AddMedicineModal onClose={() => setIsModalOpen(false)} />
      )}

      {/* Modal for viewing specific medicine */}
      {selectedMedicine && (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <div className="w-full h-full object-cover">
              <img className="rounded-lg" src={selectedMedicine.image} />
            </div>
            <div className="space-y-2 mt-3">
              <div className="flex  items-end gap-2">
                <h3 className="font-bold text-xl">
                  {selectedMedicine.itemName}
                </h3>
                <p className="text-[12px]">{selectedMedicine.mass}</p>
              </div>
              <p className="text-green-500 font-semibold">
                {selectedMedicine.genericName}
              </p>
              <div>
                <p className="mb-2">{selectedMedicine.company}</p>
                <div className="flex items-center gap-6">
                  <p className="flex items-center font-semibold text-lg gap-1 ">
                    <FaBangladeshiTakaSign />
                    {calculateDiscountedPrice(
                      selectedMedicine.price,
                      selectedMedicine.discount
                    )}
                  </p>
                  <p className="flex items-center line-through text-red-500 text-sm gap-1 ">
                    <FaBangladeshiTakaSign /> {selectedMedicine.price}.00
                  </p>
                </div>
                <p className="text-xs mt-2">{selectedMedicine.description}</p>
              </div>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default ManageMedicines;
