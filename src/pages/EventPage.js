import { useParams } from "react-router-dom";

const EventPage = () => {
    const { id } = useParams();
    return <div className="text-center"><h1>Tela do Evento {id}</h1></div>


}

export default EventPage;
