import { useContext, useRef } from "react";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { CUSTOMER_INFORMATION_CONTEXT } from "../../context/CustomerInformation";
import { HiOutlineArrowRight } from "react-icons/hi";
import "./CustomerDetails.css";
import OrderSummary from "../../components/OrderSummary";
import { toast } from "react-toastify";
import PageTitle from "../../components/shared/PageTitle";
import Container from "../../components/Container";
import LinkButton from "../../components/LinkButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerDetailsSchema } from "../../components/reusableForm/Validation";
import Form from "../../components/reusableForm/Form";
import Input from "../../components/reusableForm/Input";
import FormSubmit from "../../components/reusableForm/FormSubmit";

const CustomerDetails = () => {
  const [user] = useAuthState(auth);
  const { details, setDetails } = useContext(CUSTOMER_INFORMATION_CONTEXT);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(customerDetailsSchema) });

  // continue button
  let button;
  if (details?.name) {
    button = (
      <LinkButton
        variant="outline-dark"
        to="/checkout"
        name="Continue"
        icon={<HiOutlineArrowRight />}
      />
    );
  } else {
    button = (
      <button className="btn btn-dark" disabled>
        Continue <HiOutlineArrowRight />
      </button>
    );
  }

  // form
  const handleCustomerDetails = (data) => {
    const customerInfo = {
      name: user?.displayName,
      email: user?.email,
      country: data.country,
      address: data.address,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      phoneNumber: data.phoneNumber,
    };
    setDetails(customerInfo);
    toast.success("Details submitted successfully");
  };

  return (
    <Container>
      <div data-aos="fade-up" data-aos-duration="1000">
        <PageTitle title="Customer Details" />
        <h1 className="second-font text-center fw-bold mb-3">
          Customer Details
        </h1>

        <div className="customer-details-container">
          <div
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-duration="1500"
            data-aos-easing="ease-in-sine"
          >
            <Form onSubmit={handleSubmit(handleCustomerDetails)}>
              {/* name */}
              <Input
                name="name"
                type="text"
                placeholder="Name"
                value={user?.displayName}
                disabled={true}
                errors={errors}
              />

              {/* email */}
              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                value={user?.email}
                disabled={true}
                errors={errors}
              />

              {/* country */}
              <Input
                register={register("country")}
                name="country"
                type="text"
                placeholder="Country"
                errors={errors}
              />

              {/* address */}
              <Input
                register={register("address")}
                name="address"
                type="text"
                placeholder="Address"
                errors={errors}
              />

              {/* city */}
              <Input
                register={register("city")}
                name="city"
                type="text"
                placeholder="City"
                errors={errors}
              />

              {/* state / province */}
              <Input
                register={register("state")}
                name="state"
                type="text"
                placeholder="State / Province"
                errors={errors}
              />

              {/* postal code */}
              <Input
                register={register("postalCode")}
                name="postalCode"
                type="number"
                placeholder="Zip / Postal code"
                errors={errors}
              />

              {/* phone number */}
              <Input
                register={register("phoneNumber")}
                name="phoneNumber"
                type="text"
                placeholder="Phone Number"
                errors={errors}
              />

              <FormSubmit variant="outline-dark">Submit</FormSubmit>
            </Form>
          </div>

          <div
            className="inline-block order-summary"
            data-aos="fade-left"
            data-aos-offset="300"
            data-aos-duration="1500"
            data-aos-easing="ease-in-sine"
          >
            <div>
              <OrderSummary />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-3">{button}</div>
      </div>
    </Container>
  );
};

export default CustomerDetails;
