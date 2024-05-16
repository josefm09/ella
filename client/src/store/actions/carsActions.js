import axios from "axios";
import { message } from "antd";

export const getAllVestidos = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const res = await axios.get("/api/vestidos/getallvestidos");
    dispatch({ type: "GET_ALL_CARS", payload: res.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const addVestido = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/vestidos/addvestido", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success("New vestido added successfully!");
    window.location.href = "/admin";
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const editVestido = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/vestidos/editvestido", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success("Vestido details updated successfully!");
    window.location.href = "/admin";
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const deleteCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/vestidos/deletevestido", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success("Vestido deleted successfully!");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
