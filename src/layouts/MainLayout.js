import React from "react";
import "../styles/Bar.css";
import { Image, Nav, Navbar } from "react-bootstrap"
// import { Container } from "react-bootstrap";

const MainLayout = (props) => {
    return (<div className="vw-100 vh-100">

        <Navbar className="shadow bar z-1 position-absolute d-flex flex-row flex-sm-column justify-content-center justify-content-sm-start  align-items-center py-1 px-3 px-sm-1 pt-sm-5  flex-shrink-0 bg-body-tertiary" >
            <Navbar.Brand className="m-0 text-center mb-3 my-brand" style={{ fontSize: "12px" }}>Evente-se</Navbar.Brand>
            <Nav className="flex-sm-column align-items-center justify-content-around justify-content-sm-start w-100 h-100">
                <Nav.Link className="text-center order-1"><i className="bi bi-house"></i><p className="nav-link-text">Home</p></Nav.Link>
                <Nav.Link className="text-center order-2"><i className="bi bi-search"></i> <p className="nav-link-text">Pesquisar</p></Nav.Link>
                <Nav.Link className="text-center order-4 order-sm-3"><i className="bi bi-plus-circle"></i><p className="nav-link-text">Evento</p></Nav.Link>
                <Nav.Link className="text-center order-5 order-sm-4"><i className="bi bi-bell"></i><p className="nav-link-text">Notificações</p></Nav.Link>
                <Nav.Link className=" items-end order-3 order-sm-5" >
                    <Image src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png" style={{ width: '50px' }} className="bg-primary p-2 rounded-circle" rounded fluid />
                </Nav.Link>
            </Nav>



        </ Navbar>

        {/* <Navbar bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
            </Container>
        </Navbar> */}



    </div>);

}

export default MainLayout;