import React from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar/Sidebar';
import PageTitle from '../Shared/PageTitle/PageTitle';

const Dashboard = () => {
    return (
        <div className='vh-100 common-styles'>
            <PageTitle title="Dashboard"></PageTitle>
            <div className='d-flex align-items-center'>
                <Sidebar />
                <h1 className='title-margin second-font fw-bold m-0'>Dashboard</h1>
            </div>

            <div className='h-100 d-flex justify-content-center align-items-center' data-aos="flip-up" data-aos-duration="2000">
                <h2 className='second-font'>Welcome to the Dashboard</h2>
            </div>
        </div >
    );
};

export default Dashboard;