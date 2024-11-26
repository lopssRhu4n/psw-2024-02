import React from "react";
import "../styles/Bar.css";
import { Image, Nav, Navbar } from "react-bootstrap"
import { Outlet, NavLink } from "react-router-dom";
import Auth from '../pages/AuthPage'
// import { Container } from "react-bootstrap";

const MainLayout = (props) => {
    return (<div className="scroll-container max-vw-100 vh-100 overflow-y-auto position-relative">
        <Navbar className="bar shadow-lg z-1 position-fixed  d-flex flex-row flex-sm-column justify-content-center justify-content-sm-start  align-items-center py-1 px-3 px-sm-1 pt-sm-5  flex-shrink-0 bg-body-tertiary" >
            <Navbar.Brand className="m-0 text-center mb-3 my-brand" style={{ fontSize: "12px" }}>Evente-se</Navbar.Brand>
            <Nav className="flex-sm-column   justify-content-around justify-content-sm-start w-100 h-100">
                <Nav.Link as={NavLink} to="/" className="text-center ms-sm-3 d-sm-flex justify-sm-start order-1" style={{ height: "60px" }}><i className="bi bi-house"></i>
                    <p className="nav-link-text">Home</p>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/search" className="text-center ms-sm-3 d-sm-flex justify-sm-start order-2" style={{ height: "60px" }}><i className="bi bi-search"></i> <p className="nav-link-text">Pesquisar</p></Nav.Link>
                <Nav.Link as={NavLink} to="/event" className="text-center ms-sm-3 d-sm-flex justify-sm-start order-4 order-sm-3" style={{ height: "60px" }}><i className="bi bi-plus-circle"></i>
                    <p className="nav-link-text">Evento</p>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/notifications" className="text-center ms-sm-3 d-sm-flex justify-sm-start order-5 order-sm-4 pa-0" style={{ height: "60px" }}><i className="bi bi-bell"></i>
                    <p className="nav-link-text">Notificações</p>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/profile" className=" mt-sm-auto  mb-sm-3 order-3 order-sm-5 pa-0 " style={{ height: "60px" }} >
                    <Image src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png" style={{ width: '50px' }} className="bg-primary p-2 rounded-circle" rounded fluid />
                    <p className="nav-link-text small ">     </p>
                </Nav.Link>
            </Nav>
        </ Navbar>

        <Outlet />
    </div>);

}

export default MainLayout;