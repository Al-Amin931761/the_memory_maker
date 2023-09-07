import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { CUSTOMER_INFORMATION_CONTEXT } from '../../../../context/CustomerInformation';
import useShoppingCart from '../../../../hooks/useShoppingCart';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import auth from '../../../../firebase.init';
import { toast } from 'react-toastify';
import './CheckoutForm.css';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const { details, setDetails } = useContext(CUSTOMER_INFORMATION_CONTEXT);
    const { cartData, grandTotal } = useShoppingCart();
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    // date and time 
    const today = new Date();
    const fullDate = today.toLocaleDateString();
    const time = today.toLocaleTimeString();

    const navigate = useNavigate('');
    useEffect(() => {
        if (!grandTotal || !details?.email) {
            navigate('/cart');
        } else {
            fetch(`http://localhost:5000/create-payment-intent`, {
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
            console.log(error);
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
            fetch(`http://localhost:5000/orders`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(details)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        toast.info('Payment successful!');

                        fetch(`http://localhost:5000/temporaryData/${details.email}`, {
                            method: 'DELETE',
                        })
                            .then(res => res.json())
                            .then(data => {
                                // console.log(data);
                            })

                        setTimeout(() => {
                            navigate('/dashboard/myOrders');
                        }, 10000);
                    }
                })
        }
    };

    return (
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
            <button className='btn btn-outline-dark mt-2' type="submit" disabled={!stripe || !clientSecret || processing}>
                Pay
            </button>
            {cardError && <p className='text-danger my-2'>{cardError}</p>}
            {transactionId && <p className='text-primary my-2'>Transaction Id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;