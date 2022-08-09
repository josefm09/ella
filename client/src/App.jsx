import { Route, BrowserRouter, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CarBooking from "./pages/CarBooking";
import UserBookings from "./pages/UserBookings";
import CarAdd from "./pages/CarAdd";
import Admin from "./pages/Admin";
import CarEdit from "./pages/CarEdit";

import "antd/dist/antd.min.css";

export default function App() {
  return (
    <BrowserRouter>
      <ProtectedRoute path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <ProtectedRoute path="/booking/:carid" exact component={CarBooking} />
      <ProtectedRoute path="/userbookings" exact component={UserBookings} />
      <ProtectedRoute path="/addcar" exact component={CarAdd} />
      <ProtectedRoute path="/editcar/:carid" exact component={CarEdit} />
      <ProtectedRoute path="/admin" exact component={Admin} />
    </BrowserRouter>
  );
}

export const ProtectedRoute = (props) => {
  if (localStorage.getItem("user")) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
};
