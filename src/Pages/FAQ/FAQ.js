import React from 'react';
import './FAQ.css';
import { Link } from 'react-router-dom';

const FAQ = () => {
    return (
        <div className='common-styles'>
            <h2 className='text-center second-font'>Frequently Asked Questions</h2>

            <div className='faq-container'>
                <div className='p-3 border border-2 rounded'>
                    <h4 className='text-uppercase'>We love your work! How do we book you?</h4>
                    <p>I'm so excited to talk with you and get to be a part of your special day! Just fill out the form in the <Link to='/contact'>contact section</Link>, and I'll be in touch to discuss the details and lock in your date.</p>
                </div>

                <div className='p-3 border border-2 rounded'>
                    <h4 className='text-uppercase'>How would you describe your style?</h4>
                    <p>I love to capture people's stories. I strive to capture the emotion and energy of your special day, and all the raw and honest moments in between.</p>
                </div>

                <div className='p-3 border border-2 rounded'>
                    <h4 className='text-uppercase'>We are shy / awkward and don't like being in front of the camera…</h4>
                    <p>I know how you feel, I am too. But don't worry, you'll soon forget I'm even there as we relax into the day. My role is to be in the background, unobtrusive but always working to capture you in the most natural way, catching the genuine laughter, quiet romantic moments, tears, and joy. I will offer some direction if needed but I love to keep it as genuine as possible and just let you be yourselves.</p>
                </div>

                <div className='p-3 border border-2 rounded'>
                    <h4 className='text-uppercase'>How long will it take to get our photos?</h4>
                    <p>A sneak peek will be sent to you within 1-2 weeks of your event. Post-production takes approximately 4-6 weeks. Final images include editing and color correcting so that all pictures are perfect.</p>
                </div>

                <div className='p-3 border border-2 rounded'>
                    <h4 className='text-uppercase'>Do you travel?</h4>
                    <p>Yes, I will go wherever you take me! I absolutely love traveling and am willing to travel anywhere.</p>
                </div>

                <div className='p-3 border border-2 rounded'>
                    <h4 className='text-uppercase'>We have more questions. How do we contact you?</h4>
                    <p>Feel free to fill out the <Link to='/contact'>contact form</Link>, call me at <a href="tel:+8801741931761">+8801741931761</a>, or <a href="mailto:alamin931761@gmail.com">e-mail</a> me.</p>
                </div>
            </div>
        </div>
    );
};

export default FAQ;