import { useForm } from "react-hook-form";
import useAxiosSecure from "../hook/useAxiosSecure";
import { imageUpload } from "../utilities/utils";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import useAuth from "../hook/useAuth";
import useAxiosPublic from "../hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const AddMedicineModal = ({ onClose }) => {
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic()
  const { user } = useAuth();

  const {
    data: categorys = []
  } = useQuery({
    queryKey: ["categorys"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/categorys`);
      return data;
    },
  });

  const onSubmit = async (data) => {
    const image = data.image[0];
    // sent image data to imgbb with imageUpload hook
    const photoURL = await imageUpload(image);

    const {
      category,
      company,
      description,
      discount,
      genericName,
      itemName,
      mass,
      massUnit,
      price,
      quantity,
    } = data;

    const medicineData = {
      category,
      company,
      description,
      discount: parseFloat(discount || 0),
      genericName,
      itemName,
      mass: `${mass} ${massUnit}`,
      price: parseFloat(price),
      image: photoURL,
      quantity: parseFloat(quantity),
      counter: 0,
      seller: {
        name: user?.displayName,
        email: user?.email,
      },
    };

    try {
     await axiosSecure.post(`/medicine`, medicineData);

      toast.success("Medicine Added Successfully!");
    } catch (error) {
      toast.error(`An ${error} Happend.`);
    } finally {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
      <div className="bg-white p-4 md:p-6 rounded shadow-lg w-11/12 max-w-[700px]">
        <h2 className="text-lg font-bold mb-4">Add Medicine</h2>
        <form
          className="flex flex-col w-full text-xs md:text-sm space-y-2 md:space-y-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-center gap-2">
            <input
              {...register("itemName", { required: true })}
              placeholder="Item Name"
              className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none"
            />
            <input
              {...register("genericName", { required: true })}
              placeholder="Generic Name"
              className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none"
            />
          </div>
          <div className="w-full flex items-center gap-2">
            <input
              {...register("image", { required: true })}
              type="file"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none"
            />
            <select
              {...register("category", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none"
            >

              <option value="">Select Category</option>
              {categorys.map((category) => (
              <option key={category._id} value={category.categoryName}>{category.categoryName}</option>
              ))}
            </select>
          </div>
          <div className="w-full flex items-center gap-2">
            <select
              {...register("company", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none"
            >
              <option value="Healthcare Pharmaceuticals Ltd">
                Healthcare Pharmaceuticals Ltd
              </option>
              <option value="Renata Limited">Renata Limited</option>
              <option value="Square Pharmaceuticals PLC">
                Square Pharmaceuticals PLC
              </option>
            </select>
            <div className="w-full flex items-center gap-2">
              <input
                {...register("mass")}
                type="number"
                placeholder="20"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none"
              />
              <select
                {...register("massUnit")}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none"
              >
                <option value="">Select</option>
                <option value="Mg">Mg</option>
                <option value="ML">ML</option>
                <option value="Pads">Pads</option>
                <option value="Packet">Pack</option>
              </select>
            </div>
          </div>
          <div className="w-full flex items-center gap-2">
            <input
              {...register("price", { required: true })}
              type="number"
              placeholder="Price"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none"
            />
            <div className="flex w-full gap-2">
              <input
                {...register("discount")}
                type="number"
                placeholder="Discount (%)"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none"
              />

              <input
                {...register("quantity", { required: true })}
                type="number"
                placeholder="Quantity"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none"
              />
            </div>
          </div>
          <textarea
            {...register("description", { required: true })}
            placeholder="Short Description"
            className="w-full px-4 py-2 text-gray-700 border resize-none rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none"
          />
          <div className="mt-4">
            <button
              type="submit"
              className="bg-mainColor hover:bg-secondBgColor text-white px-4 py-2 rounded"
            >
              Add
            </button>
            <button onClick={onClose} className="ml-2">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddMedicineModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddMedicineModal;
