import "./Cart.css";
import Table from "react-bootstrap/Table";
import useShoppingCart from "../../hooks/useShoppingCart";
import { BsArrowLeft } from "react-icons/bs";
import { HiOutlineArrowRight } from "react-icons/hi";
import PageTitle from "../../components/shared/PageTitle";
import Container from "../../components/Container";
import SectionTitle from "../../components/shared/SectionTitle";
import LinkButton from "../../components/LinkButton";
import CartTableRow from "./CartTableRow/CartTableRow";

const Cart = () => {
  const { cartData, subTotal, tax, shipping, grandTotal } = useShoppingCart();

  // cart
  let shoppingCart;
  if (cartData.length > 0) {
    shoppingCart = (
      <div>
        <Table responsive className="mb-3">
          <thead>
            <tr>
              <th></th>
              <th className="item">Item</th>
              <th className="text-center">Size & Medium</th>
              <th className="text-center">Price</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Amount</th>
            </tr>
          </thead>
          <tbody>
            {cartData.map((data, index) => (
              <CartTableRow key={data._id} data={data} index={index} />
            ))}

            {/* subtotal */}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-end fs-5">Subtotal:</td>
              <td className="text-center fs-5">${subTotal}</td>
            </tr>

            {/* tax */}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-end fs-5">Tax (5%):</td>
              <td className="text-center fs-5">${tax}</td>
            </tr>

            {/* shipping */}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-end fs-5">Shipping:</td>
              <td className="text-center fs-5">${shipping}</td>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-end fs-4">Grand Total:</td>
              <td className="text-center fs-4">${grandTotal}</td>
            </tr>
          </tbody>
        </Table>

        <div className="d-flex justify-content-center">
          <LinkButton
            to="/customerDetails"
            variant="outline-dark"
            name="Continue"
            icon={<HiOutlineArrowRight />}
          />
        </div>
      </div>
    );
  } else {
    shoppingCart = (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <p className="fs-4 mb-3">You have nothing in your shopping cart.</p>

        <LinkButton
          to="/prints"
          variant="outline-dark"
          name="Continue Shopping"
          icon={<BsArrowLeft className="mb-1" />}
          leftIcon={true}
        />
      </div>
    );
  }

  return (
    <Container>
      <div data-aos="fade-up" data-aos-duration="1000">
        <PageTitle title="Cart" />
        <SectionTitle title="Cart" />

        {shoppingCart}
      </div>
    </Container>
  );
};

export default Cart;
