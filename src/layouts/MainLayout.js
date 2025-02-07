import React from "react";
import "../styles/Bar.css";
import { Button, Image, Nav, Navbar } from "react-bootstrap"
import { Outlet, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, userLoggedOut, } from "../store/slices/AuthSlice";
import defaultProfilePlaceholder from "../assets/defaultProfilePlaceholder.jpg";
import { selectIsLoading } from "../store/slices/GlobalSlice";
import useSSE from "../hooks/useSSE";
import { baseUrl } from "../http/client";

const MainLayout = (props) => {


    useSSE(baseUrl + '/subscribe');
    // console.log(updates)

    const isLoading = useSelector(selectIsLoading);
    const dispatch = useDispatch();
    // const token = useSelector(selectAuthToken);
    const user = useSelector(selectCurrentUser);

    // useEffect(() => {
    //     if (token) dispatch(userRefresh());
    // })

    const userExists = Object.keys(user).length;

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(userLoggedOut());

    }

    return (<div className="scroll-container max-vw-100 vh-100 overflow-y-auto position-relative">


        {
            isLoading &&
            <div className="loading-container h1 position-absolute vh-100 vw-100 d-flex justify-content-center align-items-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
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

                        src={user?.img ? 'http://localhost:3004' + user?.img : defaultProfilePlaceholder} className="bg-primary border border-light-subtle rounded-circle object-cover-fit" rounded height={50} width={50} />
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