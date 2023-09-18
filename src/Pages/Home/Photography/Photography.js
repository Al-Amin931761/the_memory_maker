import React from 'react';
import img1 from '../../../images/collage/img-1.jpg';
import img2 from '../../../images/collage/img-2.jpg';
import img3 from '../../../images/collage/img-3.jpg';
import img4 from '../../../images/collage/img-4.jpg';
import img5 from '../../../images/collage/img-5.jpg';
import img6 from '../../../images/collage/img-6.jpg';
import img7 from '../../../images/collage/img-7.jpg';
import img8 from '../../../images/collage/img-8.jpg';
import { FaCamera } from "react-icons/fa";

const Photography = () => {
    return (
        <div data-aos="fade-up" data-aos-duration="1000">
            <h1 className='text-center mb-3 fw-bold second-font'><FaCamera className='mb-2' /> My Best Photographs <FaCamera className='mb-2' /></h1>

            {/* first column  */}
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="row mb-3" data-aos="zoom-in" data-aos-duration="3000">
                            <img className="img-fluid" src={img1} alt="" />
                        </div>
                        <div className="row" data-aos="zoom-in" data-aos-duration="3000">
                            <img className="img-fluid" src={img2} alt="" />
                        </div>
                    </div>
                    {/* middle column  */}

                    <div className="col-4">
                        <div className="row mb-3" data-aos="zoom-in" data-aos-duration="3000">
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
                        <div className="row mb-3" data-aos="zoom-in" data-aos-duration="3000">
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