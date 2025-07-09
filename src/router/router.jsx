import {
    createBrowserRouter,
} from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import AuthLayouts from "../Layouts/AuthLayouts";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import PrivateRoute from "../Routes/PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import ManageCourts from "../Pages/Dashboard/ManageCourts";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
        ]
    },
    {
        path: '/',
        Component: AuthLayouts,
        children: [
            {
                path: 'login',
                Component: Login,
            },
            {
                path: 'register',
                Component: Register,
            },
        ]
    },
    {
        path: '/dashboard',
        element : <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: 'manageCourts',
                element:<ManageCourts></ManageCourts>
            }
        ]
    },
]);