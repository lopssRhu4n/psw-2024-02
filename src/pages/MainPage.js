import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { EventCard } from '../components/EventCard';
import { EventForm } from '../components/EventForm'
import { useEffect, useState } from "react";
import '../styles/MainPage.css'
import { useDispatch, useSelector } from "react-redux";
import { fetchEventList, selectAllEvents, selectEventsStatus } from "../store/slices/EventSlice";
import { selectIsAuthenticated } from "../store/slices/AuthSlice";


const MainPage = () => {
    const eventList = useSelector(selectAllEvents);
    const dispatch = useDispatch();
    const eventListFetchingStatus = useSelector(selectEventsStatus);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
        dispatch(fetchEventList());
    }, [eventListFetchingStatus, dispatch]);


    const [showCreationForm, setShowCreationForm] = useState(false);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Criar Evento
        </Tooltip>
    );

    const formRendering = () => {
        if (isAuthenticated && showCreationForm) {
            return <EventForm isUpdateForm={false} setShowForm={setShowCreationForm} showForm={showCreationForm} />
        }
        else if (isAuthenticated) {
            return <OverlayTrigger
                placement="bottom"
                delay={{ show: 100, hide: 100 }}
                overlay={renderTooltip}
            >
                <Button className="bg-primary border-white position-fixed z-3 rounded-circle" onClick={() => setShowCreationForm(true)} style={{ width: '75px', height: '75px', right: '3%', bottom: '6.5rem' }}>
                    <i className="bi bi-plus" width="32" height="32"></i>
                    {showCreationForm}
                </Button>
            </OverlayTrigger>


        }

    }

    return (<div fluid className="mx-auto  main-container  mb-5  gx-4 gy-5 row justify-content-center" style={{ width: '90%' }} >
        {
            eventList.map((val, index) =>
                <div className="main-card-container col-sm-6 col-lg-4" style={{ minWidth: '350px' }} key={'event-card-' + index}>
                    <EventCard val={val} />
                </div>)
        }

        {
            formRendering()
        }
    </div >);
}

export default MainPage;