import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <Container className="d-flex justify-content-center align-items-center flex-column vw-100 vh-100">
            <h1>Error 404</h1>
            <h5 className="text-center">A página que você estava procurando não existe.</h5>
            <Link to={'/'} onClick={(e) => {
                e.preventDefault();
                navigate(-1);
            }}>Voltar.</Link>
        </Container>
    );
}

export default ErrorPage;