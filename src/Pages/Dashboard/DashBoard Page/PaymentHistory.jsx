import SellerPayment from "../../../Components/SellerPayment";
import UserPayment from "../../../Components/UserPayment";
import useOrders from "../../../hook/useOrders";
import useRole from "../../../hook/useRole";

const PaymentHistory = () => {
  const [orders, , refetch] = useOrders();
  const [role] = useRole();






  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold"> Order Status </h2>
      </div>

      {/* table */}
      {orders.length === 0 ? (
        <div>No Data Found...</div>
      ) : (
        <div className="overflow-x-auto border  rounded-lg">
            {role === 'user' &&  <UserPayment orders={orders} />}
            {role === 'seller' &&  <SellerPayment refetch={refetch} orders={orders}/>}
        </div>
      )}
    </>
  );
};

export default PaymentHistory;
