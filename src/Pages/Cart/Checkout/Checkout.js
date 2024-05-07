import CheckoutForm from "./CheckoutForm/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrderSummary from "../OrderSummary/OrderSummary";
import "./Checkout.css";
import PageTitle from "../../../components/shared/PageTitle";

const Checkout = () => {
  const stripePromise = loadStripe(
    process.env.REACT_APP_stripe_publishable_key
  );

  return (
    <div className="common-styles">
      <PageTitle title="Checkout" />
      <h1 className="fw-bold second-font text-center mb-3">Checkout</h1>

      <div
        className="checkout"
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-duration="1500"
        data-aos-easing="ease-in-sine"
      >
        <div className="checkout-form">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>

        <div
          className="summary"
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-duration="1500"
          data-aos-easing="ease-in-sine"
        >
          <OrderSummary></OrderSummary>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
