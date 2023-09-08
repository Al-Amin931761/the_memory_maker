import React, { useEffect, useState } from 'react';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import Sidebar from '../Sidebar/Sidebar';
import auth from '../../../firebase.init';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { Table } from 'react-bootstrap';
import Order from './Order/Order';

const Orders = () => {
    const [orders, setOrders] = useState([]);


    const navigate = useNavigate('');
    useEffect(() => {
        fetch(`http://localhost:5000/orders`, {
            method: "GET",
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
            .then(data => setOrders(data))
    }, [navigate, orders]);

    return (
        <div className='common-styles'>
            <PageTitle title='Orders'></PageTitle>
            <div className='d-flex align-items-center'>
                <Sidebar />
                <h2 className='title-margin second-font'>Orders ({orders?.length})</h2>
            </div>

            <div className='mt-5'>
                <Table responsive bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th className='table-head item'>Name</th>
                            <th className='table-head text-center'>Email</th>
                            <th className='table-head text-center'>Phone Number</th>
                            <th className='table-head text-center'>Country</th>
                            <th className='table-head text-center'>Address</th>
                            <th className='table-head text-center'>State</th>
                            <th className='table-head text-center'>City</th>
                            <th className='table-head text-center text-nowrap'>Postal Code</th>
                            <th className='table-head text-center text-nowrap'>Date (MM-DD-YYYY)</th>
                            <th className='table-head text-center'>Time</th>
                            <th className='table-head text-center'>Amount</th>
                            <th className='table-head text-center'>Transaction ID</th>
                            <th className='table-head text-center'>Orders</th>
                            <th className='table-head text-center'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((data, index) => <Order key={data._id} data={data} index={index}></Order>)
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Orders;