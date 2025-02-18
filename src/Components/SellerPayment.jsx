import toast from "react-hot-toast";
import useAxiosSecure from "../hook/useAxiosSecure";
import PropTypes from 'prop-types';

const SellerPayment = ({ orders, refetch }) => {
    const axiosSecure = useAxiosSecure()

    const handleOrderStatus = async( id ) => {

        try {
             await axiosSecure.patch(`/order/status/${id}`, { status: "paid" });
            toast.success("Order status updated successfully:" );
            refetch()
          } catch (err) {
            console.error("Error updating order status:", err);
          }
    }


  return (
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th></th>
          <th>Order Id</th>
          <th>Order Amount</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
        {orders.map((order, idx) => (
          <tr key={order?._d}>
            <th>{idx + 1}</th>
            <td>{order?.paymentIntentId}</td>
            <td>$ {(order?.totalPrice / 100).toFixed(2)}</td>
            <td>
              <span
                className={`${
                  order.status === "pending" && "bg-yellow-500/30 text-black"
                } ${
                  order.status === "paid" && "bg-green-500/30 text-black"
                }  py-1 px-3 rounded-full text-[10px]`}
              >
                {order.status}
              </span>
            </td>
            <td>
              <button className="px-3 py-1 rounded-md bg-mainColor text-white hover:bg-secondBgColor" disabled={order?.status === 'paid' }  onClick={()=> handleOrderStatus(order?._id)} >Confirm</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

SellerPayment.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      paymentIntentId: PropTypes.string.isRequired,
      totalPrice: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  refetch: PropTypes.func.isRequired,
};

export default SellerPayment;


