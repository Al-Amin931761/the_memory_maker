import React, { useEffect, useState } from 'react';
import Service from '../Service/Service';
import './Services.css';
import { FaCamera } from "react-icons/fa";

const Services = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/services")
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])


    return (
        <div>
            <h1 className='text-center mt-5 fw-bold'><FaCamera className='mb-2' />  Services ({services.length}) <FaCamera className='mb-2' /> </h1>
            <div className='services'>
                {
                    services.map(service => <Service key={service._id} service={service}></Service>)
                }
            </div>
        </div>
    );
};

export default Services;