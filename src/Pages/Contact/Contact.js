import React, { useRef } from 'react';
import PageTitle from '../Shared/PageTitle/PageTitle';
import { Button } from 'react-bootstrap';
import './Contact.css';
import image from '../../images/my-image.png';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const Contact = () => {
    const form = useRef();

    const sendEmail = event => {
        event.preventDefault();
        emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, form.current, process.env.REACT_APP_PUBLIC_KEY)
            .then((result) => {
                toast.success("Your message has been sent successfully");
            }, (error) => {
                console.log(error.text);
            });

        event.target.reset();
    };

    return (
        <div className='common-styles' data-aos="fade-up" data-aos-duration="1000">
            <PageTitle title="Contact"></PageTitle>
            <h1 className='text-center fw-bold second-font mb-0'>Contact</h1>
            <p className='text-center my-3'>Please let me know how I can help. I look forward to working with you.</p>

            <div className='contact-container'>
                {/* image */}
                <div className='d-flex justify-content-center' data-aos="fade-left" data-aos-offset="300" data-aos-duration="1500" data-aos-easing="ease-in-sine">
                    <img className='img-fluid' src={image} alt="" />
                </div>

                <form ref={form} onSubmit={sendEmail} className='contact-form d-flex flex-column justify-content-center' data-aos="fade-right" data-aos-offset="300" data-aos-duration="1500" data-aos-easing="ease-in-sine">
                    <div>
                        <h2 className='text-uppercase'>Let's do this.</h2>
                        <p>Please contact me at <a className='text-decoration-none second-font' href="tel:+8801741931761">+8801741931761</a> for whatever you need, OR think you need.</p>
                        <p>OR Email me: <a className='text-decoration-none second-font' href="mailto:alamin931761@gmail.com">alamin931761@gmail.com</a></p>
                    </div>
                    {/* name */}
                    <div className="form-floating">
                        <input name="user_name" type="text" className="form-control" id="name" placeholder="Name" required />
                        <label htmlFor="name">Name</label>
                    </div>

                    {/* email */}
                    <div className="form-floating my-3">
                        <input name="user_email" type="email" className="form-control" id="email-address" placeholder="Email" required />
                        <label htmlFor="email-address">Email Address</label>
                    </div>

                    {/* message */}
                    <div className="form-floating my-3 message">
                        <textarea name="message" className="form-control" placeholder="Message" id="message" required />
                        <label htmlFor="message">Message</label>
                    </div>
                    <Button className='py-2 submit-button' variant="outline-dark" type="submit">Submit</Button>
                </form>
            </div>
        </div>
    );
};

export default Contact;