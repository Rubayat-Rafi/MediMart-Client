import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import PropTypes from 'prop-types';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SalesBarChart = ({revenue}) => {
  const data = {
    labels: ["Paid", "Pending"], 
    datasets: [
      {
        label: "Sales Revenue ($)",
        data: [revenue.paid, revenue.pending], 
        backgroundColor: ["#4CAF50", "#FFC107"], 
        borderColor: ["#388E3C", "#FFA000"], 
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Sales Revenue</h2>
      <Bar data={data} options={options} />
    </div>
  );
};


SalesBarChart.propTypes = {
  revenue: PropTypes.shape({
    paid: PropTypes.number.isRequired,
    pending: PropTypes.number.isRequired,
  }).isRequired,
};

export default SalesBarChart;

