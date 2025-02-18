import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import jsPDF from "jspdf";
import "jspdf-autotable";

const SalesReportPage = () => {
  const axiosSecure = useAxiosSecure();

  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin-orders");
      return data;
    },
  });

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.text("Sales Report", 14, 10);

    const tableColumn = ["Seller Email", "Buyer Email", "Total Price"];
    const tableRows = orders.map((order) => [
      order.sellerEmail,
      order.buyerEmail,
      `$${order.totalPrice.toFixed(2)}`,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("sales_report.pdf");
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-2 mb-4 justify-between">
        <h1 className="text-2xl font-bold mb-4">Sales Report</h1>
        <button
          onClick={handleDownloadPDF}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Seller Email</th>
            <th className="border border-gray-300 px-4 py-2">Buyer Email</th>
            <th className="border border-gray-300 px-4 py-2">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 px-4 py-2">
                {item.sellerEmail}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.buyerEmail}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                ${item.totalPrice.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReportPage;
