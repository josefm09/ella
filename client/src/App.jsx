import { Route, BrowserRouter, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VestidoBooking from "./pages/VestidoBooking";
import UserBookings from "./pages/UserBookings";
import VestidoAdd from "./pages/VestidoAdd";
import Admin from "./pages/Admin";
import VestidoEdit from "./pages/VestidoEdit";

import "antd/dist/antd.min.css";

export default function App() {
  return (
    <BrowserRouter>
      <ProtectedRoute path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <ProtectedRoute path="/booking/:carid" exact component={VestidoBooking} />
      <ProtectedRoute path="/userbookings" exact component={UserBookings} />
      <ProtectedRoute path="/addvestido" exact component={VestidoAdd} />
      <ProtectedRoute path="/editvestido/:carid" exact component={VestidoEdit} />
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
