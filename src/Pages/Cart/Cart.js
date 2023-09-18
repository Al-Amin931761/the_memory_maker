import React from 'react';
import './Cart.css';
import Table from 'react-bootstrap/Table';
import TableRow from './TableRow/TableRow';
import { Link } from 'react-router-dom';
import useShoppingCart from '../../hooks/useShoppingCart';
import { BsArrowLeft } from 'react-icons/bs';
import { HiOutlineArrowRight } from 'react-icons/hi';
import PageTitle from '../Shared/PageTitle/PageTitle';

const Cart = () => {
    const { cartData, subTotal, tax, shipping, grandTotal } = useShoppingCart();

    // cart 
    let shoppingCart;
    if (cartData.length > 0) {
        shoppingCart = <div>
            <Table responsive className='mb-3'>
                <thead>
                    <tr>
                        <th></th>
                        <th className='item'>Item</th>
                        <th className='text-center'>Size & Medium</th>
                        <th className='text-center'>Price</th>
                        <th className='text-center'>Quantity</th>
                        <th className='text-center'>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartData.map((data, index) => <TableRow key={data._id} data={data} index={index}></TableRow>)
                    }

                    {/* subtotal */}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className='text-end fs-5'>Subtotal:</td>
                        <td className='text-center fs-5'>${subTotal}</td>
                    </tr>

                    {/* tax */}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className='text-end fs-5'>Tax (5%):</td>
                        <td className='text-center fs-5'>${tax}</td>
                    </tr>

                    {/* shipping */}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className='text-end fs-5'>Shipping:</td>
                        <td className='text-center fs-5'>${shipping}</td>
                    </tr>

                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className='text-end fs-4'>Grand Total:</td>
                        <td className='text-center fs-4'>${grandTotal}</td>
                    </tr>
                </tbody>
            </Table>

            <div className='d-flex justify-content-center'>
                <Link to='/customerDetails' className='btn btn-outline-dark'>Continue <HiOutlineArrowRight /></Link>
            </div>
        </div>
    } else {

        shoppingCart = <div className='d-flex flex-column align-items-center justify-content-center vh-100'>
            <p className='fs-4 mb-3'>You have nothing in your shopping cart.</p>
            <Link to='/prints' className='btn btn-outline-dark'><BsArrowLeft className='me-1' style={{ marginBottom: '2px' }} />Continue Shopping</Link>
        </div>

    }

    return (
        <div className='common-styles' data-aos="fade-up" data-aos-duration="1000" >
            <PageTitle title="Cart" />
            <h1 className='text-center second-font fw-bold mb-3'>Cart</h1>
            {shoppingCart}
        </div>
    );
};

export default Cart;