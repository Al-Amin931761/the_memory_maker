import About from "../Pages/About/About";
import Cart from "../Pages/Cart/Cart";
import Checkout from "../Pages/Cart/Checkout/Checkout";
import CustomerDetails from "../Pages/Cart/CustomerDetails/CustomerDetails";
import Contact from "../Pages/Contact/Contact";
import AddPrint from "../Pages/Dashboard/AddPrint/AddPrint";
import AddReview from "../Pages/Dashboard/AddReview/AddReview";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import Orders from "../Pages/Dashboard/Orders/Orders";
import FAQ from "../Pages/FAQ/FAQ";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login/Login";
import Register from "../Pages/Login/Register/Register";
import NotFound from "../Pages/NotFound/NotFound";
import Packages from "../Pages/Packages/Packages";
import PrintDetails from "../Pages/Prints/Print/PrintDetails/PrintDetails";
import Prints from "../Pages/Prints/Prints";
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
                path: '/prints',
                element: <Prints></Prints>
            },
            {
                path: '/printDetails/:id',
                element: <PrivateRoute><PrintDetails></PrintDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/printDetails/${params.id}`)
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
                path: '/cart',
                element: <PrivateRoute><Cart></Cart></PrivateRoute>
            },
            {
                path: '/customerDetails',
                element: <PrivateRoute><CustomerDetails></CustomerDetails></PrivateRoute>
            },
            {
                path: '/checkout',
                element: <PrivateRoute><Checkout></Checkout></PrivateRoute>
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
                path: '/dashboard/addPrint',
                element: <PrivateRoute><AddPrint></AddPrint></PrivateRoute>
            },
            {
                path: '/dashboard/myOrders',
                element: <PrivateRoute><MyOrders></MyOrders></PrivateRoute>
            },
            {
                path: '/dashboard/orders',
                element: <PrivateRoute><Orders></Orders></PrivateRoute>
            },
            {
                path: '*',
                element: <NotFound></NotFound>
            },
        ]
    }
]);