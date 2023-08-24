import React, { useRef, useState } from 'react';
import './PrintDetails.css';
import { ImLocation2 } from 'react-icons/im';
import { Link, useLoaderData } from 'react-router-dom';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import PageTitle from '../../../Shared/PageTitle/PageTitle';

const PrintDetails = () => {
    const printData = useLoaderData();
    const { image, name, location } = printData;
    const [price, setPrice] = useState(150);

    const handleSize = (event) => {
        setPrice(event.target.value);
    }
    console.log(price);

    const quantityRef = useRef('');
    const handleSubmit = event => {
        event.preventDefault();
        const quantity = parseInt(quantityRef.current.value);
        if (quantity > 0) {
            const totalPrice = quantity * price;
            setPrice(totalPrice);
        } else {
            toast.error('Minimum quantity must be 1')
        }
    }

    return (
        <div className='common-styles'>
            <PageTitle title='Print Details'></PageTitle>
            <h2 className='text-center'>Print Details</h2>
            <div className='print-details-container'>
                <div className='print-image'>
                    <img className='img-fluid' src={image} alt="" />
                </div>

                <div className='p-2 d-flex align-items-center'>
                    <div>
                        <h2 className='mb-3'>{name}</h2>
                        <p className='mb-3'><ImLocation2 />{location}</p>
                        <h2 className='mb-3'>${price}</h2>

                        {/* size */}
                        <FloatingLabel className='select-size mb-3' onChange={handleSize} controlId="floatingSelectGrid" label="Size & Medium ">
                            <Form.Select aria-label="Floating label select example">
                                <option value={150}>18" x 12" - Fine Art Print</option>
                                <option value={270}>24" x 16" - Fine Art Print</option>
                                <option value={420}>30" x 20" - Fine Art Print</option>
                                <option value={600}>36" x 24" - Fine Art Print</option>
                            </Form.Select>
                        </FloatingLabel>

                        {/* quantity */}
                        <form onSubmit={handleSubmit}>
                            <FloatingLabel controlId="floatingInputGrid" label="Quantity" className='quantity-input mb-3'>
                                <Form.Control ref={quantityRef} type="number" placeholder="Quantity" required />
                            </FloatingLabel>

                            <Button variant="outline-dark" type="submit">Add To Cart</Button>
                        </form>

                        <div className='mt-3'>
                            <p>Custom orders are available (preset size, archival paper, foamboard, framing, gallery wrap). Please <Link to='/contact'>contact me</Link>.</p>

                            <p>All prints are made with Fine Art Luster paper, furnished in leading professional art printing laboratories. Prints are professionally packaged, handled, and shipped in a rolled tube. Delivery insurance is available.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrintDetails;