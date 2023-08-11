import React from 'react';
import auth from '../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../Pages/Shared/Loading/Loading';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();

    if (loading) {
        return <Loading></Loading>
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children;
};

export default PrivateRoute;