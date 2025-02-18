import { Helmet } from "react-helmet-async";
import useRole from "../../hook/useRole";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { Navigate } from "react-router-dom";
import AdminStatistics from "./DashBoard Page/AdminStatistics";


const Statistics = () => {
  const [role, isLoading] = useRole();
  if (isLoading) return <LoadingSpinner />;
  if (role === "user") return <Navigate to="/dashboard/payment-history" />;


  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {role === "admin" && <AdminStatistics />}
    </div>
  );
};

export default Statistics;
