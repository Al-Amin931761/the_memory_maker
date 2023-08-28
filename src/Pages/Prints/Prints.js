import React from 'react';
import './Prints.css';
import Print from './Print/Print';
import PageTitle from '../Shared/PageTitle/PageTitle';
import usePrints from '../../hooks/usePrints';
import Loading from '../Shared/Loading/Loading';

const Prints = () => {
    const [prints, setPrints] = usePrints();
    if (prints.length === 0) {
        return <Loading></Loading>;
    }

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