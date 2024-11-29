import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <Container className="d-flex vh-100  flex-column justify-content-center align-items-center">
            <h1>Evente-se</h1>


            <div className="h-75 w-50 bg-black rounded rounded rounded-3 border mt-4" style={{ minWidth: '320px' }}>
                <Navbar className="d-flex flex-column pt-0">
                    <Nav as={Row} className="w-100 px-4 border-bottom">
                        <Nav.Link as={NavLink} to="/auth/login" className="col-6 text-center border-end">Entrar</Nav.Link>
                        <Nav.Link as={NavLink} to="/auth/register" className="col-6 text-center ">Cadastre-se</Nav.Link>
                    </Nav>
                </Navbar>

                <Outlet />
            </div>
        </Container>
    );
}

export default AuthLayout;