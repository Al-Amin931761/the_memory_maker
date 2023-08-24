import React, { useEffect, useState } from 'react';
import './Prints.css';
import Print from './Print/Print';
import PageTitle from '../Shared/PageTitle/PageTitle';

const Prints = () => {
    const [prints, setPrints] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/prints`)
            .then(res => res.json())
            .then(data => setPrints(data))
    }, [prints])
    return (
        <div>
            <PageTitle title="Prints"></PageTitle>
            <h2 className='second-font text-center'>Prints</h2>
            <div className='prints-container common-styles'>
                {
                    prints.map(data => <Print key={data._id} data={data}></Print>)
                }
            </div>
        </div>
    );
};

export default Prints;