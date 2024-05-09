import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrderSummary from "../../components/OrderSummary";
import "./Checkout.css";
import PageTitle from "../../components/shared/PageTitle";
import Container from "../../components/Container";
import SectionTitle from "../../components/shared/SectionTitle";
import CheckoutForm from "./CheckoutForm/CheckoutForm";

const Checkout = () => {
  const stripePromise = loadStripe(
    process.env.REACT_APP_stripe_publishable_key
  );

  return (
    <Container>
      <PageTitle title="Checkout" />
      <SectionTitle title="Checkout" />

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
          <OrderSummary />
        </div>
      </div>
    </Container>
  );
};

export default Checkout;
