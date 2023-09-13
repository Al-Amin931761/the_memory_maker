import React, { useEffect, useState } from 'react';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import Sidebar from '../Sidebar/Sidebar';
import { Table } from 'react-bootstrap';
import ManagePrint from './ManagePrint/ManagePrint';

const ManagePrints = () => {
    const [allPrint, setAllPrint] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/allPrint`)
            .then(res => res.json())
            .then(data => setAllPrint(data))
    }, [allPrint]);

    return (
        <div className='common-styles'>
            <PageTitle title='Manage Prints'></PageTitle>
            <div className='d-flex align-items-center'>
                <Sidebar />
                <h1 className='title-margin second-font fw-bold mb-3'>Manage Prints ({allPrint.length})</h1>
            </div>

            <div>
                <Table responsive bordered hover className='mb-0'>
                    <thead>
                        <tr>
                            <th></th>
                            <th className='table-head item'>Image</th>
                            <th className='table-head text-center'>Name</th>
                            <th className='table-head text-center'>Location</th>
                            <th className='table-head text-center'>Edit</th>
                            <th className='table-head text-center'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allPrint.map((data, index) => <ManagePrint key={data._id} data={data} index={index}></ManagePrint>)
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ManagePrints;