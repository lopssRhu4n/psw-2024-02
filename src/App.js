import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/App.css"
import { Outlet } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
function App() {
  return (
    <div className="App">
      <Outlet />
      {/* <MainLayout /> */}
    </div>
  );
}

export default App;
