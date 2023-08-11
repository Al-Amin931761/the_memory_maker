import React from 'react';
import Banner from '../Banner/Banner';
import Photography from '../Photography/Photography';
import Services from '../Services/Services';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const Home = () => {
    const [user, loading, error] = useAuthState(auth);
    console.log(user);
    return (
        <div>
            <PageTitle title="Home"></PageTitle>
            <Banner></Banner>
            <Photography></Photography>
            <Services></Services>
        </div>
    );
};

export default Home;