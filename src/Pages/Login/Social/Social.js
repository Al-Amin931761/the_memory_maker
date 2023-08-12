import React, { useEffect } from 'react';
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import { Button } from 'react-bootstrap';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import useToken from '../../../hooks/useToken';

const Social = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [signInWithGithub, githubUser, githubLoading, githubError] = useSignInWithGithub(auth);
    const [token] = useToken(googleUser || githubUser);

    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, from, navigate])

    // error 
    let errorElement = '';
    if (googleError || githubError) {
        errorElement = <p className='text-danger my-3 text-center'>{googleError?.message || githubError?.message}</p>
    }

    // loading 
    if (googleLoading || githubLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <Button onClick={() => signInWithGoogle()} variant="outline-dark"><FcGoogle className='fs-2' /> Continue with Google</Button> <br />
            <Button className='mt-3' onClick={() => signInWithGithub()} variant="outline-dark"><BsGithub className='fs-2' /> Continue with Github</Button>
            {errorElement}
        </div>
    );
};

export default Social;