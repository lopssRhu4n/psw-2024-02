import "./styles/App.css"
import { Outlet } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Outlet />
      {/* <MainLayout /> */}
    </div>
  );
}

export default App;
