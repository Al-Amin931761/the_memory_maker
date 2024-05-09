import useWishlist from "../../hooks/useWishlist";
import { BsArrowLeft } from "react-icons/bs";
import PageTitle from "../../components/shared/PageTitle";
import SectionTitle from "../../components/shared/SectionTitle";
import Container from "../../components/Container";
import LinkButton from "../../components/LinkButton";
import Wishlist from "./Wishlist";

const MyWishlist = () => {
  const { myWishlistArray } = useWishlist();

  let wishlist = [];
  if (myWishlistArray?.length > 0 && myWishlistArray[0]?._id) {
    wishlist = (
      <div className="prints-container">
        {myWishlistArray?.map((data) => (
          <Wishlist key={data._id} data={data} />
        ))}
      </div>
    );
  } else {
    wishlist = (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <p className="fs-4 second-font mb-3">
          You have nothing in your wishlist.
        </p>

        <LinkButton
          to="/prints"
          variant="outline-dark"
          name="Back to Prints"
          icon={<BsArrowLeft className="mb-1" />}
          leftIcon={true}
        />
      </div>
    );
  }

  return (
    <Container>
      <div data-aos="fade-up" data-aos-duration="1000">
        <PageTitle title="My Wishlist" />
        <SectionTitle title={`My Wishlist (${myWishlistArray.length})`} />

        {wishlist}
      </div>
    </Container>
  );
};

export default MyWishlist;
