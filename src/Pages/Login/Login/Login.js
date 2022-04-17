import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import { FcGoogle } from 'react-icons/fc';
import { IoMdLogIn } from 'react-icons/io';

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

    // Sign In With Google 
    const [signInWithGoogle, user2, loading2, error2] = useSignInWithGoogle(auth);

    if (error2) {
        return (
            <div>
                <p>Error: {error2.message}</p>
            </div>
        );
    }

    if (user2) {
        navigate(from, { replace: true });
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


                <Button variant="primary" type="submit">
                    Login <IoMdLogIn className='fs-3' />
                </Button>
            </Form>
            <p>New to The Memory Maker? <Link className='text-decoration-none' to='/register'><b>Please Register</b></Link></p>

            <button onClick={() => signInWithGoogle()}> <FcGoogle className='fs-2' /> Google Sign In </button>
        </div>
    );
};

export default Login;