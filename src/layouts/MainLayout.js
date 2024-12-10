import React from "react";
import "../styles/Bar.css";
import { Button, Image, Nav, Navbar } from "react-bootstrap"
import { Outlet, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, userLoggedOut } from "../store/slices/AuthSlice";
import defaultProfilePlaceholder from "../assets/defaultProfilePlaceholder.jpg";
import { selectIsLoading } from "../store/slices/GlobalSlice";
// import { Container } from "react-bootstrap";

const MainLayout = (props) => {

    const isLoading = useSelector(selectIsLoading);
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);

    const userExists = Object.keys(user).length;

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(userLoggedOut());

    }

    return (<div className="scroll-container max-vw-100 vh-100 overflow-y-auto position-relative">


        {
            isLoading &&
            <div className="loading-container h1 position-absolute vh-100 vw-100 d-flex justify-content-center align-items-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        }


        <Navbar className="px-3 px-md-5 d-flex justify-content-between bar sticky-bottom  mb-5  z-1 ">
            <Navbar.Brand>
                <Nav.Link as={NavLink} to="/"> Evente-se</Nav.Link>
            </Navbar.Brand>
            <Nav className="justify-content-around justify-content-sm-start align-items-center  h-100">
                {/* <Nav.Link as={NavLink} to="/notifications" className="text-center  d-sm-flex justify-content-center align-items-center   pa-0" style={{ height: "60px" }}><i className="bi bi-bell h4 mb-none mx-4" style={{ marginBottom: 0 }}></i>
                </Nav.Link> */}
                <Nav.Link as={NavLink} to={Object.keys(user).length ? '/profile' : '/auth/register'} className="pa-0 " style={{ height: "60px" }} >
                    <Image
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = defaultProfilePlaceholder;
                        }}

                        src={user.profile_image ?? defaultProfilePlaceholder} style={{ width: '50px' }} className="bg-primary p-2 rounded-circle" rounded fluid />
                </Nav.Link>
                {
                    userExists ?
                        <Nav.Link as={NavLink}>
                            <Button className="rounded-5 border-white bg-transparent" onClick={handleLogout} style={{ width: '50px', height: '50px' }}>
                                <i className="bi bi-door-closed"></i>
                            </Button>
                        </Nav.Link>
                        : ''
                }
            </Nav>
        </Navbar>
        <Outlet />
    </div >);

}

export default MainLayout;