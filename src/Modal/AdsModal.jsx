import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import useAuth from "../hook/useAuth";
import useAxiosSecure from "../hook/useAxiosSecure";
import toast from "react-hot-toast";
import { imageUpload } from "../utilities/utils";

const AdsModal = ({ onClose, refetch }) => {
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    const { medicineName, photo, description } = data;

    const image = photo[0];
    // sent image data to imgbb with imageUpload hook
    const photoURL = await imageUpload(image);

    const medicineData = {
      medicineName,
      description,
      photoURL,
      sellerEmail: user?.email,
      status: "pending",
    };

    try {
      await axiosSecure.post("/ads-medicine", medicineData);
      toast.success("Request Successfully Sent!");
      refetch();
    } catch (error) {
      toast.error(`An ${error} Happend.`);
    } finally {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
      <div className="bg-white p-4 md:p-6 rounded shadow-lg w-11/12 max-w-[600px]">
        <h2 className="text-lg font-bold mb-4">Post Ads</h2>
        <form
          className="flex flex-col w-full text-xs md:text-sm space-y-2 md:space-y-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-center gap-2">
            <input
              {...register("medicineName", { required: true })}
              placeholder="Banner Title"
              className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none"
            />
            <input
              type="file"
              {...register("photo", { required: "Photo is requierd" })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none"
            />
          </div>
          <textarea
            {...register("description", { required: true })}
            placeholder="Banner Short Description"
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

AdsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default AdsModal;
