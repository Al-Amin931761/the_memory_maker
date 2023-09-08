import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Pages/Shared/Loading/Loading';
import { signOut } from 'firebase/auth';

const RequireUser = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();

    if (loading) {
        return <Loading></Loading>;
    };

    if (user?.email !== 'alamin931761@gmail.com') {
        return children;
    } else {
        signOut(auth);
        return <Navigate to='/login' state={{ from: location }} replace />;
    };
};

export default RequireUser;