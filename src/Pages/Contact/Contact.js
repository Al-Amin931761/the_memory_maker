import React, { useRef } from 'react';
import PageTitle from '../Shared/PageTitle/PageTitle';
import { Button } from 'react-bootstrap';

const Contact = () => {

    const nameRef = useRef('');
    const emailRef = useRef("");
    const phoneRef = useRef("");
    const messageRef = useRef("");
    return (
        <div className='common-styles'>
            <PageTitle title="Contact"></PageTitle>
            <h2 className='text-center second-font'>Contact page</h2>

            <form>
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
                <div className="form-floating my-3">
                    <textarea ref={messageRef} className="form-control" placeholder="Message" id="review" required />
                    <label htmlFor="review">Message</label>
                </div>
                <Button className='py-2' variant="outline-dark" type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default Contact;