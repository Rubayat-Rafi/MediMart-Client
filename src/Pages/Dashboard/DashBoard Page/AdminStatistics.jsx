import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css"; 
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SalesBarChart from "../../../Components/SalesBarChart";

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: revenue = { paid: 0, pending: 0 } } = useQuery({
    queryKey: ["adminRevenue"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/admin/revenue`);
      return data;
    },
  });
  

    const handleSelect = (date) => {
      toast.error(date); 
    }
      

  return (
    <div>
      <div className="mt-12">
        {/* small cards */}
        <div className="mb-12  flex-grow">
        <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Paid Revenue */}
          <div className="bg-green-100 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-green-700">Total Paid Revenue</h2>
            <p className="text-2xl font-bold">{revenue.paid} Taka</p>
          </div>
  
          {/* Pending Revenue */}
          <div className="bg-yellow-100 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-yellow-700">Total Pending Revenue</h2>
            <p className="text-2xl font-bold">{revenue.pending} Taka</p>
          </div>
        </div>
      </div>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
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
    </div>
  );
};

export default AdminStatistics;
