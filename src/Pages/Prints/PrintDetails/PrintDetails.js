import React, { useRef, useState } from 'react';
import './PrintDetails.css';
import { ImLocation2 } from 'react-icons/im';
import { Link, useLoaderData } from 'react-router-dom';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import RandomPrints from './RandomPrints/RandomPrints';
import { BsFillPrinterFill } from 'react-icons/bs';

const PrintDetails = () => {
    const [user] = useAuthState(auth);
    const printData = useLoaderData();
    const { image, name, location, _id } = printData;
    const [price, setPrice] = useState(150);

    let sizeAndMedium;
    if (price === 150) {
        sizeAndMedium = `18" x 12" - Fine Art Print`;
    } else if (price === 270) {
        sizeAndMedium = `24" x 16" - Fine Art Print`;
    }
    else if (price === 420) {
        sizeAndMedium = `30" x 20" - Fine Art Print`;
    } else {
        sizeAndMedium = `36" x 24" - Fine Art Print`;
    }

    // price 
    const handleSize = (event) => {
        setPrice(parseInt(event.target.value));
    };

    // quantity 
    const quantityRef = useRef('');
    const handleSubmit = event => {
        event.preventDefault();
        const quantity = parseInt(quantityRef.current.value);
        if (quantity > 0) {
            const order = {
                image: image,
                quantity: quantity,
                sizeAndMedium: sizeAndMedium
            }
            fetch(`http://localhost:5000/temporaryData/${user?.email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    name: name,
                    price: price
                },
                body: JSON.stringify(order)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.upsertedCount > 0) {
                        toast.success(`${name} - item added to cart`);
                    } else if (data.modifiedCount > 0) {
                        toast.success(`${name} - item quantities have been updated`);
                    }
                    event.target.reset();
                })
        }

        // delete users temporary data
        setTimeout(() => {
            fetch(`http://localhost:5000/temporaryData/${user?.email}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    toast.error(`Your cart data has been deleted, please add to cart again`);
                })
        }, 86400000)
    };

    return (
        <div className='common-styles'>
            <PageTitle title='Print Details'></PageTitle>
            <h1 className='text-center fw-bold second-font mb-3'><BsFillPrinterFill className='mb-1' /> Print Details <BsFillPrinterFill className='mb-1' /></h1>

            <div className='print-details-container'>
                <div className='print-image ms-1'>
                    <img className='img-fluid' src={image} alt="" />
                </div>

                <div className='p-2 d-flex align-items-center me-1'>
                    <div>
                        <h2 className='mb-3'>{name}</h2>
                        <p className='mb-3'><ImLocation2 />{location}</p>
                        <h2 className='mb-3'>{price}</h2>

                        {/* size & medium */}
                        <FloatingLabel className='select-size p-0 mb-3' onChange={handleSize} controlId="floatingSelectGrid" label="Size & Medium">
                            <Form.Select className='border border-dark' aria-label="Floating label select example">
                                <option value="150">18" x 12" - Fine Art Print</option>
                                <option value="270">24" x 16" - Fine Art Print</option>
                                <option value="420">30" x 20" - Fine Art Print</option>
                                <option value="600">36" x 24" - Fine Art Print</option>
                            </Form.Select>
                        </FloatingLabel>

                        {/* quantity */}
                        <form onSubmit={handleSubmit}>
                            <FloatingLabel controlId="floatingInputGrid" label="Quantity" className='quantity-input mb-3'>
                                <Form.Control className='border border-dark' ref={quantityRef} type="number" placeholder="Quantity" required />
                            </FloatingLabel>

                            <Button variant="outline-dark" type="submit">Add To Cart</Button>
                        </form>

                        <div className='mt-3'>
                            <p className='m-0'>Custom orders are available (preset size, archival paper, foamboard, framing, gallery wrap). Please <Link to='/contact'>contact me</Link>.</p>

                            <p className='mt-3 mb-0'>All prints are made with Fine Art Luster paper, furnished in leading professional art printing laboratories. Prints are professionally packaged, handled, and shipped in a rolled tube. Delivery insurance is available.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* random prints */}
            <hr className='mb-4 mt-5' />
            <div>
                <RandomPrints id={_id} />
            </div>
        </div>
    );
};

export default PrintDetails;