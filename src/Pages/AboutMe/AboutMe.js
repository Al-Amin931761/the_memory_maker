import React from 'react';
import myPhoto from '../../images/my-photo.jpg';

const AboutMe = () => {
    return (
        <div>
            <h2 className='text-center m-3'>My name is Al-Amin.</h2>
            <div className='d-flex justify-content-center'>
                <img width={390} src={myPhoto} alt="" />
            </div>
            <p className='fs-4 m-5' >My goal is to become a web developer.  <b>Antoine Griezmann says "With hard work and effort, you can achieve anything".</b> So I have to practice more than 8 hours a day, if I practice more than 8 hours a day I can be successful.</p>
        </div>
    );
};

export default AboutMe;