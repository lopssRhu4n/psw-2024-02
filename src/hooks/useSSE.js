import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeEventsStatus } from "../store/slices/EventSlice";
import { changeFeedbacksStatus } from "../store/slices/FeedbackSlice";
import { changeInvitesStatus } from "../store/slices/InviteSlice";
import { changeAuthStatus } from "../store/slices/AuthSlice";

const useSSE = (url) => {
    // const [updates, setUpdates] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const eventSource = new EventSource(url);

        eventSource.onmessage = (event) => {
            const newUpdate = JSON.parse(event.data);
            console.log(newUpdate);
            switch (newUpdate.collection) {
                case 'events':
                    dispatch(changeEventsStatus('idle'))
                    break;
                case 'invites':
                    dispatch(changeInvitesStatus('idle'))
                    break;
                case 'feedbacks':
                    dispatch(changeFeedbacksStatus('idle'))
                    break;
                case 'users':
                    dispatch(changeAuthStatus('idle'))
                    break;
                default:
                    return;
            }
        };

        return () => {
            eventSource.close();
        };
    }, [url, dispatch]);
};

export default useSSE;
