import React from 'react';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import Sidebar from '../Sidebar/Sidebar';

const MyBookings = () => {
    return (
        <div className='common-styles'>
            <PageTitle title='My Bookings'></PageTitle>
            <div className='d-flex align-items-center'>
                <Sidebar />
                <h2 className='title-margin'>My Bookings</h2>
            </div>
        </div>
    );
};

export default MyBookings;