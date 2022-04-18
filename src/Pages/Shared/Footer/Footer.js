import React from 'react';
import { FaRegCopyright } from 'react-icons/fa';

const Footer = () => {
    const today = new Date();
    const year = today.getFullYear();
    return (
        <footer className='text-center'>
            <p><small>Copyright  <FaRegCopyright /> {year}</small></p>
        </footer>
    );
};

export default Footer;