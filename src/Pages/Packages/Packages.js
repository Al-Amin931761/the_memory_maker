import React, { useEffect, useState } from 'react';
import './Packages.css';
import { FaCamera } from "react-icons/fa";
import Package from './Package/Package';

const Packages = () => {

    const [packages, setPackages] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/packages")
            .then(res => res.json())
            .then(data => setPackages(data))
    }, [])


    return (
        <div>
            <h1 className='text-center mt-5 fw-bold second-font'><FaCamera className='mb-2' />  Packages ({packages.length}) <FaCamera className='mb-2' /> </h1>
            <div className='packages'>
                {
                    packages.map(data => <Package key={data._id} data={data}></Package>)
                }
            </div>
        </div>
    );
};

export default Packages;