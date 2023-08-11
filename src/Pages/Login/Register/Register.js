import React, { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import { BsArrowRight } from 'react-icons/bs';
import './Register.css';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import registerImage from '../../../images/register.png';
import { BiSolidLogIn } from 'react-icons/bi';
import Social from '../Social/Social';
import { toast } from 'react-toastify';


const Register = () => {
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const confirmPasswordRef = useRef('');

    const handleRegister = event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        if (password === confirmPassword) {
            createUserWithEmailAndPassword(email, password);
            event.target.reset();
        } else {
            toast.error('Password did not match');
        }
    }


    const navigate = useNavigate();
    if (user) {
        navigate("/");
    }

    let registerError = '';
    if (error) {
        registerError = <div><p className='text-danger'> {error?.message}</p></div>
    }

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className='common-styles'>
            <PageTitle title="Register"></PageTitle>

            <div className='register-container'>
                <div className="register-image">
                    <img className='img-fluid' src={registerImage} alt="" />
                </div>

                <div className="register">
                    <div>
                        <h2 className='text-center fw-medium'>Please Register</h2>
                        <form onSubmit={handleRegister}>

                            {/* name */}
                            <div className="form-floating mb-3">
                                <input ref={nameRef} type="text" className="form-control" id="floatingInput" placeholder="Name" required />
                                <label htmlFor="floatingInput">Name</label>
                            </div>

                            {/* email */}
                            <div className="form-floating mb-3">
                                <input ref={emailRef} type="email" className="form-control" id="floatingInput" placeholder="Email" required />
                                <label htmlFor="floatingInput">Email Address</label>
                            </div>

                            {/* password */}
                            <div className="form-floating mb-3">
                                <input ref={passwordRef} type="password" className="form-control" id="floatingInput" placeholder="Password" required />
                                <label htmlFor="floatingInput">Password</label>
                            </div>

                            {/*confirm password */}
                            <div className="form-floating mb-3">
                                <input ref={confirmPasswordRef} type="password" className="form-control" id="floatingInput" placeholder=" Confirm Password" required />
                                <label htmlFor="floatingInput">Confirm Password</label>
                            </div>

                            {registerError}

                            <Button variant="outline-dark" type="submit">
                                Register <BiSolidLogIn className='icon' />
                            </Button>
                        </form>
                        <p className='mt-3'>Already have an account? <Link className='text-decoration-none' to='/login'> Please Login <BsArrowRight /></Link>
                        </p>

                        <div className='d-flex align-items-center'>
                            <div style={{ height: '1px' }} className='bg-dark w-50'></div>
                            <p className='mt-2 px-2'>Or</p>
                            <div style={{ height: '1px' }} className='bg-dark w-50'></div>
                        </div>

                        <div className='text-center'>
                            <Social></Social>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;