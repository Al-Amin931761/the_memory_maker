import React from 'react';
import notfound from '../../images/notfound.jpg'
import PageTitle from '../Shared/PageTitle/PageTitle';

const NotFound = () => {
    return (
        <div>
            <PageTitle title="404"> </PageTitle>
            <img className='img-fluid' src={notfound} alt="" />
        </div>
    );
};

export default NotFound;