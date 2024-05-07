import notfound from "../images/notfound.jpg";
import { BsArrowLeft } from "react-icons/bs";
import PageTitle from "../components/shared/PageTitle";
import LinkButton from "../components/LinkButton";
import Container from "../components/Container";

const NotFound = () => {
  return (
    <Container>
      <div data-aos="fade-up" data-aos-duration="1000">
        <PageTitle title="404" />
        <img className="img-fluid" src={notfound} alt="" />
        <div className="mt-3 d-flex justify-content-center">
          <LinkButton
            to="/"
            variant="outline-dark"
            name="Back to home"
            icon={<BsArrowLeft className="mb-1" />}
            leftIcon={true}
          />
        </div>
      </div>
    </Container>
  );
};

export default NotFound;
