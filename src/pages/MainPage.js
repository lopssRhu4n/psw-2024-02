import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { EventCard } from '../components/EventCard';
import { EventForm } from '../components/EventForm'
import { useEffect, useState } from "react";
import '../styles/MainPage.css'
import { useDispatch, useSelector } from "react-redux";
import { fetchEventList, selectAllEvents, selectEventsStatus } from "../store/slices/EventSlice";

const MainPage = () => {
    const eventList = useSelector(selectAllEvents);
    console.log(eventList)
    const dispatch = useDispatch();
    const eventListFetchingStatus = useSelector(state => selectEventsStatus(state));

    useEffect(() => {
        dispatch(fetchEventList());
    }, [eventListFetchingStatus, dispatch]);


    const [showCreationForm, setShowCreationForm] = useState(false);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Criar Evento
        </Tooltip>
    );



    return (<div fluid="sm" className="mx-auto  main-container pt-5 mb-5  gx-4 gy-5 row justify-content-center" style={{ width: '90%' }} >
        <h1 className="col-12"> Eventos </h1>
        {
            // eventList.map((val, index) =>
            //     <div className="main-card-container col-sm-6 col-lg-4" style={{ minWidth: '350px' }} key={'event-card-' + index}>
            //         <EventCard val={val} />
            //     </div>)
        }

        {showCreationForm ? (
            <EventForm isUpdateForm={false} setShowCreationForm={setShowCreationForm} showCreationForm={showCreationForm} />
        ) : (
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 100, hide: 100 }}
                overlay={renderTooltip}
            >
                <Button className="bg-primary position-fixed z-3 rounded-circle" onClick={() => setShowCreationForm(true)} style={{ width: '75px', height: '75px', right: '3%', bottom: '6.5rem' }}>
                    <i className="bi bi-plus" width="32" height="32"></i>
                    {showCreationForm}
                </Button>
            </OverlayTrigger>

        )
        }
    </div >);
}

export default MainPage;