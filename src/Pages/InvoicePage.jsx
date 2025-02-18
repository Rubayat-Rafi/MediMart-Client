import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

const InvoicePage = () => {
  const location = useLocation();
  const paymentData = location.state?.paymentData;

  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });

  if (!paymentData) {
    return <p>Loading payment details...</p>;
  }

  return (
    <div className="p-6 max-w-[1440px] w-11/12 mx-auto my-10">
      <div ref={contentRef} className="border border-gray-300 p-5 rounded-md">
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold text-primaryTextColor">MediMart</h1>
          <p>Invoice</p>
        </div>
        <div className="flex items-center my-5 gap-5">
          <div className="w-full">
            <h2 className="font-bold">Customer Information</h2>
            <p>Name: {paymentData?.billing_details?.name}</p>
            <p>Email: {paymentData?.billing_details?.email}</p>
          </div>
          <div className="w-full">
            <h2 className="font-bold">Purchase Information</h2>
            <p>
              Grand Total: $
              {paymentData?.amount
                ? (paymentData.amount / 100).toFixed(2)
                : "0.00"}
            </p>
            <p>Payment ID: {paymentData?.id}</p>
          </div>
        </div>
      </div>

      <button
      onClick={() => reactToPrintFn()}
      className="bg-mainColor hover:bg-secondBgColor transition text-white px-4 py-2 rounded-md mt-4">
        Print Invoice
      </button>
    </div>
  );
};

export default InvoicePage;
