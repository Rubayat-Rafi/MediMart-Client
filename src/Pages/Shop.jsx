import { FaSearch } from "react-icons/fa";
import ShopTable from "../Components/ShopTable";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hook/useAxiosPublic";
import { useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import useAuth from "../hook/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosSecure from "../hook/useAxiosSecure";
import LoadingSpinner from "../Components/LoadingSpinner";


const Shop = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure()
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('');



  const {
    data: medicines = []

  } = useQuery({
    queryKey: ["medicines", filter, search],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/shop-medicine?search=${search}&filter=${filter}`);
      return data;
    },
  });

  const {
    data: categorys = []
  } = useQuery({
    queryKey: ["categorys"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/categorys`);
      return data;
    },
  });



  // if (isLoading) return <LoadingSpinner />;

  const handleViewClick = (medicine) => {
    setSelectedMedicine(medicine);
    document.getElementById("my_modal_5").showModal();
  };

  // Calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    return price - price * (discount / 100);
  };

  // add to cart option
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
      sellerEmail: medicine?.seller?.email,
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
    <div className="mx-auto max-w-[1440px] w-11/12">
      <h1 className="text-xl font-bold my-4">Shop Page</h1>

      <div className="flex items-center justify-between">
        {/* Search Input */}
        <div className="mb-4 w-full flex items-center gap-2">
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none"
          />
          <button className="">
            <FaSearch />
          </button>
        </div>

        {/* filter section  */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className=" mb-4 w-full max-w-xs px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none">
          <option value="">All Categories</option>
          {categorys.map((category) => (
            <option key={category._id} value={category.categoryName}>{category.categoryName}</option>
          ))}
        </select>
      </div>
      {/* shop table  */}
      <div className="border rounded-lg mb-10">
        <ShopTable
          handleSelectCart={handleSelectCart}
          calculateDiscountedPrice={calculateDiscountedPrice}
          handleViewClick={handleViewClick}
          medicines={medicines}
        />
      </div>

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

export default Shop;
