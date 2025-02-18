import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../hook/useAxiosSecure";
import useAuth from "../hook/useAuth";
import { imageUpload } from "../utilities/utils";
import PropTypes from "prop-types";

const AddCategoryModal = ({ onClose, refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    const { categoryName, categoryImage } = data;
    const image = categoryImage[0];
    // sent image data to imgbb with imageUpload hook
    const photoURL = await imageUpload(image);
    const categoryData = {
      categoryName,
      photoURL,
      adminEmail: user?.email,
    };

    try {
      await axiosSecure.post("/category", categoryData);
      toast.success("Category post successfully!");
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
        <h2 className="text-lg font-bold mb-4">Post Category</h2>
        <form
          className="flex flex-col w-full text-xs md:text-sm space-y-2 md:space-y-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-center gap-2">
            <div className="">
              <input
                {...register("categoryName", {
                  required: "Category Name is requierd",
                })}
                placeholder="Banner Title"
                className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none"
              />
              {errors.categoryName && (
                <p className="text-red-500 text-xs">
                  {errors.categoryName.message}
                </p>
              )}
            </div>
            <div className="">
              <input
                type="file"
                {...register("categoryImage", {
                  required: "Photo is requierd",
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none"
              />
              {errors.categoryImage && (
                <p className="text-red-500 text-xs">
                  {errors.categoryImage.message}
                </p>
              )}
            </div>
          </div>
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

AddCategoryModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default AddCategoryModal;
