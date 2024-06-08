import { useReducer } from "react";
import { cloudInstance } from "../axios";

const initialState = {
  data_gc: [],
  loading_gc: false,
  error_gc: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "api-request":
      return { ...state, loading_gc: true, error_gc: null };
    case "fetch-data":
      return { ...state, loading_gc: false, data_gc: action.payload };
    case "error":
      return { ...state, loading_gc: false, error_gc: action.payload };
    default:
      return state;
  }
};

function UseCloudGet() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getToCloud = (url, token) => {
    dispatch({ type: "api-request" });
    cloudInstance
      .get(url, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dispatch({ type: "fetch-data", payload: res.data });
      })
      .catch((e) => {
        dispatch({ type: "error", payload: e });
      });
  };

  return [state, getToCloud];
}

export default UseCloudGet;
