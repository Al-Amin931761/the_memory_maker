import React, { useEffect, useState } from 'react';
import './Packages.css';
import { FaCamera } from "react-icons/fa";
import Package from './Package/Package';
import Loading from '../Shared/Loading/Loading';
import PageTitle from '../Shared/PageTitle/PageTitle';

const Packages = () => {
    useEffect(() => {
        fetch("https://the-memory-maker-server.vercel.app/packages")
            .then(res => res.json())
            .then(data => setPackages(data))
    }, []);

    const [packages, setPackages] = useState([]);
    if (packages.length === 0) {
        return <Loading></Loading>;
    };

    return (
        <div className='common-styles' data-aos="fade-up" data-aos-duration="1000">
            <PageTitle title="Packages"></PageTitle>
            <h1 className='mb-3 text-center fw-bold second-font'><FaCamera className='mb-2' />  Packages ({packages.length}) <FaCamera className='mb-2' /> </h1>

            <div className='packages'>
                {
                    packages.map(data => <Package key={data._id} data={data}></Package>)
                }
            </div>
        </div>
    );
};

export default Packages;