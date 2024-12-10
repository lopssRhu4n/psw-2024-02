import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { EventCard } from '../components/EventCard';
import { EventForm } from '../components/EventForm'
import { useEffect, useState } from "react";
import '../styles/MainPage.css'
import { useDispatch, useSelector } from "react-redux";
import { fetchEventList, selectAllEvents, selectBestRatedEvents, selectEventsStatus } from "../store/slices/EventSlice";
import { selectIsAuthenticated } from "../store/slices/AuthSlice";
import { fetchAllFeedbacks, selectFeedbackStatus } from "../store/slices/FeedbackSlice";
import { setLoading } from "../store/slices/GlobalSlice";


const MainPage = () => {
    const events = useSelector(selectAllEvents);

    const [nameFilter, setNameFilter] = useState('');

    const eventList = events.filter((event) => event.title?.toLowerCase().includes(nameFilter.toLowerCase()));
    // console.log(eventList)
    const dispatch = useDispatch();
    const eventListFetchingStatus = useSelector(selectEventsStatus);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const bestRated = useSelector(selectBestRatedEvents);
    const eventsStatus = useSelector(selectEventsStatus);
    const feedbackStatus = useSelector(selectFeedbackStatus);

    useEffect(() => {
        dispatch(fetchEventList());
    }, [eventListFetchingStatus, dispatch]);

    useEffect(() => {
        if (eventsStatus === 'pending' || feedbackStatus === 'pending') {
            dispatch(setLoading(true));
        } else {
            dispatch(setLoading(false))
        }
    })

    dispatch(fetchAllFeedbacks());


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
                <Button className="creation-form-button" onClick={() => setShowCreationForm(true)} style={{ width: '75px', height: '75px', right: '3%', bottom: '6.5rem' }}>
                    <i className="bi bi-plus" style={{ fontSize: '6rem', color: 'var(--bs-body-bg)' }}></i>
                    {showCreationForm}
                </Button>
            </OverlayTrigger>


        }

    }

    return (<div fluid className="mx-auto gx-4 gy-5 row justify-content-center" style={{ size: '100%'}}>

        <div className="col-12 p-2">
            <h2 className="px-4 d-flex align-items-center">Melhores Avaliados <i className="bi bi-star-fill ms-2" style={{ color: 'yellow' }}></i></h2>
            <div className="scroll-container-horizontal py-4 overflow-x-scroll d-flex" >
                {bestRated.map((val) =>
                    <div className="mx-5 main-card" style={{ minWidth: '350px'}} key={'best-rated-card-' + val.id}>
                        <EventCard val={val} />
                    </div>

                )}

            </div>
        </div>

        <div className="text-center px-2 col-12 m-0"><h2>Todos os eventos</h2></div>

        <div className="col-12  p-2 d-flex justify-content-center align-items-center">
            <div className="input-group justify-content-center w-50 mx-auto">
                <input className=" my-form-control search-bar" placeholder="Buscar Evento" defaultValue={nameFilter} onChange={(e) => setNameFilter(e.target.value)} id="search" />
                <label htmlFor="search" className="position-absolute" style={{ right: '30px', top: '50%', transform: 'translateY(-75%)', fontSize: '2rem'}}>
                    <i className="bi bi-search"></i>
                </label>
            </div>
        </div>

        <div className="row">
        {eventList.length ? (
          eventList.map((val, index) => (
            <div className="col-lg-4 col-md-6 col-12 mb-4" key={"event-card-" + index}>
                    <div className="main-card mx-auto" style={{ maxWidth: "350px", maxHeight: "350px" }}>      
                            <EventCard val={val} />
                        </div>
                    </div>
                ))
            ) : (
                <h4 className="text-center">Não há eventos.</h4>
            )}
        </div>


        {
            formRendering()
        }
    </div >);
}

export default MainPage;