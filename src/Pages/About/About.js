import React from 'react';
import PageTitle from '../Shared/PageTitle/PageTitle';
import image from '../../images/my-image.png';

const About = () => {
    return (
        <div className='common-styles'>
            <PageTitle title="About"></PageTitle>
            <h1 className='text-center second-font'>WELCOME TO THE MEMORY MAKER</h1>

            <div className='border border-2 border-primary'>
                <h3 className='fs-2 text-center'>I've been doing this for a while.</h3>
                <div className='d-flex justify-content-center'>
                    <img style={{ height: '600px' }} className='img-fluid' src={image} alt="" />
                </div>
                <p className='fs-3 text-center'>Having always enjoyed strategizing and crafting visual messaging which strike the emotions, my photography has to exude sophistication, personality and approachability. Clients need to be viewed as the experts in their field. Whether it be branding, product, headshot, or photo-journalism, I bring decades of knowledge and passion to assist a client's expectations and demands. Having an extensive history as an award-winning Art Director, I understand what visual direction any client needs to lead their market. I photograph fashion, personal, outdoor, birthday, kids, newborns & babies, commercial, product, e-commerce, and event photography, and more. </p>
            </div>

        </div>

    );
};

export default About;