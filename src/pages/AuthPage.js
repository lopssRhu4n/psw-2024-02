import { useDispatch, useSelector } from 'react-redux';
import { Container } from "react-bootstrap";
import Login from "../components/Auth/Login/Login";
import Registration from "../components/Auth/Registration/Registration";
import Sign from "../components/Auth/SignOptions/SignOptions";
import { setActiveComponent } from '../store/slices/authReducer'; 

const AuthPage = () => {
    const dispatch = useDispatch();
    const activeComponent = useSelector((state) => state.auth.activeComponent); 
    
    const handleSwitch = (component) => {
        dispatch(setActiveComponent(component)); 
    };

    return (
        <Container>
            <Sign onSwitch={handleSwitch} />
            {activeComponent === "login" && <Login />}
            {activeComponent === "register" && <Registration />}
        </Container>
    );
};

export default AuthPage;
