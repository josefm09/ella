import "antd/dist/antd.css";

import { Route, BrowserRouter, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CarBooking from "./pages/CarBooking";
import UserBookings from "./pages/UserBookings";
import CarAdd from "./pages/CarAdd";
import Admin from "./pages/Admin";
import CarEdit from "./pages/CarEdit";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <ProtectedRoute path="/" exact component={Home} />
        <ProtectedRoute path="/booking/:carid" exact component={CarBooking} />
        <ProtectedRoute path="/userbookings" exact component={UserBookings} />
        <ProtectedRoute path="/addcar" exact component={CarAdd} />
        <ProtectedRoute path="/editcar/:carid" exact component={CarEdit} />
        <ProtectedRoute path="/admin" exact component={Admin} />
      </BrowserRouter>
    </div>
  );
};

export const ProtectedRoute = (props) => {
  if (localStorage.getItem("user")) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default App;
