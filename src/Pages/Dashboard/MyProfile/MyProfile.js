import React from 'react';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import Sidebar from '../Sidebar/Sidebar';

const MyProfile = () => {
    return (
        <div className='common-styles'>
            <PageTitle title="My Profile"></PageTitle>
            <div className='d-flex align-items-center'>
                <Sidebar />
                <h2 className='title-margin'>My Profile</h2>
            </div>


        </div>
    );
};

export default MyProfile;