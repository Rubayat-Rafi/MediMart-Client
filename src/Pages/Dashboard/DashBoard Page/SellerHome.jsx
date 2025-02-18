import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import SalesBarChart from "../../../Components/SalesBarChart";
import toast from "react-hot-toast";
import { Calendar } from "react-date-range";

const SellerHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: revenue = { paid: 0, pending: 0 }, isLoading } = useQuery({
    queryKey: ["revenue", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/seller/revenue/${user.email}`);
      return data;
    },
  });

  const handleSelect = (date) => {
    toast.success(date);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Seller Revenue</h1>
      <div className="grid grid-cols-2 gap-4">
        {/* Paid Revenue */}
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-green-700">
            Total Paid Revenue
          </h2>
          <p className="text-2xl font-bold">{revenue.paid} Taka</p>
        </div>

        {/* Pending Revenue */}
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-yellow-700">
            Total Pending Revenue
          </h2>
          <p className="text-2xl font-bold">{revenue.pending} Taka</p>
        </div>
      </div>
      <div className=" grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3 my-6">
        {/*Sales Bar Chart */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
          {/* Chart goes here.. */}
          <SalesBarChart revenue={revenue} />
        </div>
        {/* Calender */}
        <div className=" relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
          <Calendar date={new Date()} onChange={handleSelect} />
        </div>
      </div>
    </div>
  );
};

export default SellerHome;
