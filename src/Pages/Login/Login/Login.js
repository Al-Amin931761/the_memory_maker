import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import { FcGoogle } from 'react-icons/fc';
import { IoMdLogIn } from 'react-icons/io';
import { ImCross } from 'react-icons/im';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../Shared/Loading/Loading';

const Login = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

    const handleLogin = event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signInWithEmailAndPassword(email, password);
    }

    // signIn With Email And Password
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

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
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    let errorElement = '';
    if (googleError) {
        errorElement = <div>
            <p className='text-danger'> < ImCross /> {'Error: Popup closed by user'}</p>
        </div>
    }

    if (googleUser) {
        navigate(from, { replace: true });
    }

    if (loading || googleLoading) {
        return <Loading></Loading>
    }



    // reset password
    const resetPassword = async () => {
        const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast('Sent email');
        }
        else {
            toast('Please enter your email address')
        }
    }

    if (sending) {
        return <Loading></Loading>
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
            <p>Forget Password?<Button variant="link" className='text-decoration-none mb-1' ><span onClick={resetPassword}>Reset Password</span></Button></p>

            <div className='d-flex align-items-center'>
                <div style={{ height: '1px' }} className='bg-success w-50'></div>
                <p className='mt-2 px-2'>Or</p>
                <div style={{ height: '1px' }} className='bg-success w-50'></div>
            </div>

            {errorElement}

            <Button onClick={() => signInWithGoogle()} variant="outline-dark"><FcGoogle className='fs-2' /> Google Sign In</Button>

            <ToastContainer />
        </div>
    );
};

export default Login;