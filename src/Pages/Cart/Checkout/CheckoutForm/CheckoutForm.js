import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { CUSTOMER_INFORMATION_CONTEXT } from '../../../../context/CustomerInformation';
import useShoppingCart from '../../../../hooks/useShoppingCart';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import auth from '../../../../firebase.init';
import { toast } from 'react-toastify';
import './CheckoutForm.css';
import { Button, Modal } from 'react-bootstrap';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const { details, setDetails } = useContext(CUSTOMER_INFORMATION_CONTEXT);
    const { cartData, grandTotal } = useShoppingCart();
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    // checkbox 
    const [agree, setAgree] = useState(false);
    // terms and refund policy modal
    const [showDeleteModal, setShowModal] = useState(false);
    const ModalClose = () => setShowModal(false);
    const ModalShow = () => setShowModal(true);

    // date and time 
    const today = new Date();
    const fullDate = today.toLocaleDateString();
    const time = today.toLocaleTimeString();

    const navigate = useNavigate('');
    useEffect(() => {
        if (!grandTotal || !details?.email) {
            navigate('/cart');
        } else {
            fetch(`https://the-memory-maker-server.vercel.app/create-payment-intent`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({ grandTotal })
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        signOut(auth);
                        localStorage.removeItem('accessToken');
                        navigate('/login');
                    }
                    return res.json()
                })
                .then(data => {
                    if (data.clientSecret) {
                        setClientSecret(data.clientSecret);
                    }
                })
        }
    }, [details, grandTotal, navigate])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        };

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message);
        } else {
            setCardError("")
        }

        setProcessing(true);
        // confirm card payments 
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: details?.name,
                        email: details?.email
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message)
        }
        setProcessing(false);
        if (paymentIntent.status === "succeeded") {
            setTransactionId(paymentIntent.id);
            details.transactionId = paymentIntent.id;
            details.amount = grandTotal;
            details.order = cartData;
            details.fullDate = fullDate;
            details.time = time;
            details.status = 'Pending'

            // save the order to the database 
            fetch(`https://the-memory-maker-server.vercel.app/orders`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(details)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        toast.success('Payment successful!');

                        fetch(`https://the-memory-maker-server.vercel.app/temporaryData/${details.email}`, {
                            method: 'DELETE',
                        })
                            .then(res => res.json())
                            .then(data => {
                                // console.log(data);
                            })

                        setTimeout(() => {
                            navigate('/dashboard/myOrders');
                            setDetails({});
                        }, 10000);
                    }
                })
        }
    };

    return (
        <>
            <form className='px-2 py-1 w-100' onSubmit={handleSubmit}>
                <CardElement className='w-100'
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {/* terms and refund policy */}
                <div className='my-3'>
                    <input onClick={() => setAgree(!agree)} className="form-check-input" name='terms' id='terms' type="checkbox" />

                    <label style={{ cursor: 'pointer' }} onClick={ModalShow} className={`ms-2 text-decoration-underline ${agree ? 'text-dark' : 'text-danger'}`} htmlFor="terms">Accept Terms of Use and Refund Policy</label>
                </div>

                <button className={`${(!stripe || !clientSecret || processing || !agree) ? "btn btn-dark" : 'btn btn-outline-dark'}`} type="submit" disabled={!stripe || !clientSecret || processing || !agree}>
                    Pay
                </button>
                {cardError && <p className='text-danger my-2'>{cardError}</p>}
                {transactionId && <p className='my-2'>Transaction Id: <span className='text-primary'>{transactionId}</span></p>}
            </form>


            {/* terms and refund policy modal */}
            <Modal show={showDeleteModal} onHide={ModalClose} backdrop="static" keyboard={false} size="lg">
                <Modal.Header closeButton data-aos="fade-down" data-aos-duration="1000">
                    <Modal.Title className='second-font'>Returns & Refunds Policy</Modal.Title>
                </Modal.Header>
                <Modal.Body data-aos="fade-down" data-aos-duration="1000">
                    <p>Thank you for shopping online at my website! If you are not fully satisfied with your purchase, I'm here to help.</p>

                    <div>
                        <h5>Returns</h5>
                        <ul>
                            <li>You have 7 days to return an item from the date you received it.</li>

                            <li>To be eligible for a return:</li>
                            <ul>
                                <li>Your item must be unused and in the same condition as you had received it.</li>
                                <li>Your item must be in the original packaging.</li>
                                <li>You must provide digital photos (with original timestamp) on the condition of the item upon receipt.</li>
                                <li>You must provide the receipt or proof of the purchase.</li>
                            </ul>

                            <li>I will separately provide you with our return mail address via email.</li>
                        </ul>
                    </div>

                    <div>
                        <h5>Shipping Costs</h5>
                        <p>You will be responsible for paying for the shipping costs for returning your item. The shipping costs you paid when you ordered the item are non-refundable; and should the shipping costs be free when you ordered the item, the related shipping costs of such will be deducted from the refund (the receipt of such shipping costs shall be provided to you as proof).</p>
                    </div>

                    <div>
                        <h5>Refunds</h5>
                        <p>Once I receive your item, I will inspect it and notify you that I have received your returned item. I will immediately notify you on the status of your refund after inspecting the item. If your return is approved, I will initiate a refund to your credit card (or original method of payment). You will receive the credit within 14 days, depending on your card issuer's policies.</p>
                    </div>

                    <div>
                        <h5>Contact Me</h5>
                        <p>Should you have any questions on how to return your item to me, contact me any time:</p>
                        <p>Email: <a href="mailto:alamin931761@gmail.com">alamin931761@gmail.com</a></p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={ModalClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>

    );
};

export default CheckoutForm;