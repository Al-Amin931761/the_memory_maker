import React, { useRef } from 'react';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import Sidebar from '../Sidebar/Sidebar';
import { Button } from 'react-bootstrap';
import photo from '../../../images/add-photo.png';
import './AddPrint.css';
import { signOut } from 'firebase/auth';
import auth from '../../../firebase.init';
import { toast } from 'react-toastify';

const AddPrint = () => {
    const nameRef = useRef('');
    const imageRef = useRef("");
    const locationRef = useRef('');

    const handleAddPrint = event => {
        event.preventDefault();
        const name = nameRef.current.value;
        const image = imageRef.current.value;
        const location = locationRef.current.value;

        const printData = {
            name: name,
            image: image,
            location: location
        };

        fetch('https://the-memory-maker-server.vercel.app/addPrint', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(printData)
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem("accessToken");
                }
                return res.json();
            })
            .then(data => {
                if (data.insertedId) {
                    toast.success("Print added successfully");
                } else {
                    toast.error("Print was not successfully added");
                }
            })
        event.target.reset();
    }

    return (
        <div className='common-styles'>
            <PageTitle title='Add Print'></PageTitle>
            <div className='d-flex align-items-center'>
                <Sidebar />
                <h1 className='title-margin second-font fw-bold mb-3'>Add Print</h1>
            </div>

            <div className='add-print-container'>
                <div className='w-100' data-aos="fade-right" data-aos-offset="300" data-aos-duration="1500" data-aos-easing="ease-in-sine">
                    <img className='img-fluid' src={photo} alt="" />
                </div>

                <form onSubmit={handleAddPrint} className='mt-5 w-100' data-aos="fade-left" data-aos-offset="300" data-aos-duration="1500" data-aos-easing="ease-in-sine">
                    {/* image URL */}
                    <div className="form-floating ">
                        <input ref={imageRef} type="text" className="form-control" id="image-url" placeholder="Image URL" required />
                        <label htmlFor="image-url">Image URL</label>
                    </div>

                    {/* name */}
                    <div className="form-floating my-3">
                        <input ref={nameRef} type="text" className="form-control" id="name" placeholder="Name" required />
                        <label htmlFor="name">Name</label>
                    </div>

                    {/* email */}
                    <div className="form-floating mb-3">
                        <input ref={locationRef} type="text" className="form-control" id="email-address" placeholder="Email" required />
                        <label htmlFor="email-address">Location</label>
                    </div>

                    <Button variant="outline-dark" type="submit">Add Print</Button>
                </form>
            </div>
        </div>
    );
};

export default AddPrint;