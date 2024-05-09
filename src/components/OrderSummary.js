import useShoppingCart from "../hooks/useShoppingCart";
import LinkButton from "./LinkButton";
import { HiOutlineArrowRight } from "react-icons/hi";

const OrderSummary = () => {
  const { cartData, subTotal, grandTotal, tax, shipping } = useShoppingCart();

  if (cartData.length === 0) {
    return (
      <div className="d-flex justify-content-center h-100 align-items-center">
        <LinkButton
          to="/dashboard/myOrders"
          variant="outline-dark"
          name="My Orders"
          icon={<HiOutlineArrowRight />}
        />
      </div>
    );
  }
  return (
    <div className="w-100 shadow-sm rounded p-3">
      <h4 className="second-font text-center mb-3">Order Summary</h4>
      {cartData.map((data) => (
        <div
          key={data._id}
          className="d-flex align-items-center justify-content-between"
        >
          <div className="d-flex align-items-center p-1">
            <img
              style={{ height: "60px" }}
              className="img-fluid"
              src={data.image}
              alt=""
            />
            <div className="ms-1">
              <p className="m-0 fs-6 fw-bolder">
                {data.name} ({data.quantity})
              </p>
              <p className="m-0">Size & Medium: {data.sizeAndMedium}</p>
            </div>
          </div>
          <p>${data.price * data.quantity}</p>
        </div>
      ))}
      <div>
        <hr />
        <div className="d-flex justify-content-between">
          <p className="m-0">Subtotal:</p>
          <p className="m-0">${subTotal}</p>
        </div>

        <div className="d-flex justify-content-between my-3">
          <p className="m-0">Tax:</p>
          <p className="m-0">${tax}</p>
        </div>

        <div className="d-flex justify-content-between">
          <p className="m-0">Shipping:</p>
          <p className="m-0">${shipping}</p>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <p className="m-0">Grand Total:</p>
          <p className="m-0">${grandTotal}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
