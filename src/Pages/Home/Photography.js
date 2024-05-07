import SectionTitle from "../../components/shared/SectionTitle";
import img1 from "../../images/collage/img-1.jpg";
import img2 from "../../images/collage/img-2.jpg";
import img3 from "../../images/collage/img-3.jpg";
import img4 from "../../images/collage/img-4.jpg";
import img5 from "../../images/collage/img-5.jpg";
import img6 from "../../images/collage/img-6.jpg";
import img7 from "../../images/collage/img-7.jpg";
import img8 from "../../images/collage/img-8.jpg";
import { FaCamera } from "react-icons/fa";

const Photography = () => {
  return (
    <div data-aos="fade-up" data-aos-duration="1000">
      <SectionTitle
        icon={<FaCamera className="mb-2" />}
        title="My Best Photographs"
      />

      <div className="container">
        <div className="row">
          {/* first column  */}
          <div className="col-4">
            <div
              className="row mb-3"
              data-aos="zoom-in"
              data-aos-duration="3000"
            >
              <img className="img-fluid" src={img1} alt="" />
            </div>
            <div className="row" data-aos="zoom-in" data-aos-duration="3000">
              <img className="img-fluid" src={img2} alt="" />
            </div>
          </div>
          {/* middle column  */}

          <div className="col-4">
            <div
              className="row mb-3"
              data-aos="zoom-in"
              data-aos-duration="3000"
            >
              <img className="img-fluid" src={img3} alt="" />
            </div>
            <div className="mb-3" data-aos="zoom-in" data-aos-duration="3000">
              <img className="img-fluid" src={img4} alt="" />
            </div>
            <div className="mb-6" data-aos="zoom-in" data-aos-duration="3000">
              <img className="img-fluid" src={img5} alt="" />
            </div>
          </div>

          {/* last column   */}
          <div className="col-4">
            <div
              className="row mb-3"
              data-aos="zoom-in"
              data-aos-duration="3000"
            >
              <img className="img-fluid" src={img6} alt="" />
            </div>
            <div className="mb-3" data-aos="zoom-in" data-aos-duration="3000">
              <img className="img-fluid" src={img7} alt="" />
            </div>
            <div className="mb-6" data-aos="zoom-in" data-aos-duration="3000">
              <img className="img-fluid" src={img8} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Photography;
