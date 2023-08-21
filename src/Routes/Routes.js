import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import AddReview from "../Pages/Dashboard/AddReview/AddReview";
import Bookings from "../Pages/Dashboard/Bookings/Bookings";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MyBookings from "../Pages/Dashboard/MyBookings/MyBookings";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import FAQ from "../Pages/FAQ/FAQ";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login/Login";
import Register from "../Pages/Login/Register/Register";
import NotFound from "../Pages/NotFound/NotFound";
import Packages from "../Pages/Packages/Packages";
import Main from "../Pages/layout/Main";
import PrivateRoute from "./PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/packages',
                element: <Packages></Packages>
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/faq',
                element: <FAQ></FAQ>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            },
            {
                path: '/dashboard/myProfile',
                element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
            },
            {
                path: '/dashboard/addReview',
                element: <PrivateRoute><AddReview></AddReview></PrivateRoute>
            },
            {
                path: '/dashboard/myBookings',
                element: <PrivateRoute><MyBookings></MyBookings></PrivateRoute>
            },
            {
                path: '/dashboard/bookings',
                element: <PrivateRoute><Bookings></Bookings></PrivateRoute>
            },
            {
                path: '*',
                element: <NotFound></NotFound>
            },
        ]
    }
]);