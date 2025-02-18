import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home";
import JoinUs from "../Pages/JoinUs";
import SignIn from "../Components/SignIn";
import SignUp from "../Components/SignUp";
import Dashboard from "../Pages/Dashboard/Dashboard";
import BannerAdvertise from "../Pages/Dashboard/DashBoard Page/BannerAdvertise";
import CategoryProducts from "../Pages/CategoryProducts";
import ManageMedicines from "../Pages/Dashboard/DashBoard Page/ManageMedicines";
import Shop from "../Pages/Shop";
import PrivetRoute from "./PrivetRoute";
import CartPage from "../Pages/Dashboard/DashBoard Page/CartPage";
import ManageUsers from "../Pages/Dashboard/DashBoard Page/ManageUsers";
import AdminRoute from "./AdminRoute";
import ManageCategory from "../Pages/Dashboard/DashBoard Page/ManageCategory";
import SellerRoute from "./SellerRoute";
import ManageAds from "../Pages/Dashboard/DashBoard Page/ManageAds";

import PaymentHistory from "../Pages/Dashboard/DashBoard Page/PaymentHistory";
import CheckoutPage from "../Pages/Dashboard/CheckoutPage";
import InvoicePage from "../Pages/InvoicePage";

import SellerHome from "../Pages/Dashboard/DashBoard Page/SellerHome";
import SalesReportPage from "../Pages/Dashboard/DashBoard Page/SalesReportPage";

import Statistics from "../Pages/Dashboard/Statistics";
import Profile from "../Pages/Dashboard/DashBoard Page/Profile";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children : [
            {
                path:'/',
                element: <Home/>
            },
            {
                path: '/category/:category',
                element: <CategoryProducts/>
            },
            {
                path: '/shop',
                element: <Shop/>
            },
            {
                path: '/cart-page',
                element: <PrivetRoute><CartPage/></PrivetRoute>
            },
            {
                path: '/checkout-page',
                element: <PrivetRoute> <CheckoutPage/> </PrivetRoute>
            },
            {
                path: '/invoice',
                element: <PrivetRoute> <InvoicePage/> </PrivetRoute>
            },
            {
                path:'/join-us',
                element: <JoinUs/>,
                children : [
                    {
                        index: true,
                        element: <SignIn/>
                    },
                    {
                        path: 'signUp',
                        element: <SignUp/>
                    },
                ]
            },


        ]
    },
    {
        path: '/dashboard',
        element: <PrivetRoute><Dashboard/></PrivetRoute>,
        children : [
            {
                index: true,
                element: <PrivetRoute> <AdminRoute> <Statistics/> </AdminRoute> </PrivetRoute>
            },
            {
                path: 'seller-home',
                element: <PrivetRoute> <SellerRoute> <SellerHome/> </SellerRoute> </PrivetRoute>
            },
            {
                path: 'sales-report',
                element: <PrivetRoute> <AdminRoute> <SalesReportPage/> </AdminRoute> </PrivetRoute>
            },
            {
                path: 'manage-medicines',
                element: <PrivetRoute> <SellerRoute> <ManageMedicines/> </SellerRoute> </PrivetRoute>
            },
            {
                path: 'ads',
                element: <PrivetRoute> <SellerRoute> <ManageAds/> </SellerRoute>  </PrivetRoute>
            },
            {
                path: 'advertise',
                element: <PrivetRoute> <AdminRoute><BannerAdvertise/></AdminRoute> </PrivetRoute>
            },
            {
                path: 'users',
                element: <PrivetRoute> <AdminRoute> <ManageUsers/> </AdminRoute> </PrivetRoute>
            },
            {
                path: 'manage-category',
                element: <PrivetRoute> <AdminRoute> <ManageCategory /> </AdminRoute> </PrivetRoute>
            },
            {
                path: 'payment-history',
                element: <PrivetRoute>  <PaymentHistory />  </PrivetRoute>
            },
            {
                path: 'Profile',
                element: <PrivetRoute>  <Profile/>  </PrivetRoute>
            },
        ]
    }
])