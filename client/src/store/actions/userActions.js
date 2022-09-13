import axios from "axios";
import { message } from "antd";

export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const res = await axios.post("/api/users/login", reqObj);
    localStorage.setItem("user", JSON.stringify(res.data));
    message.success("Login success!");
    dispatch({ type: "LOADING", payload: false });
    window.location.href = "/";
  } catch (error) {
    console.log(error);
    message.error("Something went wrong!");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const res = await axios.post("/api/users/register", reqObj);
    message.success("Registration successful!");
    window.location.href = "/login";
    dispatch({ type: "LOADING", payload: false });
    return res.data;
  } catch (error) {
    console.log(error);
    message.error("Something went wrong!");
    dispatch({ type: "LOADING", payload: false });
  }
};
