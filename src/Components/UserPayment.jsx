import PropTypes from 'prop-types';

const UserPayment = ({orders}) => {
    
    return (
        <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Order Id</th>
            <th>Order Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {orders.map((order, idx) => (
            <tr key={order?._d}>
              <th>{idx + 1}</th>
              <td>{order?.paymentIntentId }</td>
              <td>$ {(order?.totalPrice / 100).toFixed(2)}</td>
              <td><span className={`${order.status === 'pending' && 'bg-yellow-500/30 text-black'
            } ${order.status === 'paid' && 'bg-green-500/30 text-black'}  py-1 px-3 rounded-full text-[10px]`} >{order.status}</span> </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
};


UserPayment.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      paymentIntentId: PropTypes.string,
      amount: PropTypes.number,
      status: PropTypes.string,
    })
  ).isRequired,
};

export default UserPayment;

