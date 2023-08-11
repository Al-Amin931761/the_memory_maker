import About from "../Pages/About/About";
import Blogs from "../Pages/Blogs/Blogs";
import Checkout from "../Pages/Checkout/Checkout";
import Contact from "../Pages/Contact/Contact";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login/Login";
import Register from "../Pages/Login/Register/Register";
import NotFound from "../Pages/NotFound/NotFound";
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
                path: '/about',
                element: <About></About>
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
                path: '/blogs',
                element: <Blogs></Blogs>
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            },
            {
                path: '/checkout',
                element: <PrivateRoute><Checkout></Checkout></PrivateRoute>
            },
            {
                path: '*',
                element: <NotFound></NotFound>
            },
        ]
    }
]);