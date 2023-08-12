import React from 'react';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import Sidebar from '../Sidebar/Sidebar';

const AddReview = () => {
    return (
        <div className='common-styles'>
            <PageTitle title='Add Review'></PageTitle>
            <div className='d-flex align-items-center'>
                <Sidebar />
                <h2 className='title-margin'>Add Review</h2>
            </div>
        </div>
    );
};

export default AddReview;