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
import Courts from "../Pages/AllCourts/Courts";
import PendingBookings from "../Pages/Dashboard/PendingBookings";
import AllUsers from "../Pages/Dashboard/AllUsers";
import Forbidden from "../Pages/Forbidden/Forbidden";
import AdminRoute from "../Routes/AdminRoute";
import ManageBookingsApproval from "../Pages/Dashboard/ManageBookingsApproval";
import ManageMembers from "../Pages/Dashboard/ManageMembers";
import ApprovedBookings from "../Pages/Dashboard/ApprovedBookings";
import MemberRoutes from "../Routes/MemberRoutes";
import PaymentForm from "../Pages/Dashboard/PaymentForm";
import ManageCoupons from "../Pages/Dashboard/Admin/ManageCoupons";
import ManageBookings from "../Pages/Dashboard/Admin/ManageBookings";
import ConfirmedBookings from "../Pages/Dashboard/Member/ConfirmedBookings";
import PaymentHistory from "../Pages/Dashboard/Member/PaymentHistory";
import MakeAnnouncement from "../Pages/Dashboard/Admin/MakeAnnouncement";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'forbidden',
                Component: Forbidden,
            },
            {
                path: 'courts',
                element: <Courts></Courts>
            }
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
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: 'manageCourts',
                element: <AdminRoute><ManageCourts></ManageCourts></AdminRoute>
            },

            {
                path: 'manageBookingsApproval',
                element: <AdminRoute><ManageBookingsApproval></ManageBookingsApproval></AdminRoute>
            },

            {
                path: 'manageBookings',
                element: <AdminRoute><ManageBookings></ManageBookings></AdminRoute>
            },

            {
                path: 'allUsers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },

            {
                path: 'manageMembers',
                element: <AdminRoute><ManageMembers></ManageMembers></AdminRoute>
            },
            
            {
                path: 'manageCoupons',
                element: <AdminRoute><ManageCoupons></ManageCoupons></AdminRoute>
            },

            {
                path: 'makeAnnouncement',
                element: <AdminRoute><MakeAnnouncement></MakeAnnouncement></AdminRoute>
            },



            {
                path: 'pendingBookings',
                element: <PrivateRoute><PendingBookings></PendingBookings></PrivateRoute>
            },

            {
                path: 'approvedBookings',
                element: <MemberRoutes><ApprovedBookings></ApprovedBookings></MemberRoutes>
            },

            {
                path: 'paymentForm/:id',
                element: <MemberRoutes><PaymentForm></PaymentForm></MemberRoutes>
            },


            {
                path: 'confirmedBookings',
                element: <MemberRoutes><ConfirmedBookings></ConfirmedBookings></MemberRoutes>
            },
            {
                path: 'paymentHistory',
                element: <MemberRoutes><PaymentHistory></PaymentHistory></MemberRoutes>
            },
            {
                path: 'announcement',
                element: <MemberRoutes><PaymentHistory></PaymentHistory></MemberRoutes>
            },


            

        ]
    },
]);