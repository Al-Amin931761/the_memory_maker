import React, { useState } from 'react';
import './TableRow.css';

const TableRow = ({ data, index }) => {
    const { image, name, price, _id, quantity } = data;

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/temporaryCartData/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => console.log(data));
    };


    let sizeAndMedium;
    if (parseInt(price) === 150) {
        sizeAndMedium = `18" x 12" - Fine Art Print`;
    } else if (parseInt(price) === 270) {
        sizeAndMedium = `24" x 16" - Fine Art Print`;
    }
    else if (parseInt(price) === 420) {
        sizeAndMedium = `30" x 20" - Fine Art Print`;
    } else {
        sizeAndMedium = `36" x 24" - Fine Art Print`;
    }

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
                        <button onClick={() => handleDelete(_id)} className='btn btn-link m-0 p-0'>Remove</button>
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