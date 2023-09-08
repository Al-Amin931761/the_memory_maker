import React, { useEffect, useState } from 'react';
import './Prints.css';
import Print from './Print/Print';
import PageTitle from '../Shared/PageTitle/PageTitle';
import Loading from '../Shared/Loading/Loading';
import { FloatingLabel, Form } from 'react-bootstrap';

const Prints = () => {
    const [prints, setPrints] = useState([]);
    const [count, setCount] = useState(0);
    const [printPerPage, setPrintPerPage] = useState(3)
    const [currentPage, setCurrentPage] = useState(0);

    // load prints data 
    useEffect(() => {
        fetch(`http://localhost:5000/prints?page=${currentPage}&limit=${printPerPage}`)
            .then(res => res.json())
            .then(data => {
                setPrints(data.prints)
                setCount(data.count);
            })
    }, [currentPage, printPerPage, prints])


    if (prints.length === 0) {
        return <Loading></Loading>;
    }

    // pagination 
    const totalPages = Math.ceil(count / printPerPage);
    // let pageNumbers = [];
    // for (let i = 0; i < totalPages; i++) {
    //     pageNumbers.push(i)
    // }
    // shortcut
    let pageNumbers = [...Array(totalPages).keys()];


    const handleSelectChange = (event) => {
        setPrintPerPage(parseInt(event.target.value));
        setCurrentPage(0); // ****
    }
    return (
        <div className='common-styles'>
            <PageTitle title="Prints"></PageTitle>
            <h2 className='second-font text-center'>Prints</h2>

            <div className='prints-container common-styles'>
                {
                    prints.map(data => <Print key={data._id} data={data}></Print>)
                }
            </div>

            {/* pagination */}
            <div className='d-flex align-items-center justify-content-center'>
                <div>
                    {
                        pageNumbers.map(number => <button onClick={() => setCurrentPage(number)} key={number} className={currentPage === number ? 'btn btn-dark rounded-0 p-3' : 'btn btn-outline-dark rounded-0 p-3'}>{number + 1}</button>)
                    }
                </div>

                <FloatingLabel style={{ width: '90px' }} className='p-0 ms-2 ' onChange={handleSelectChange} controlId="floatingSelectGrid" label="Show">
                    <Form.Select className='border border-dark' aria-label="Floating label select example">
                        <option className='text-center' value="3">3</option>
                        <option className='text-center' value="6">6</option>
                        <option className='text-center' value="9">9</option>
                        <option className='text-center' value="12">12</option>
                        <option className='text-center' value="15">15</option>
                    </Form.Select>
                </FloatingLabel>
            </div>
        </div>
    );
};

export default Prints;