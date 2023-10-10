import React from 'react';
import './TableRow.css';
import { toast } from 'react-toastify';

const TableRow = ({ data, index }) => {
    const { image, name, price, _id, quantity, sizeAndMedium } = data;

    const handleDelete = (id) => {
        fetch(`https://the-memory-maker-server.vercel.app/temporaryCartData/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success(`${name} - has been removed successfully.`)
                }
            });
    };

    return (
        <>
            <tr>
                <td className='text-center'>{index + 1}</td>
                <td className='d-flex justify-content-start align-items-center'>
                    <div>
                        <img height='60px' src={image} alt={name} />
                    </div>
                    <div className='ms-3'>
                        <p className='m-0'>{name}</p>
                        <button onClick={() => handleDelete(_id)} className='btn btn-link text-danger m-0 p-0'>Remove</button>
                    </div>
                </td>
                <td className='text-center'>{sizeAndMedium}</td>
                <td className='text-center'>${price}</td>
                <td className='text-center'>{quantity}</td>
                <td className='text-center'>${price * quantity}</td>
            </tr>
        </>
    );
};

export default TableRow;