

import PropTypes from 'prop-types';

const DiscountCard = ({product}) => {

    const { image, itemName, discount } = product;

  return (
    <div className="relative bg-white border rounded-lg shadow-md overflow-hidden">
      {/* Discount Badge */}
      {discount && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
          {discount}% OFF
        </div>
      )}
      {/* Product Image */}
      <img src={image} alt={itemName} className="w-full h-48 object-cover" />
    </div>
  );
};

DiscountCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    itemName: PropTypes.string.isRequired,
    discount: PropTypes.number
  }).isRequired
};

export default DiscountCard;



