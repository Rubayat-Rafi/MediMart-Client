import useAxiosSecure from "../../../hook/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { Button } from "@headlessui/react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import useCart from "../../../hook/useCart";
import useAuth from "../../../hook/useAuth";


const CartPage = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [carts, isLoading, refetch] = useCart();
  const {user} = useAuth();

  if (isLoading) return <LoadingSpinner />;

  const handleCartDelete = async (id) => {
    await axiosSecure.delete(`/detele-cart/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        toast.success("Delete Successfully!");
        refetch();
      }
    });
  };
  //mordan delete
  const mordandelete = (id) => {
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
              handleCartDelete(id);
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

  // clear cart all product
  const handleClearCartProduct = (carts) => {
    if (carts.length === 0) {
      toast.error("please add cart before checkout.");
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // delete all carts
          try {

            await axiosSecure.delete(`/detele-carts/${user.email}`);
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          } catch (err) {
            toast.error(err);
          }
        }
      });
    }
  };

  // checkout page
  const handleCheckoutPage = () => {
    if (carts.length === 0) {
      toast.error("please add cart before checkout.");
    } else {
      const hasZeroQuantity = carts.some((item) => item.count === 0);

      if (hasZeroQuantity) {
        toast.error("Please ensure all items in the cart have a quantity greater than 0.");
        return;
      }
    
      navigate("/checkout-page");
    }
  };

  const handleUpdateCart = async (id, price, quantity, count, action) => {

    if (action === "increase" && quantity <= 0) {
      return toast.error("Stock not available!");
    }
    if (action === "decrease" && count <= 0) {
      return toast.error("Cannot decrease below 0!");
    }

    await axiosSecure
      .patch(`/update-count/${id}`, {
        action,
        price,
        quantity,
        count,
      })
      .then((res) => {
        if (res.status === 200) {
          refetch(); 
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Something went wrong!");
      });
  };

  return (
    <div className="mx-auto max-w-[1440px] w-11/12 mb-10">
      <div className="flex items-center justify-between my-5">
        <div>
          <h1 className="text-xl font-bold">My Cart</h1>
        </div>
        {/* buttons  */}
        <div>
          <Button
            onClick={() => handleClearCartProduct(carts)}
            className=" mx-2 rounded-md bg-mainColor py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-secondBgColor data-[open]:bg-secondBgColor data-[focus]:outline-1 data-[focus]:outline-white"
          >
            Clear Cart
          </Button>

          <Button
            onClick={handleCheckoutPage}
            className=" mx-2 rounded-md bg-mainColor py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-secondBgColor data-[open]:bg-secondBgColor data-[focus]:outline-1 data-[focus]:outline-white"
          >
            Checkout
          </Button>
        </div>
      </div>

      {carts.length === 0 ? (
        <div>No data found. <Link to={`/shop`} className="px-2 py-1 bg-mainColor text-white rounded-sm hover:bg-secondBgColor transition" >Shop Now</Link> </div>
      ) : (
        <div className="border rounded-lg ">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Medicine Image</th>
                  <th>Medicine Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Count</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {carts.map((cart, idx) => (
                  <tr key={cart._id}>
                    <th>{idx + 1}</th>
                    <td>
                      <img
                        className="w-16 h-16 rounded-lg object-cover"
                        src={cart.image}
                      />
                    </td>
                    <td>{cart.name}</td>
                    <td>{(cart.price).toFixed(2)} Taka</td>
                    <td>{cart?.quantity}</td>
                    <td className="space-x-3">
                      <button
                        onClick={() =>
                          handleUpdateCart(
                            cart?._id,
                            cart?.price,
                            cart?.quantity,
                            cart?.count,
                            "increase"
                          )
                        }
                        className="py-1 px-2 bg-mainColor text-white rounded-md hover:bg-secondBgColor "
                      >
                        +
                      </button>
                      <span>{cart.count}</span>
                      <button
                        onClick={() =>
                          handleUpdateCart(
                            cart?._id,
                            cart?.price,
                            cart?.quantity,
                            cart?.count,
                            "decrease"
                          )
                        }
                        className=" px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 "
                      >
                        -
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => mordandelete(cart._id)}
                        className=" font-bold text-xl hover:scale-105 transition text-red-500"
                      >
                        <MdDeleteForever />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
