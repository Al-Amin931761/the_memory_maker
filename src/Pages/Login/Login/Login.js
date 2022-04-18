import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import { FcGoogle } from 'react-icons/fc';
import { IoMdLogIn } from 'react-icons/io';
import { ImCross } from 'react-icons/im';
import './Login.css';

const Login = () => {


    // signIn With Email And Password
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const emailRef = useRef('');
    const passwordRef = useRef('');

    const handleLogin = event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signInWithEmailAndPassword(email, password);
    }

    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    if (user) {
        navigate(from, { replace: true });
    }

    let loginError = '';
    if (error) {
        loginError = <div><p className='text-danger'> < ImCross /> {'Error: Enter a valid email address and password'}</p></div>
    }

    // Sign In With Google 
    const [signInWithGoogle, user2, loading2, error2] = useSignInWithGoogle(auth);

    let errorElement = '';
    if (error2) {
        errorElement = <div>
            <p className='text-danger'> < ImCross /> {'Error: Popup closed by user'}</p>
        </div>

    }
    if (user2) {
        navigate(from, { replace: true });
    }


    // reset password
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

    const resetPassword = async () => {
        const email = emailRef.current.value;
        await sendPasswordResetEmail(email);
        alert('Sent email');
    }

    return (
        <div className='w-50 mx-auto mt-5 mb-5'>
            <h2 className='text-center'>Please Login</h2>

            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={emailRef} type="email" placeholder="Please Enter Your Email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passwordRef} type="password" placeholder="Please Enter Your Password " required />
                </Form.Group>

                {loginError}

                <Button variant="outline-dark" type="submit">
                    Login <IoMdLogIn className='fs-3' />
                </Button>
            </Form>
            <p>New to The Memory Maker? <Link className='text-decoration-none' to='/register'>Please Register</Link></p>
            <p>Forget Password? <Link className='text-decoration-none' to='/register'><span onClick={resetPassword}>Reset Password</span></Link></p>

            <div className='d-flex align-items-center'>
                <div style={{ height: '1px' }} className='bg-success w-50'></div>
                <p className='mt-2 px-2'>Or</p>
                <div style={{ height: '1px' }} className='bg-success w-50'></div>
            </div>

            {errorElement}

            <Button onClick={() => signInWithGoogle()} variant="outline-dark"><FcGoogle className='fs-2' /> Google Sign In</Button>
        </div>
    );
};

export default Login;