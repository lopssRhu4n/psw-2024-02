import { createHashRouter } from "react-router-dom"
import App from '../App';
import ErrorPage from '../pages/ErrorPage';
import MainPage from '../pages/MainPage';
import EventPage from "../pages/EventPage";
import FeedbackPage from "../pages/FeedbackPage";
import InvitePage from "../pages/InvitePage";

const router = createHashRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <MainPage />
            },
            {
                path: '/event',
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