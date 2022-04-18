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
        <div>
            <h2 className='text-center m-5'><FaCamera className='mb-2' /> My Best Photographs <FaCamera className='mb-2' /></h2>

            {/* first column  */}
            <div class="container">
                <div class="row">
                    <div class="col-4">
                        <div class="row mb-3">

                            <img class="img-fluid" src={img1} alt="" />
                        </div>
                        <div class="row">
                            <img class="img-fluid" src={img2} alt="" />
                        </div>
                    </div>
                    {/* middle column  */}

                    <div class="col-4">
                        <div class="row mb-3">
                            <img class="img-fluid" src={img3} alt="" />
                        </div>
                        <div class="mb-3">
                            <img class="img-fluid" src={img4} alt="" />
                        </div>
                        <div class="mb-6">
                            <img class="img-fluid" src={img5} alt="" />
                        </div>
                    </div>

                    {/* last column   */}
                    <div class="col-4">
                        <div class="row mb-3">
                            <img class="img-fluid" src={img6} alt="" />
                        </div>
                        <div class="mb-3">
                            <img class="img-fluid" src={img7} alt="" />
                        </div>
                        <div class="mb-6">
                            <img class="img-fluid" src={img8} alt="" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Photography;