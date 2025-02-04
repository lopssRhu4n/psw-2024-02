import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/Auth.css";

const AuthLayout = () => {
    return (
        <Container className="d-flex vh-100  flex-column justify-content-center align-items-center">
            <h1>Evente-se</h1>


            <div className="login-main  w-50  rounded rounded rounded-3 border mt-4" style={{ minWidth: '320px', minHeight: '75%' }}>
                <Navbar className="d-flex flex-column pt-0">
                    <Nav variant="tabs" as={Row} className="w-100  border-bottom pa-0">
                        <Nav.Link as={NavLink} to="/auth/login" className="col-6 text-center rounded-end-0 border-top-0 border-start-0">Entrar</Nav.Link>
                        <Nav.Link as={NavLink} to="/auth/register" className="col-6 text-center rounded-start-0 border-end-0 border-top-0">Cadastre-se</Nav.Link>
                    </Nav>
                </Navbar>

                <Outlet />
            </div>
        </Container>
    );
}

export default AuthLayout;