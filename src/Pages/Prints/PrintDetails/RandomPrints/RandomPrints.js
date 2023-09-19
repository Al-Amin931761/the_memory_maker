import React, { useEffect, useState } from 'react';
import RandomPrint from './RandomPrint/RandomPrint';

const RandomPrints = ({ id }) => {
    const [prints, setPrints] = useState([]);

    // load prints data from database
    useEffect(() => {
        fetch(`http://localhost:5000/allPrint`)
            .then(res => res.json())
            .then(data => setPrints(data))
    }, []);

    // create random full array
    const randomFullIndexArray = [];
    for (let i = prints.length - 1; i >= 0; i--) {
        randomFullIndexArray.push(prints[Math.floor(Math.random() * i)]);
    };

    // reduce the same print
    const randomIndexArray = randomFullIndexArray.filter((element, index, array) => array.indexOf(element) === index);

    // remove detail page print from the random array
    const randomPrints = randomIndexArray.filter(randomPrint => randomPrint._id !== id);

    return (
        <div>
            <h2 className='second-font fw-bold mb-3 text-center'>You may also like</h2>
            <div className='prints-container'>
                {
                    randomPrints.slice(0, 3).map(data => <RandomPrint key={data._id} data={data}></RandomPrint>)
                }
            </div>
        </div>
    );
};

export default React.memo(RandomPrints);