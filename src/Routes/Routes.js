import About from "../Pages/About/About";
import Cart from "../Pages/Cart/Cart";
import Checkout from "../Pages/Cart/Checkout/Checkout";
import CustomerDetails from "../Pages/Cart/CustomerDetails/CustomerDetails";
import Contact from "../Pages/Contact/Contact";
import AddPrint from "../Pages/Dashboard/AddPrint/AddPrint";
import AddReview from "../Pages/Dashboard/AddReview/AddReview";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ManagePrints from "../Pages/Dashboard/ManagePrints/ManagePrints";
import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import Orders from "../Pages/Dashboard/Orders/Orders";
import FAQ from "../Pages/FAQ/FAQ";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login/Login";
import Register from "../Pages/Login/Register/Register";
import MyWishlist from "../Pages/MyWishlist/MyWishlist";
import NotFound from "../Pages/NotFound/NotFound";
import Packages from "../Pages/Packages/Packages";
import PrintDetails from "../Pages/Prints/PrintDetails/PrintDetails";
import Prints from "../Pages/Prints/Prints";
import Main from "../Pages/layout/Main";
import PrivateRoute from "./PrivateRoute";
import RequireOwner from "./RequireOwner";
import RequireUser from "./RequireUser";

const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/packages',
                element: <Packages />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/faq',
                element: <FAQ />
            },
            {
                path: '/prints',
                element: <Prints />
            },
            {
                path: '/printDetails/:id',
                element: <PrivateRoute><PrintDetails /></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/printDetails/${params.id}`)
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/myWishlist',
                element: <PrivateRoute><MyWishlist /></PrivateRoute>
            },
            {
                path: '/cart',
                element: <PrivateRoute><Cart /></PrivateRoute>
            },
            {
                path: '/customerDetails',
                element: <PrivateRoute><CustomerDetails /></PrivateRoute>
            },
            {
                path: '/checkout',
                element: <PrivateRoute><Checkout /></PrivateRoute>
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard /></PrivateRoute>
            },
            {
                path: '/dashboard/myProfile',
                element: <PrivateRoute><MyProfile /></PrivateRoute>
            },
            {
                path: '/dashboard/addReview',
                element: <PrivateRoute><RequireUser><AddReview /></RequireUser></PrivateRoute>
            },
            {
                path: '/dashboard/addPrint',
                element: <PrivateRoute><RequireOwner><AddPrint /></RequireOwner></PrivateRoute>
            },
            {
                path: '/dashboard/myOrders',
                element: <PrivateRoute><RequireUser><MyOrders /></RequireUser></PrivateRoute>
            },
            {
                path: '/dashboard/orders',
                element: <PrivateRoute><RequireOwner><Orders></Orders></RequireOwner></PrivateRoute>
            },
            {
                path: '/dashboard/managePrints',
                element: <PrivateRoute><RequireOwner><ManagePrints /></RequireOwner></PrivateRoute>
            },
            {
                path: '*',
                element: <NotFound />
            },
        ]
    }
]);