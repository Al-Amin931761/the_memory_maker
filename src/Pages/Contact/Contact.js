import React, { useRef } from 'react';
import PageTitle from '../Shared/PageTitle/PageTitle';
import { Button } from 'react-bootstrap';
import './Contact.css';
import image from '../../images/my-image.png';

const Contact = () => {
    const nameRef = useRef('');
    const emailRef = useRef("");
    const phoneRef = useRef("");
    const messageRef = useRef("");

    return (
        <div className='common-styles'>
            <PageTitle title="Contact"></PageTitle>
            <h1 className='text-center fw-bold second-font mb-0'>Contact</h1>
            <p className='text-center my-3'>Please let me know how I can help. I look forward to working with you.</p>

            <div className='contact-container'>
                {/* image */}
                <div className='d-flex justify-content-center'>
                    <img className='img-fluid' src={image} alt="" />
                </div>

                <form className='d-flex flex-column justify-content-center'>
                    <div>
                        <h2 className='text-uppercase'>Let's do this.</h2>
                        <p>Please contact me at <a className='text-decoration-none second-font' href="tel:+8801741931761">+8801741931761</a> for whatever you need, OR think you need.</p>
                        <p>OR Email me: <a className='text-decoration-none second-font' href="mailto:alamin931761@gmail.com">alamin931761@gmail.com</a></p>
                    </div>
                    {/* name */}
                    <div className="form-floating">
                        <input ref={nameRef} type="text" className="form-control" id="name" placeholder="Name" required />
                        <label htmlFor="name">Name</label>
                    </div>

                    {/* email */}
                    <div className="form-floating my-3">
                        <input ref={emailRef} type="email" className="form-control" id="email-address" placeholder="Email" required />
                        <label htmlFor="email-address">Email Address</label>
                    </div>

                    {/* phone */}
                    <div className="form-floating">
                        <input ref={phoneRef} type="number" className="form-control" id="phone" placeholder="Phone" required />
                        <label htmlFor="phone">Phone</label>
                    </div>

                    {/* message */}
                    <div className="form-floating my-3 message">
                        <textarea ref={messageRef} className="form-control" placeholder="Message" id="message" required />
                        <label htmlFor="message">Message</label>
                    </div>
                    <Button className='py-2 submit-button' variant="outline-dark" type="submit">Submit</Button>
                </form>
            </div>
        </div>
    );
};

export default Contact;