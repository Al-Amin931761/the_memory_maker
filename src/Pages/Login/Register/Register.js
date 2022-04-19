import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { ImCross } from 'react-icons/im';
import Loading from '../../Shared/Loading/Loading';
import './Register.css';

const Register = () => {
    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');

    const handleRegister = event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const name = nameRef.current.value;
        createUserWithEmailAndPassword(email, password);
    }

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const navigate = useNavigate();

    if (user) {
        navigate("/");
    }

    let registerError = '';
    if (error) {
        registerError = <div><p className='text-danger'> < ImCross /> {'Error: This email has been used before. Please try another email to register'}</p></div>
    }

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className='register-container'>
            <div className='w-50 mx-auto mt-5 mb-5'>
                <h2 className='text-center fw-bold'>Please Register</h2>
                <Form onSubmit={handleRegister}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref={nameRef} type="name" placeholder="Enter Your Name" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control ref={emailRef} type="email" placeholder="Enter Your Email" required />
                    </Form.Group>

                    {registerError}

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control ref={passwordRef} type="password" placeholder="Enter Your Password" required />
                    </Form.Group>

                    <Button variant="outline-dark" type="submit">
                        Register
                    </Button>
                </Form>
                <p className='mt-3'>Already have an account? <Link className='text-decoration-none' to='/login'> Please Login</Link>

                </p>
            </div>
        </div>
    );
};

export default Register;