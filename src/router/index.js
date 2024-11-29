import { createHashRouter } from "react-router-dom"
import ErrorPage from '../pages/ErrorPage';
import MainPage from '../pages/MainPage';
import EventPage from "../pages/EventPage";
import FeedbackPage from "../pages/FeedbackPage";
import InvitePage from "../pages/InvitePage";
import MainLayout from "../layouts/MainLayout";

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
            {
                path: '/feedback',
                element: <FeedbackPage />
            },
            {
                path: '/invite',
                element: <InvitePage />
            }
        ]
    }
]);

export default router;