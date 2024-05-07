import "./Package.css";
import { BsArrowRight } from "react-icons/bs";
import LinkButton from "../../../components/LinkButton";

const Package = ({ data }) => {
  const { name, price, picture, description } = data;
  return (
    <div className="package shadow-lg common-hover-effect">
      <div data-aos="zoom-in" data-aos-duration="3000">
        <img width={290} src={picture} alt="" />
      </div>
      <h2 className="second-font">{name}</h2>
      <h4>{price}</h4>
      <p>{description}</p>

      <div className="my-3">
        <LinkButton
          to="/contact"
          variant="outline-dark"
          name="Request a session"
          icon={<BsArrowRight style={{ marginBottom: "2px" }} />}
        />
      </div>
    </div>
  );
};

export default Package;
