import React from 'react';
import './Header.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from '../../../images/logo.png'
import { Link, NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { signOut } from 'firebase/auth';

const Header = () => {
    const [user] = useAuthState(auth);
    const handleLogOut = () => {
        signOut(auth);
    }

    return (
        <Navbar sticky='top' collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <div className='d-flex align-items-center'>
                        <img width={40} src={logo} alt="" />
                        <h3 className='ms-2'>The Memory Maker</h3>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className={({ isActive }) => isActive ? "active" : "link-styles"}>Home</NavLink>
                        <NavLink to="/about" className="link-styles">About</NavLink>
                    </Nav>
                    <Nav>
                        <NavLink to="/blogs" className="link-styles">Blogs</NavLink>
                        <NavLink to="/contact" className="link-styles">Contact</NavLink>
                        {
                            user ? <span className='logout-button' onClick={handleLogOut}>Log Out</span> : <NavLink to="/login" className="link-styles">Login</NavLink>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;