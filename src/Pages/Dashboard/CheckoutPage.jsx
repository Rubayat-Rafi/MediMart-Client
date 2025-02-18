import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "../../Components/CheckoutForm";


const CheckoutPage = () => {
  const navigate = useNavigate();

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  
  const handlePaymentSuccess = (paymentData) => {
    navigate("/invoice", { state: { paymentData } });
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Checkout Page</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm onPaymentSuccess={handlePaymentSuccess} />
      </Elements>
    </div>
  );
};

export default CheckoutPage;
