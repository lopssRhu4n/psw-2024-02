import React from "react";
import "../styles/Bar.css";
import { Image, Nav, Navbar } from "react-bootstrap"
// import { Container } from "react-bootstrap";

const MainLayout = (props) => {
    return (<div className="vw-100 vh-100">

        <Navbar className="bar z-1 position-absolute d-flex flex-row flex-sm-column  align-items-center py-1 px-3 px-sm-1 py-sm-5 justify-content-between flex-shrink-0 bg-body-tertiary" >
            <div className="d-flex flex-row flex-sm-column">
                <Navbar.Brand className="m-0 text-center mb-3">A</Navbar.Brand>
                <Nav className="flex-column">
                    <Nav.Link>A</Nav.Link>
                    <Nav.Link>A</Nav.Link>
                    <Nav.Link>A</Nav.Link>
                </Nav>
            </div >

            <div style={{ width: '40px' }}>
                <Image src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png" rounded fluid />
            </div>
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