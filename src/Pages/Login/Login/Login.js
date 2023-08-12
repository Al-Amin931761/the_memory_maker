import React, { useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import { BsArrowRight } from 'react-icons/bs';
import './Login.css';
import { toast } from 'react-toastify';
import Loading from '../../Shared/Loading/Loading';
import Social from '../Social/Social';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import loginImage from '../../../images/login.png'
import { BiSolidLogIn } from 'react-icons/bi';
import useToken from '../../../hooks/useToken';

const Login = () => {
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
    const [token] = useToken(user);

    const emailRef = useRef('');
    const passwordRef = useRef('');
    const handleLogin = event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signInWithEmailAndPassword(email, password);
        event.target.reset();
    };

    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, navigate, from])

    let loginError = '';
    if (error) {
        loginError = <p className='text-danger'> {error.message}</p>
    }

    if (loading) {
        return <Loading></Loading>
    }

    // reset password
    const resetPassword = async () => {
        const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast.info('An email has been sent to reset your password');
        }
        else {
            toast.error('Please enter your email address');
        }
    }

    if (sending) {
        return <Loading></Loading>
    }

    return (
        <div className='common-styles'>
            <PageTitle title="Login"></PageTitle>
            <div>
                <h2 className='text-center fw-medium'>Please Login</h2>

                <div className='login-container'>
                    {/* image  */}
                    <div className='login-image'>
                        <img className='img-fluid' src={loginImage} alt="" />
                    </div>

                    {/* form  */}
                    <div className='login'>
                        <form onSubmit={handleLogin}>
                            <div className="form-floating mb-3">
                                <input ref={emailRef} type="email" className="form-control" id="floatingInput" placeholder="Email Address" required />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input ref={passwordRef} type="password" className="form-control" id="floatingPassword" placeholder="Password" required />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>

                            {loginError}

                            <Button className='' variant="outline-dark" type="submit">Login <BiSolidLogIn className='icon' /></Button>
                        </form>
                        <p className='mt-3'>New to The Memory Maker? <Link className='text-decoration-none' to='/register'> Please Register <BsArrowRight /></Link></p>
                        <p>Forget Password? <span onClick={resetPassword} className='text-primary'>Reset Password <BsArrowRight /></span></p>

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

export default Login;