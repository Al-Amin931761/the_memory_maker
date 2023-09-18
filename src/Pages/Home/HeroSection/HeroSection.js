import React from 'react';
import heroImage from '../../../images/hero.png';
import TextAnimation from 'react-text-animations';
import './HeroSection.css';

const HeroSection = () => {
    return (
        <div className='hero-container' data-aos="fade-up" data-aos-duration="1000">
            <div className='d-flex justify-content-center align-items-center'>
                <img className='img-fluid' src={heroImage} alt="" />
            </div>

            <div className='hero-contents'>
                <div className='contents'>
                    <TextAnimation.Slide
                        target="life."
                        text={["moments.", 'happiness.', 'emotions.', 'action.', "impression."]}
                        cname="textAnimation"
                        id="textAnimation__slide"
                        animation={{
                            duration: 1000,
                            delay: 2000,
                            timingFunction: 'ease-out',
                        }}
                        loop={true}
                    >
                        I capture life.
                    </TextAnimation.Slide>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;