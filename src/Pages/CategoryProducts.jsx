import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaCartArrowDown, FaEye } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../hook/useAxiosPublic";
import toast from "react-hot-toast";
import useAuth from "../hook/useAuth";
import useAxiosSecure from "../hook/useAxiosSecure";

const CategoryProducts = () => {
  const { category } = useParams();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const axiosPublic = useAxiosPublic();
  const {user}= useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()


  const {data: categorys =[]}= useQuery({
    queryKey: ['category', category],
    queryFn: async () => {
      const {data} = await axiosPublic.get(`/medicine/${category}`)
      return data;
    }
  })

  const handleViewClick = (medicine) => {
    setSelectedMedicine(medicine);
    document.getElementById("my_modal_5").showModal();
  };

    // Calculate discounted price
    const calculateDiscountedPrice = (price, discount) => {
      return price - price * (discount / 100);
    };


      // ar to cart option
  const handleSelectCart = async (medicine) => {
    const discountPrice = calculateDiscountedPrice(
      medicine?.price,
      medicine?.discount
    );
    const selectCart = {
      name: medicine?.itemName,
      image: medicine?.image,
      price: discountPrice,
      quantity: medicine?.quantity,
      buyerEmail: user?.email,
      count: medicine?.counter,
      unitPrice: discountPrice,
      cartId: medicine?._id,
      sellerEmail : medicine?.seller?.email,
    };

    try {
      if (user) {
        await axiosSecure.post("/cart", selectCart);
        navigate("/cart-page");
        toast.success("Product added in the cart.");

      } else {
        navigate("/join-us/signup");
        toast.error("Please SignUp before making a purchase.");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };



  return (
    <div className="mx-auto max-w-[1440px] w-11/12 my-10">
      <div className=" mb-4 ">
        <h2 className="text-xl font-bold">Category : {category} Medicines</h2>
      </div>

      {categorys.length === 0 ? (
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
              {categorys.map((medicine, index) => (
                <tr key={medicine?._id}>
                  <th>{index + 1}</th>
                  <td>{medicine?.itemName}</td>
                  <td>{medicine?.company}</td>
                  <td>{medicine?.genericName}</td>
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
                onClick={()=> handleSelectCart(medicine)}
                  className="text-lg hover:scale-105 transition text-red-500"
                >
                  <FaCartArrowDown  />
                </button>
              </td>
                </tr>
               ))} 
            </tbody>
          </table>
        </div>
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


      
    </div>
  );
};

export default CategoryProducts;
