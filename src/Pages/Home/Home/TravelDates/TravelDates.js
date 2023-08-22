import React from 'react';
import './TravelDates.css';
import { FaCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import travelImage from '../../../../images/travel.png';

const TravelDates = () => {
    return (
        <div className='mt-5'>
            <h1 className='text-center second-font fw-bold'><FaCalendarAlt className='mb-3' /> Travel Dates {new Date().getFullYear()} <FaCalendarAlt className='mb-3' /></h1>

            <div className='travel-dates-container'>
                <div>
                    <p>This year I am very fortunate to be traveling to so many incredible locations. If you live or will be visiting one of these locations and would like to schedule a session, please reach out <Link className='text-uppercase' to='/contact'>here</Link>.</p>
                    <img className='img-fluid' src={travelImage} alt="" />
                </div>

                <div className='months-and-locations'>
                    <div>
                        <p>February 15-17</p>
                        <p>April 3-6</p>
                        <p>June 28-1</p>
                        <p>August 12-15</p>
                        <p>October 16-19</p>
                        <p>December 12-15</p>
                    </div>
                    <div>

                        <p>USA / San Francisco</p>
                        <p>Mexico / Cancun</p>
                        <p>USA / Rhode Island</p>
                        <p>Ireland / dublin</p>
                        <p>USA / Florida Keys</p>
                        <p>Turks / Caicos</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelDates;