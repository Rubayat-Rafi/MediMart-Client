import { FaCartArrowDown, FaEye } from "react-icons/fa6";
import PropTypes from 'prop-types';


const ShopTable = ({ medicines, handleViewClick, calculateDiscountedPrice, handleSelectCart}) => {


  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Medicine Name</th>
            <th>Company</th>
            <th>Generic Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {medicines.map((medicine, index) => (
            <tr key={medicine._id}>
              <th>{index + 1}</th>
              <td>{medicine.itemName}</td>
              <td>{medicine.company}</td>
              <td>{medicine.genericName}</td>
              <td>{calculateDiscountedPrice(medicine.price, medicine.discount)} Taka</td>
              <td className="flex items-center gap-2  justify-between">
                <button
                  className="text-lg hover:scale-105 transition text-primaryTextColor"
                  onClick={() => handleViewClick(medicine)}
                >
                  <FaEye />
                </button>
                <button
                onClick={()=> handleSelectCart(medicine)}
                  className="text-lg hover:scale-105 transition text-red-500"
                >
                  <FaCartArrowDown  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};



ShopTable.propTypes = {
  medicines: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      itemName: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      genericName: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  handleSelectCart: PropTypes.func.isRequired,
  handleViewClick: PropTypes.func.isRequired,
  calculateDiscountedPrice: PropTypes.func.isRequired,
};

export default ShopTable;

