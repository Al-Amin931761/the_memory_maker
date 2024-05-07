import Photography from "./Photography";
import TravelDates from "./TravelDates/TravelDates";
import HeroSection from "./HeroSection/HeroSection";
import PageTitle from "../../components/shared/PageTitle";
import Container from "../../components/Container";

const Home = () => {
  return (
    <Container>
      <PageTitle title="Home" />
      <HeroSection />
      <div
        data-aos="fade-up"
        data-aos-duration="1500"
        className="text-center fs-2 my-5"
      >
        <p>I love capturing laughter, giggles, and lovely memories</p>
        <p>
          I offer fashion, personal, outdoor, birthday, kids, newborn & babies,
          commercial, product, e-commerce, and event photography, if you want
          anything else let's chat and we can come up with something to fit what
          you need!
        </p>
      </div>
      <Photography />
      <TravelDates />
    </Container>
  );
};

export default Home;
