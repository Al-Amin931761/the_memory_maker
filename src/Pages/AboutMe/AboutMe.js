import React from 'react';
import myPhoto from '../../images/my-photo.jpg';
import './AboutMe.css'

const AboutMe = () => {
    return (
        <div className='about-container'>
            <h2 className='text-center m-3'>My name is Al-Amin.</h2>
            <div className='d-flex justify-content-center'>
                <img width={360} src={myPhoto} alt="" />
            </div>
            <p className='fs-4 m-5 p-3' >Goals give our lives meaning. My goal is to become a web developer. Because Web development gives us the opportunity and the creative freedom to express ourselves on the world wide web.
                <br />
                <b>Antoine Griezmann says "With hard work and effort, you can achieve anything".</b> So I have to practice more than 8 hours a day, if I practice more than 8 hours a day I can be successful.</p>
        </div>
    );
};

export default AboutMe;