import { createHashRouter } from "react-router-dom"
import ErrorPage from '../pages/ErrorPage';
import MainPage from '../pages/MainPage';
import EventPage from "../pages/EventPage";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";

const router = createHashRouter([
    {
        path: '/',
        // element: <App />,
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <MainPage />
            },
            // {
            //     path: '/event',
            //     element: <EventPage />
            // },
            {
                path: '/event/:id',
                element: <EventPage />
            },
            // {
            //     path: '/feedback',
            //     element: <FeedbackPage />
            // },
            // {
            //     path: '/invite',
            //     element: <InvitePage />
            // },
            {
                path: '/profile',
                element: <ProfilePage />
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: '/auth/login',
                element: <LoginPage />
            },
            {
                path: '/auth/register',
                element: <RegisterPage />
            }
        ],
        errorElement: <ErrorPage />
    }
]);

export default router;