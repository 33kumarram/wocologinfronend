import "./App.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoginPage } from "./components/LogIn/LoginPage";
import { HomePage } from "./Components/home/HomePage";


const PrivateRoute = ({ token, ...props }) => {
  return token ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/" />
  );
};

function App() {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={LoginPage} exact />
          <Route path="/home" element={<PrivateRoute token={user?.token} />}>
            <Route path="/home" Component={HomePage} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
