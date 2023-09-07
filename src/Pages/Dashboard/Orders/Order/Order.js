import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import auth from '../../../../firebase.init';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Order = ({ data, index, id }) => {
    const [orderStatus, setOrderStatus] = useState(false);
    const { name, email, country, address, city, state, postalCode, phoneNumber, transactionId, amount, order, fullDate, time, status, _id } = data;

    // update status 
    const navigate = useNavigate('');
    const handleStatus = (id) => {
        fetch(`http://localhost:5000/orders/${id}`, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            }
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
                if (data?.modifiedCount > 0) {
                    toast.success('Shipped');
                }
            })
    };

    // disable the shipped button
    useEffect(() => {
        if (status === "Shipped") {
            setOrderStatus(true);
        };
    }, [status])

    return (
        <tr>
            <td className='text-center px-4'>{index + 1}</td>
            <td className='text-center px-4'>{name}</td>
            <td className='text-center px-4'>{email}</td>
            <td className='text-center px-4'>{phoneNumber}</td>
            <td className='text-center px-4'>{country}</td>
            <td className='text-center px-4'>{address}</td>
            <td className='text-center px-4'>{state}</td>
            <td className='text-center px-4'>{city}</td>
            <td className='text-center px-4'>{postalCode}</td>
            <td className='text-center px-4'>{fullDate}</td>
            <td className='text-center px-4'>{time}</td>
            <td className='text-center px-4'>${amount}</td>
            <td className='text-center px-4'>{transactionId}</td>
            <td className='text-center px-4 text-nowrap'>
                {
                    order.map(data => <div key={data._id}>
                        <p>{data.name} ({data.quantity})</p>
                    </div>)
                }
            </td>
            <td className='text-center'>
                <button disabled={orderStatus} onClick={() => handleStatus(_id)} className='btn btn-outline-dark'>{status}</button>
            </td>
        </tr>
    );
};

export default Order;